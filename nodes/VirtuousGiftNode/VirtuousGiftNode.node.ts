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
	createBatchSizeParameter,
	createInternalBatchSizeParameter,
	createMaxPagesParameter,
	createPaginationModeParameter,
	createSkipParameter,
	createTakeParameter,
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
								...createBatchSizeParameter(),
								description: 'Number of gifts per batch (each batch becomes one workflow item). Use smaller values for more granular processing, larger for efficiency.',
							},
							createInternalBatchSizeParameter(),
							createMaxPagesParameter(),
							createPaginationModeParameter('gifts'),
							createSkipParameter(),
							{
								...createTakeParameter(['off', 'pageByPage'], 'Number of gifts to return per contact. When processing multiple contacts, this limit applies to EACH contact separately.'),
								displayOptions: {
									show: {
										paginationMode: ['off', 'pageByPage'],
									},
								},
								description: 'Maximum number of gifts to return in a single API call. When pagination is "Off", this limits how many gifts you get back (starting from the first gift). Use higher values if you expect more gifts than the default 50.',
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
						displayName: 'Amount',
						name: 'amount',
						values: [
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'Between', value: 'Between' },
									{ name: 'Greater Than', value: 'GreaterThan' },
									{ name: 'Greater Than Or Equal', value: 'GreaterThanOrEqual' },
									{ name: 'Is', value: 'Is' },
									{ name: 'Less Than', value: 'LessThan' },
									{ name: 'Less Than Or Equal', value: 'LessThanOrEqual' },
								],
								default: 'Is',
							},
							{
								displayName: 'Amount Value',
								name: 'amountValue',
								type: 'number',
								typeOptions: {
									numberPrecision: 2,
									minValue: 0,
								},
								default: 0,
								description: 'The amount value for the filter',
								displayOptions: {
									hide: {
										operator: ['Between'],
									},
								},
							},
							{
								displayName: 'From Amount',
								name: 'fromAmount',
								type: 'number',
								typeOptions: {
									numberPrecision: 2,
									minValue: 0,
								},
								default: 0,
								description: 'The minimum amount for Between operator',
								displayOptions: {
									show: {
										operator: ['Between'],
									},
								},
							},
							{
								displayName: 'To Amount',
								name: 'toAmount',
								type: 'number',
								typeOptions: {
									numberPrecision: 2,
									minValue: 0,
								},
								default: 0,
								description: 'The maximum amount for Between operator',
								displayOptions: {
									show: {
										operator: ['Between'],
									},
								},
							},
						],
					},
					{
						displayName: 'Contact ID',
						name: 'contactId',
						type: 'string',
						default: '={{ $json.Id || $json.id }}',
						placeholder: '{{ $json.ID }} or 12345',
						description: 'Filter by contact ID. Use expressions like {{ $JSON.ID }} or {{ $JSON.ID }} to get from previous node data.',
					},
					{
						displayName: 'Contact Name',
						name: 'contactName',
						values: [
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'Contains', value: 'Contains' },
									{ name: 'Ends With', value: 'EndsWith' },
									{ name: 'Is', value: 'Is' },
									{ name: 'Starts With', value: 'StartsWith' },
								],
								default: 'Contains',
							},
							{
								displayName: 'Name Value',
								name: 'nameValue',
								type: 'string',
								default: '',
								description: 'The contact name to search for',
							},
						],
					},
					{
						displayName: 'Contact Tag',
						name: 'contactTag',
						values: [
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'Is Any Of', value: 'IsAnyOf' },
									{ name: 'Is None Of', value: 'IsNoneOf' },
								],
								default: 'IsAnyOf',
							},
							{
								displayName: 'Tag Values',
								name: 'tagValues',
								type: 'string',
								default: '',
								description: 'Comma-separated list of tag names or IDs to match against',
								placeholder: 'Donor, VIP, Major Gift',
							},
						],
					},
					{
						displayName: 'Create Date',
						name: 'createDate',
						values: [
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'After', value: 'After' },
									{ name: 'Before', value: 'Before' },
									{ name: 'Between', value: 'Between' },
									{ name: 'Is', value: 'Is' },
									{ name: 'On Or After', value: 'OnOrAfter' },
									{ name: 'On Or Before', value: 'OnOrBefore' },
								],
								default: 'After',
							},
							{
								displayName: 'Date Value',
								name: 'dateValue',
								type: 'options',
								options: [
									{ name: '30 Days Ago', value: '30 Days Ago' },
									{ name: '60 Days Ago', value: '60 Days Ago' },
									{ name: '7 Days Ago', value: '7 Days Ago' },
									{ name: '90 Days Ago', value: '90 Days Ago' },
									{ name: 'Custom Date', value: 'custom' },
									{ name: 'Last Month', value: 'Last Month' },
									{ name: 'One Year Ago', value: 'One Year Ago' },
									{ name: 'This Calendar Year', value: 'This Calendar Year' },
									{ name: 'Today', value: 'Today' },
									{ name: 'Yesterday', value: 'Yesterday' },
								],
								default: '30 Days Ago',
								description: 'Select a predefined date or use custom',
							},
							{
								displayName: 'Custom Date',
								name: 'customDate',
								type: 'dateTime',
								default: '',
								description: 'Custom date for filtering',
								displayOptions: {
									show: {
										dateValue: ['custom'],
									},
								},
							},
						],
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
						displayName: 'Last Modified Date',
						name: 'lastModifiedDate',
						values: [
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'After', value: 'After' },
									{ name: 'Before', value: 'Before' },
									{ name: 'Between', value: 'Between' },
									{ name: 'Is', value: 'Is' },
									{ name: 'On Or After', value: 'OnOrAfter' },
									{ name: 'On Or Before', value: 'OnOrBefore' },
								],
								default: 'After',
							},
							{
								displayName: 'Date Value',
								name: 'dateValue',
								type: 'options',
								options: [
									{ name: '30 Days Ago', value: '30 Days Ago' },
									{ name: '60 Days Ago', value: '60 Days Ago' },
									{ name: '7 Days Ago', value: '7 Days Ago' },
									{ name: '90 Days Ago', value: '90 Days Ago' },
									{ name: 'Custom Date', value: 'custom' },
									{ name: 'Last Month', value: 'Last Month' },
									{ name: 'One Year Ago', value: 'One Year Ago' },
									{ name: 'This Calendar Year', value: 'This Calendar Year' },
									{ name: 'Today', value: 'Today' },
									{ name: 'Yesterday', value: 'Yesterday' },
								],
								default: '30 Days Ago',
								description: 'Select a predefined date or use custom',
							},
							{
								displayName: 'Custom Date',
								name: 'customDate',
								type: 'dateTime',
								default: '',
								description: 'Custom date for filtering',
								displayOptions: {
									show: {
										dateValue: ['custom'],
									},
								},
							},
						],
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
				name: 'searchPagination',
				type: 'fixedCollection',
				displayOptions: {
					show: {
						operation: ['search'],
					},
				},
				default: {},
				placeholder: 'Add Pagination',
				description: 'Control how search results are returned: all at once, in batches, or page by page. Choose based on your workflow needs.',
				options: [
					{
						displayName: 'Pagination',
						name: 'pagination',
						values: [
							{
								...createBatchSizeParameter(),
								description: 'Number of gifts per batch (each batch becomes one workflow item). Use smaller values for more granular processing, larger for efficiency.',
							},
							createInternalBatchSizeParameter(),
							createMaxPagesParameter(),
							createPaginationModeParameter('gifts'),
							createSkipParameter(),
							createTakeParameter(),
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

	// If no pagination is configured, default to 'off' mode with default take
	if (!pagination) {
		return await fetchGiftsByContact(context, baseUrl, contactId, sortBy, descending, 0, 50);
	}

	const paginationMode = pagination.paginationMode || 'off';

	// Handle pagination
	switch (paginationMode) {
		case 'off':
			const take = (pagination && pagination.take !== undefined) ? pagination.take : 50;
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

	// Use the shared response extraction utility
	return extractGiftsFromResponse(response);
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

	// Get pagination configuration from fixedCollection
	const paginationConfig = context.getNodeParameter('searchPagination', itemIndex, {}) as any;
	const pagination = paginationConfig?.pagination;

	const credentials = await context.getCredentials('virtuousApi');
	const baseUrl = getBaseUrlFromCredentials(credentials);

	// Build request body for gift search
	const requestBody: any = {};

	// Add basic filters to request body
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

	// Handle Last Modified Date filter (advanced filter structure)
	if (filters.lastModifiedDate && filters.lastModifiedDate.length > 0) {
		// Initialize filter group if we have advanced filters
		if (!requestBody.filterGroups) {
			requestBody.filterGroups = [];
		}

		// Find or create the main filter group
		let filterGroup = requestBody.filterGroups.find((fg: any) => fg.groupType === 'And');
		if (!filterGroup) {
			filterGroup = {
				groupType: 'And',
				conditions: []
			};
			requestBody.filterGroups.push(filterGroup);
		}

		// Process Last Modified Date filters
		for (const filter of filters.lastModifiedDate) {
			const condition: any = {
				parameter: 'Last Modified Date',
				operator: filter.operator
			};

			if (filter.dateValue === 'custom') {
				condition.value = filter.customDate;
			} else {
				condition.value = filter.dateValue;
			}

			filterGroup.conditions.push(condition);
		}
	}

	// Handle Amount filter (advanced filter structure)
	if (filters.amount && filters.amount.length > 0) {
		// Initialize filter group if we have advanced filters
		if (!requestBody.filterGroups) {
			requestBody.filterGroups = [];
		}

		// Find or create the main filter group
		let filterGroup = requestBody.filterGroups.find((fg: any) => fg.groupType === 'And');
		if (!filterGroup) {
			filterGroup = {
				groupType: 'And',
				conditions: []
			};
			requestBody.filterGroups.push(filterGroup);
		}

		// Process Amount filters
		for (const filter of filters.amount) {
			const condition: any = {
				parameter: 'Amount',
				operator: filter.operator
			};

			// Handle different operators
			if (filter.operator === 'Between') {
				condition.value = `${filter.fromAmount}|${filter.toAmount}`;
			} else {
				condition.value = filter.amountValue;
			}

			filterGroup.conditions.push(condition);
		}
	}

	// Handle Contact Name filter (advanced filter structure)
	if (filters.contactName && filters.contactName.length > 0) {
		// Initialize filter group if we have advanced filters
		if (!requestBody.filterGroups) {
			requestBody.filterGroups = [];
		}

		// Find or create the main filter group
		let filterGroup = requestBody.filterGroups.find((fg: any) => fg.groupType === 'And');
		if (!filterGroup) {
			filterGroup = {
				groupType: 'And',
				conditions: []
			};
			requestBody.filterGroups.push(filterGroup);
		}

		// Process Contact Name filters
		for (const filter of filters.contactName) {
			const condition: any = {
				parameter: 'Contact Name',
				operator: filter.operator,
				value: filter.nameValue
			};

			filterGroup.conditions.push(condition);
		}
	}

	// Handle Contact Tag filter (advanced filter structure)
	if (filters.contactTag && filters.contactTag.length > 0) {
		// Initialize filter group if we have advanced filters
		if (!requestBody.filterGroups) {
			requestBody.filterGroups = [];
		}

		// Find or create the main filter group
		let filterGroup = requestBody.filterGroups.find((fg: any) => fg.groupType === 'And');
		if (!filterGroup) {
			filterGroup = {
				groupType: 'And',
				conditions: []
			};
			requestBody.filterGroups.push(filterGroup);
		}

		// Process Contact Tag filters
		for (const filter of filters.contactTag) {
			const condition: any = {
				parameter: 'Contact Tag',
				operator: filter.operator
			};

			// Handle multiple values for tag filtering (comma-separated)
			if (filter.tagValues) {
				// Split by comma and trim whitespace
				const tagList = filter.tagValues.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0);
				condition.value = tagList.join('|'); // Use pipe separator for multiple values
			} else {
				condition.value = '';
			}

			filterGroup.conditions.push(condition);
		}
	}

	// Handle Create Date filter (advanced filter structure)
	if (filters.createDate && filters.createDate.length > 0) {
		// Initialize filter group if we have advanced filters
		if (!requestBody.filterGroups) {
			requestBody.filterGroups = [];
		}

		// Find or create the main filter group
		let filterGroup = requestBody.filterGroups.find((fg: any) => fg.groupType === 'And');
		if (!filterGroup) {
			filterGroup = {
				groupType: 'And',
				conditions: []
			};
			requestBody.filterGroups.push(filterGroup);
		}

		// Process Create Date filters
		for (const filter of filters.createDate) {
			const condition: any = {
				parameter: 'Create Date',
				operator: filter.operator
			};

			if (filter.dateValue === 'custom') {
				condition.value = filter.customDate;
			} else {
				condition.value = filter.dateValue;
			}

			filterGroup.conditions.push(condition);
		}
	}	// If no pagination is configured, default to 'off' mode
	if (!pagination) {
		requestBody.take = 50;
		requestBody.skip = 0;
		return await fetchGiftSearchResults(context, baseUrl, requestBody);
	}

	const paginationMode = pagination.paginationMode || 'off';

	// Create the fetch function for pagination
	const fetchFunction = async (skipParam: number, takeParam: number) => {
		const paginatedBody = {
			...requestBody,
			skip: skipParam,
			take: takeParam,
		};
		return await fetchGiftSearchResults(context, baseUrl, paginatedBody);
	};

	// Handle different pagination modes
	switch (paginationMode) {
		case 'off':
			const take = pagination.take || 50;
			const paginatedBody = {
				...requestBody,
				take,
				skip: 0
			};
			const results = await fetchGiftSearchResults(context, baseUrl, paginatedBody);
			return {
				searchResults: results,
				filters: filters,
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
					filters: filters,
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
			const pagePaginatedBody = {
				...requestBody,
				take: pageTake,
				skip: pageSkip
			};
			const pageResults = await fetchGiftSearchResults(context, baseUrl, pagePaginatedBody);

			return {
				searchResults: pageResults,
				filters: filters,
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
			const defaultBody = {
				...requestBody,
				take: 50,
				skip: 0
			};
			const defaultResults = await fetchGiftSearchResults(context, baseUrl, defaultBody);
			return {
				searchResults: defaultResults,
				filters: filters,
			};
	}
}

// Helper function to make the actual gift search API request
async function fetchGiftSearchResults(
	context: IExecuteFunctions,
	baseUrl: string,
	requestBody: any
): Promise<any[]> {
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

	// Extract gifts from response and ensure we return an array for pagination
	return extractGiftsFromResponse(response);
}
