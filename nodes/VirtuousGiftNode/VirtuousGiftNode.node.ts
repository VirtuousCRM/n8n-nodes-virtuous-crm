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
	extractGiftsFromResponse,
} from '../../utils/VirtuousUtils';

export class VirtuousGiftNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Virtuous Gift',
		name: 'virtuousGiftNode',
		icon: VIRTUOUS_ICON,
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Consume Virtuous Gift API',
		defaults: {
			name: 'Virtuous Gift',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'virtuousApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {},
				},
				options: [
					{
						name: 'Get by Contact',
						value: 'getByContact',
						description: 'Retrieve all gifts/donations for a specific contact. Perfect for donor history workflows.',
						action: 'Get gifts by contact',
					},
					{
						name: 'Get by ID',
						value: 'getById',
						description: 'Retrieve a specific gift using its Virtuous ID. Use when you have a known gift ID.',
						action: 'Get a gift by ID',
					},
					{
						name: 'Search Gifts',
						value: 'search',
						description: 'Query gifts with advanced filters (date ranges, amounts, designations). Supports pagination.',
						action: 'Search for gifts',
					},
				],
				default: 'getByContact',
			},
			// Gift ID field
			{
				displayName: 'Gift ID',
				name: 'giftId',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['getById'],
					},
				},
				default: 0,
				placeholder: '12345',
				description: 'The Virtuous ID of the specific gift/donation to retrieve. Use when you have a known gift ID.',
			},
			// Contact ID field for getByContact
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['getByContact'],
					},
				},
				default: '={{ $json.Id || $json.id }}',
				placeholder: '{{ $json.ID }} or 12345',
				description: 'The ID of the contact to retrieve gifts for. Use {{ $JSON.ID }} from previous node to iterate through contacts.',
			},
			// Sort options for getByContact
			{
				displayName: 'Sort By',
				name: 'sortBy',
				type: 'options',
				displayOptions: {
					show: {
						operation: ['getByContact'],
					},
				},
				options: [
					{ name: 'Amount', value: 'Amount' },
					{ name: 'Batch', value: 'Batch' },
					{ name: 'Created Date Time', value: 'CreatedDateTime' },
					{ name: 'Gift Date', value: 'GiftDate' },
					{ name: 'ID', value: 'Id' },
				],
				default: 'GiftDate',
				description: 'Choose how to order the gift results. GiftDate shows most recent donations first when descending.',
			},
			{
				displayName: 'Sort Direction',
				name: 'descending',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: ['getByContact'],
					},
				},
				default: false,
				description: 'Whether to sort in descending order. True = newest/largest first, False = oldest/smallest first.',
			},
			// Pagination options for getByContact
			{
				displayName: 'Pagination',
				name: 'contactPagination',
				type: 'fixedCollection',
				displayOptions: {
					show: {
						operation: ['getByContact'],
					},
				},
				default: {},
				placeholder: 'Add Pagination',
				description: 'Control how gift results are returned: all at once, in batches, or page by page. Choose based on your workflow needs.',
				options: [
					{
						displayName: 'Pagination',
						name: 'pagination',
						values: [
							{
								displayName: 'Batch Size',
								name: 'batchSize',
								type: 'number',
								typeOptions: {
									minValue: 1,
									maxValue: 1000,
								},
								default: 50,
								description: 'Number of gifts per batch (each batch becomes one workflow item). Use smaller values for more granular processing, larger for efficiency.',
								displayOptions: {
									show: {
										paginationMode: ['automaticBatched'],
									},
								},
							},
							{
								displayName: 'Internal Batch Size',
								name: 'internalBatchSize',
								type: 'number',
								typeOptions: {
									minValue: 10,
									maxValue: 500,
								},
								default: 100,
								description: 'Number of records to fetch per API call (larger = faster but more memory)',
								displayOptions: {
									show: {
										paginationMode: ['automatic', 'automaticBatched'],
									},
								},
							},
							{
								displayName: 'Max Pages',
								name: 'maxPages',
								type: 'number',
								typeOptions: {
									minValue: 1,
									maxValue: 100,
								},
								default: 10,
								description: 'Safety limit for automatic pagination. Set higher if you expect large datasets, lower to prevent timeouts.',
								displayOptions: {
									show: {
										paginationMode: ['automatic', 'automaticBatched'],
									},
								},
							},
							{
								displayName: 'Pagination Mode',
								name: 'paginationMode',
								type: 'options',
								options: [
									{
										name: 'Off',
										value: 'off',
										description: 'Return raw API response (one page only). Use when you want the original response structure or are testing queries.',
									},
									{
										name: 'Automatic (All Results)',
										value: 'automatic',
										description: 'Fetch ALL gifts and return each as individual workflow items. Perfect for iterating with other nodes.',
									},
									{
										name: 'Automatic (Batched)',
										value: 'automaticBatched',
										description: 'Fetch ALL gifts but group them into batches. Each batch becomes one workflow item with metadata. Good for bulk processing.',
									},
									{
										name: 'Page by Page',
										value: 'pageByPage',
										description: 'Return exactly one page with navigation info. Use when you need precise control over pagination.',
									},
								],
								default: 'off',
								description: 'Choose how to handle large result sets. "Automatic" is best for iterating with other nodes.',
							},
							{
								displayName: 'Skip (Starting Point)',
								name: 'skip',
								type: 'number',
								typeOptions: {
									minValue: 0,
								},
								default: 0,
								description: 'Number of records to skip. Use 0 for first page, 50 for second (if page size=50), etc.',
								displayOptions: {
									show: {
										paginationMode: ['pageByPage'],
									},
								},
							},
							{
								displayName: 'Take (Page Size)',
								name: 'take',
								type: 'number',
								typeOptions: {
									minValue: 1,
									maxValue: 1000,
								},
								default: 50,
								description: 'Number of results to return per page',
								displayOptions: {
									show: {
										paginationMode: ['off', 'pageByPage'],
									},
								},
							},
						],
					},
				],
			},
			// Search filters
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				displayOptions: {
					show: {
						operation: ['search'],
					},
				},
				default: {},
				placeholder: 'Add Filter',
				description: 'Filters to apply when searching for gifts',
				options: [
					{
						displayName: 'Contact ID',
						name: 'contactId',
						type: 'string',
						default: '={{ $json.Id || $json.id }}',
						placeholder: '{{ $json.ID }} or 12345',
						description: 'Filter by contact ID. Use expressions like {{ $JSON.ID }} or {{ $JSON.ID }} to get from previous node data.',
					},
					{
						displayName: 'Gift Date From',
						name: 'giftDateFrom',
						type: 'dateTime',
						default: '',
						description: 'Filter gifts from this date onwards',
					},
					{
						displayName: 'Gift Date To',
						name: 'giftDateTo',
						type: 'dateTime',
						default: '',
						description: 'Filter gifts up to this date',
					},
					{
						displayName: 'Gift Type',
						name: 'giftType',
						type: 'options',
						options: [
							{ name: 'Cash', value: 'Cash' },
							{ name: 'Check', value: 'Check' },
							{ name: 'Credit Card', value: 'Credit Card' },
							{ name: 'In-Kind', value: 'In-Kind' },
							{ name: 'Other', value: 'Other' },
							{ name: 'Stock', value: 'Stock' },
						],
						default: 'Cash',
						description: 'Filter by gift type',
					},
					{
						displayName: 'Maximum Amount',
						name: 'maximumAmount',
						type: 'number',
						typeOptions: {
							numberPrecision: 2,
							minValue: 0,
						},
						default: 0,
						description: 'Maximum gift amount',
					},
					{
						displayName: 'Minimum Amount',
						name: 'minimumAmount',
						type: 'number',
						typeOptions: {
							numberPrecision: 2,
							minValue: 0,
						},
						default: 0,
						description: 'Minimum gift amount',
					},
				],
			},
			// Pagination options
			{
				displayName: 'Pagination',
				name: 'pagination',
				type: 'options',
				displayOptions: {
					show: {
						operation: ['search'],
					},
				},
				options: [
					{
						name: 'Off',
						value: 'off',
						description: 'Return raw API response (one page only). Use when you want the original response structure.',
					},
					{
						name: 'Automatic',
						value: 'automatic',
						description: 'Fetch ALL gifts and return each as individual workflow items. Perfect for iterating with other nodes.',
					},
					{
						name: 'Batched',
						value: 'batched',
						description: 'Fetch ALL gifts but group them into batches. Each batch becomes one workflow item.',
					},
					{
						name: 'Page by Page',
						value: 'pageByPage',
						description: 'Return exactly one page with navigation info. Use for precise pagination control.',
					},
				],
				default: 'off',
				description: 'How to handle pagination of results',
			},
			{
				displayName: 'Take',
				name: 'take',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['search'],
						pagination: ['off', 'batched', 'pageByPage'],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 1000,
				},
				default: 50,
				description: 'Number of results per page',
			},
			{
				displayName: 'Skip',
				name: 'skip',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['search'],
						pagination: ['off', 'pageByPage'],
					},
				},
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Number of results to skip',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				let responseData;

				switch (operation) {
					case 'getByContact':
						responseData = await getGiftsByContact(this, i);
						break;
					case 'getById':
						responseData = await getGiftById(this, i);
						break;
					case 'search':
						responseData = await searchGifts(this, i);
						break;
					default:
						throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`);
				}

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

// Function to get gift by ID
async function getGiftById(context: IExecuteFunctions, itemIndex: number): Promise<any> {
	const giftId = context.getNodeParameter('giftId', itemIndex) as number;

	const credentials = await context.getCredentials('virtuousApi');
	const baseUrl = getBaseUrlFromCredentials(credentials);

	const requestOptions: IRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/api/Gift/${giftId}`,
		json: true,
	};

	return await context.helpers.requestWithAuthentication.call(
		context,
		'virtuousApi',
		requestOptions
	);
}

