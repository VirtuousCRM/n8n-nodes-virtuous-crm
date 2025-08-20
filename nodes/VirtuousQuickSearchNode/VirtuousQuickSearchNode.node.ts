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
	paginationOptions,
	normalizeResponse,
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
				displayName: 'Pagination Mode',
				name: 'paginationMode',
				type: 'options',
				options: paginationOptions,
				default: 'off',
				description: 'How to handle pagination of results',
			},
			{
				displayName: 'Skip (Starting Point)',
				name: 'skip',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Number of records to skip',
				displayOptions: {
					hide: {
						paginationMode: ['automatic'],
					},
				},
			},
			{
				displayName: 'Take (Page Size)',
				name: 'take',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 500,
				},
				default: 10,
				description: 'Number of records per page (max 500)',
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
	const paginationMode = context.getNodeParameter('paginationMode', itemIndex) as string;
	const skip = context.getNodeParameter('skip', itemIndex) as number;
	const take = context.getNodeParameter('take', itemIndex) as number;

	// Get the credentials to determine the base URL
	const credentials = await context.getCredentials('virtuousApi');
	const baseUrl = getBaseUrlFromCredentials(credentials);

	// Build the request body - FilterTypes must be an array, not a comma-separated string
	const requestBody: any = {
		Query: query,
		FilterTypes: filterTypes,
	};

	// Create the fetch function for pagination
	const fetchFunction = async (skipParam: number, takeParam: number) => {
		const queryParams: any = {
			skip: skipParam,
			take: takeParam
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
	};

	// Handle different pagination modes
	if (paginationMode === 'automatic') {
		return await handleAutomaticPagination(context, fetchFunction, take);
	}

	if (paginationMode === 'batched') {
		const results = await handleAutomaticPagination(context, fetchFunction, take);

		// Return as a single batch with metadata
		return {
			searchResults: results,
			searchQuery: query,
			filterTypes: filterTypes,
			totalResults: results.length,
		};
	}

	// For 'off' and 'pageByPage' modes, make a single request
	const results = await fetchFunction(skip, take);

	return {
		searchResults: results,
		searchQuery: query,
		filterTypes: filterTypes,
		pagination: {
			currentPage: Math.floor(skip / take) + 1,
			pageSize: take,
			skip: skip,
			returned: results.length,
			hasMore: results.length === take,
			nextSkip: skip + take
		}
	};
}
