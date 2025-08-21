import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';
import {
	VIRTUOUS_ICON,
	getBaseUrlFromCredentials,
	handleAutomaticPagination,
	normalizeResponse,
	createBatchSizeParameter,
	createInternalBatchSizeParameter,
	createMaxPagesParameter,
	createPaginationModeParameter,
	createSkipParameter,
	createTakeParameter,
} from '../../utils/VirtuousUtils';

export class VirtuousQuickSearchNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Virtuous Quick Search',
		name: 'virtuousQuickSearchNode',
		icon: VIRTUOUS_ICON,
		group: ['input'],
		version: 1,
		description: 'Perform natural language searches across multiple Virtuous CRM entity types. Supports both simple keywords and complex queries.',
		defaults: {
			name: 'Virtuous Quick Search',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'virtuousApi',
				required: true,
			},
		],
		properties: [
			// Search Query
			{
				displayName: 'Search Query',
				name: 'query',
				type: 'string',
				default: '',
				placeholder: 'John Smith, john@example.com, or "find donors updated in last 30 days"',
				description: 'Search across multiple Virtuous entity types. Supports both simple keywords (names, emails) and natural language queries for complex searches.',
			},
			// Filter Types
			{
				displayName: 'Filter Types',
				name: 'filterTypes',
				type: 'multiOptions',
				options: [
					{
						name: 'Campaign',
						value: 'Campaign',
						description: 'Search fundraising campaigns and initiatives',
					},
					{
						name: 'Contact',
						value: 'Contact',
						description: 'Search contacts, individuals, and organizations',
					},
					{
						name: 'Individual',
						value: 'Individual',
						description: 'Search individual people (subset of contacts)',
					},
					{
						name: 'Project',
						value: 'Project',
						description: 'Search designated projects and programs',
					},
					{
						name: 'Segment',
						value: 'Segment',
						description: 'Search contact segments and groups',
					},
					{
						name: 'Tag',
						value: 'Tag',
						description: 'Search available tags and labels',
					},
				],
				default: ['Contact'],
				description: 'Choose which types of records to search. Multiple selections will search all selected types simultaneously.',
			},
			// Pagination Settings
			{
				displayName: 'Pagination',
				name: 'pagination',
				type: 'fixedCollection',
				default: {},
				placeholder: 'Add Pagination',
				description: 'Control how search results are returned: all at once, in batches, or page by page. Choose based on your workflow needs.',
				options: [
					{
						displayName: 'Pagination',
						name: 'pagination',
						values: [
							createBatchSizeParameter(),
							createInternalBatchSizeParameter(),
							createMaxPagesParameter(),
							createPaginationModeParameter(),
							createSkipParameter(),
							{
								...createTakeParameter(['off', 'pageByPage']),
								typeOptions: {
									minValue: 1,
									maxValue: 500,
								},
								description: 'Number of results to return per page (max 500)',
							},
						],
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const responseData = await performQuickSearch(this, i);

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } }
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: { item: i }
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error, { itemIndex: i });
			}
		}

		return [returnData];
	}
}

async function performQuickSearch(context: IExecuteFunctions, itemIndex: number): Promise<any> {
	const query = context.getNodeParameter('query', itemIndex) as string;
	const filterTypes = context.getNodeParameter('filterTypes', itemIndex) as string[];

	// Get pagination configuration from fixedCollection
	const paginationConfig = context.getNodeParameter('pagination', itemIndex, {}) as any;
	const pagination = paginationConfig?.pagination;

	// Get the credentials to determine the base URL
	const credentials = await context.getCredentials('virtuousApi');
	const baseUrl = getBaseUrlFromCredentials(credentials);

	// Build the request body - FilterTypes must be an array, not a comma-separated string
	const requestBody: any = {
		Query: query,
		FilterTypes: filterTypes,
	};

	// If no pagination is configured, default to 'off' mode
	if (!pagination) {
		return await fetchQuickSearchResults(context, baseUrl, requestBody, 0, 50);
	}

	const paginationMode = pagination.paginationMode || 'off';

	// Create the fetch function for pagination
	const fetchFunction = async (skipParam: number, takeParam: number) => {
		return await fetchQuickSearchResults(context, baseUrl, requestBody, skipParam, takeParam);
	};

	// Handle different pagination modes
	switch (paginationMode) {
		case 'off':
			const take = pagination.take || 50;
			const results = await fetchQuickSearchResults(context, baseUrl, requestBody, 0, take);
			return {
				searchResults: results,
				searchQuery: query,
				filterTypes: filterTypes,
			};

		case 'automatic':
			const internalBatchSize = pagination.internalBatchSize || 100;
			const maxPages = pagination.maxPages || 10;
			return await handleAutomaticPagination(context, fetchFunction, internalBatchSize, maxPages);

		case 'automaticBatched':
			const batchSize = pagination.batchSize || 50;
			const internalBatchSizeBatched = pagination.internalBatchSize || 100;
			const maxPagesBatched = pagination.maxPages || 10;

			const allResults = await handleAutomaticPagination(context, fetchFunction, internalBatchSizeBatched, maxPagesBatched);

			// Group results into batches
			const batches = [];
			for (let i = 0; i < allResults.length; i += batchSize) {
				const batch = allResults.slice(i, i + batchSize);
				batches.push({
					searchResults: batch,
					searchQuery: query,
					filterTypes: filterTypes,
					batch: {
						number: Math.floor(i / batchSize) + 1,
						size: batch.length,
						total: allResults.length,
						isLast: i + batchSize >= allResults.length
					}
				});
			}
			return batches;

		case 'pageByPage':
			const pageTake = pagination.take || 50;
			const pageSkip = pagination.skip || 0;
			const pageResults = await fetchQuickSearchResults(context, baseUrl, requestBody, pageSkip, pageTake);

			return {
				searchResults: pageResults,
				searchQuery: query,
				filterTypes: filterTypes,
				pagination: {
					currentPage: Math.floor(pageSkip / pageTake) + 1,
					pageSize: pageTake,
					skip: pageSkip,
					returned: pageResults.length,
					hasMore: pageResults.length === pageTake,
					nextSkip: pageSkip + pageTake
				}
			};

		default:
			// Fallback to simple fetch
			const defaultResults = await fetchQuickSearchResults(context, baseUrl, requestBody, 0, 50);
			return {
				searchResults: defaultResults,
				searchQuery: query,
				filterTypes: filterTypes,
			};
	}
}

// Helper function to make the actual API request
async function fetchQuickSearchResults(
	context: IExecuteFunctions,
	baseUrl: string,
	requestBody: any,
	skip: number,
	take: number
): Promise<any[]> {
	const queryParams: any = {
		skip,
		take
	};

	const requestOptions: IRequestOptions = {
		method: 'POST',
		url: `${baseUrl}/api/Search`,
		qs: queryParams,
		body: requestBody,
		json: true,
	};

	const response = await context.helpers.requestWithAuthentication.call(
		context,
		'virtuousApi',
		requestOptions
	);

	// Use the shared response normalization utility
	return normalizeResponse(response);
}