// Function to get gifts by contact ID
async function getGiftsByContact(context: IExecuteFunctions, itemIndex: number): Promise<any> {
	const contactIdParam = context.getNodeParameter('contactId', itemIndex) as string;
	// Convert string to number, handling both direct numbers and expression results
	const contactId = parseInt(contactIdParam, 10);

	if (isNaN(contactId)) {
		throw new NodeOperationError(context.getNode(), `Invalid contact ID: ${contactIdParam}. Please provide a valid number.`);
	}

	const sortBy = context.getNodeParameter('sortBy', itemIndex, 'GiftDate') as string;
	const descending = context.getNodeParameter('descending', itemIndex, false) as boolean;

	// Get pagination configuration from fixedCollection
	const paginationConfig = context.getNodeParameter('contactPagination', itemIndex, {}) as any;
	const pagination = paginationConfig?.pagination;

	const credentials = await context.getCredentials('virtuousApi');
	const baseUrl = getBaseUrlFromCredentials(credentials);

	// If no pagination is configured, default to 'off' mode
	if (!pagination) {
		return await fetchGiftsByContact(context, baseUrl, contactId, sortBy, descending, 0, 50);
	}

	const paginationMode = pagination.paginationMode || 'off';

	// Handle pagination
	switch (paginationMode) {
		case 'off':
			const take = pagination.take || 50;
			return await fetchGiftsByContact(context, baseUrl, contactId, sortBy, descending, 0, take);

		case 'automatic':
			const internalBatchSize = pagination.internalBatchSize || 100;
			const maxPages = pagination.maxPages || 10;
			return await handleAdvancedContactGiftsAutomaticPagination(
				context,
				baseUrl,
				contactId,
				sortBy,
				descending,
				internalBatchSize,
				maxPages
			);

		case 'automaticBatched':
			const batchSize = pagination.batchSize || 50;
			const internalBatchSizeBatched = pagination.internalBatchSize || 100;
			const maxPagesBatched = pagination.maxPages || 10;
			return await handleAdvancedContactGiftsBatchedPagination(
				context,
				baseUrl,
				contactId,
				sortBy,
				descending,
				batchSize,
				internalBatchSizeBatched,
				maxPagesBatched
			);

		case 'pageByPage':
			const pageTake = pagination.take || 50;
			const pageSkip = pagination.skip || 0;
			const response = await fetchGiftsByContact(context, baseUrl, contactId, sortBy, descending, pageSkip, pageTake);

			// Add pagination metadata for pageByPage mode
			if (Array.isArray(response)) {
				return [{
					gifts: response,
					pagination: {
						skip: pageSkip,
						take: pageTake,
						returned: response.length,
						hasMore: response.length === pageTake
					}
				}];
			}
			return response;

		default:
			// Fallback to simple fetch
			return await fetchGiftsByContact(context, baseUrl, contactId, sortBy, descending, 0, 50);
	}
}

// Helper function to fetch gifts by contact with specific parameters
async function fetchGiftsByContact(context: IExecuteFunctions, baseUrl: string, contactId: number, sortBy: string, descending: boolean, skip: number, take: number): Promise<any> {
	// Build query parameters
	const queryParams: string[] = [];
	queryParams.push(`sortBy=${encodeURIComponent(sortBy)}`);
	queryParams.push(`descending=${descending}`);
	queryParams.push(`skip=${skip}`);
	queryParams.push(`take=${take}`);

	const requestOptions: IRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/api/Gift/ByContact/${contactId}?${queryParams.join('&')}`,
		json: true,
	};

	const response = await context.helpers.requestWithAuthentication.call(
		context,
		'virtuousApi',
		requestOptions
	);

	// Handle different response formats
	if (Array.isArray(response)) {
		return response;
	} else if (response && typeof response === 'object') {
		return [response];
	}

	return response;
}

// Advanced automatic pagination function for contact gifts
async function handleAdvancedContactGiftsAutomaticPagination(
	context: IExecuteFunctions,
	baseUrl: string,
	contactId: number,
	sortBy: string,
	descending: boolean,
	internalBatchSize: number = 100,
	maxPages: number = 10
): Promise<any[]> {
	return await handleAutomaticPagination(
		context,
		async (skip: number, take: number) => {
			const response = await fetchGiftsByContact(context, baseUrl, contactId, sortBy, descending, skip, take);
			return extractGiftsFromResponse(response);
		},
		internalBatchSize,
		maxPages
	);
}

// Advanced batched pagination function for contact gifts
async function handleAdvancedContactGiftsBatchedPagination(
	context: IExecuteFunctions,
	baseUrl: string,
	contactId: number,
	sortBy: string,
	descending: boolean,
	batchSize: number = 50,
	internalBatchSize: number = 100,
	maxPages: number = 10
): Promise<any[]> {
	const allResults = await handleAutomaticPagination(
		context,
		async (skip: number, take: number) => {
			const response = await fetchGiftsByContact(context, baseUrl, contactId, sortBy, descending, skip, take);
			return extractGiftsFromResponse(response);
		},
		internalBatchSize,
		maxPages
	);

	// Group results into batches
	const batches = [];
	for (let i = 0; i < allResults.length; i += batchSize) {
		const batch = allResults.slice(i, i + batchSize);
		batches.push({
			gifts: batch,
			batch: {
				number: Math.floor(i / batchSize) + 1,
				size: batch.length,
				total: allResults.length,
				isLast: i + batchSize >= allResults.length
			}
		});
	}

	return batches;
}

// Function to search gifts
async function searchGifts(context: IExecuteFunctions, itemIndex: number): Promise<any> {
	const filters = context.getNodeParameter('filters', itemIndex) as any;
	const pagination = context.getNodeParameter('pagination', itemIndex) as string;

	const credentials = await context.getCredentials('virtuousApi');
	const baseUrl = getBaseUrlFromCredentials(credentials);

	// Build request body for gift search
	const requestBody: any = {};

	// Add filters to request body
	if (filters.contactId) {
		const contactIdParam = filters.contactId as string;
		const contactId = parseInt(contactIdParam, 10);
		if (!isNaN(contactId)) {
			requestBody['Contact Id'] = contactId;
		}
	}
	if (filters.giftDateFrom) {
		requestBody['Gift Date From'] = filters.giftDateFrom;
	}
	if (filters.giftDateTo) {
		requestBody['Gift Date To'] = filters.giftDateTo;
	}
	if (filters.giftType) {
		requestBody['Gift Type'] = filters.giftType;
	}
	if (filters.minimumAmount) {
		requestBody['Minimum Amount'] = filters.minimumAmount;
	}
	if (filters.maximumAmount) {
		requestBody['Maximum Amount'] = filters.maximumAmount;
	}

	// Handle pagination
	switch (pagination) {
		case 'off':
			const take = context.getNodeParameter('take', itemIndex, 50) as number;
			const skip = context.getNodeParameter('skip', itemIndex, 0) as number;
			requestBody.take = take;
			requestBody.skip = skip;
			break;

		case 'automatic':
			return await handleAutomaticPagination(
				context,
				async (skip: number, take: number) => {
					const paginatedBody = {
						...requestBody,
						skip,
						take,
					};

					const requestOptions: IRequestOptions = {
						method: 'POST',
						url: `${baseUrl}/api/Gift/Query`,
						body: paginatedBody,
						json: true,
					};

					const response = await context.helpers.requestWithAuthentication.call(
						context,
						'virtuousApi',
						requestOptions
					);

					// Extract gifts from response and ensure we return an array for pagination
					return extractGiftsFromResponse(response);
				}
			);

		case 'batched':
			const batchTake = context.getNodeParameter('take', itemIndex, 50) as number;
			requestBody.take = batchTake;
			requestBody.skip = 0;
			break;

		case 'pageByPage':
			const pageTake = context.getNodeParameter('take', itemIndex, 50) as number;
			const pageSkip = context.getNodeParameter('skip', itemIndex, 0) as number;
			requestBody.take = pageTake;
			requestBody.skip = pageSkip;
			break;
	}

	const requestOptions: IRequestOptions = {
		method: 'POST',
		url: `${baseUrl}/api/Gift/Query`,
		body: requestBody,
		json: true,
	};

	const response = await context.helpers.requestWithAuthentication.call(
		context,
		'virtuousApi',
		requestOptions
	);

	// Handle different response formats
	if (pagination === 'batched' && Array.isArray(response)) {
		return response;
	} else if (response && typeof response === 'object' && !Array.isArray(response)) {
		return [response];
	}

	return response;
}
