import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

export class VirtuousContactNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Virtuous Contact',
		name: 'virtuousContactNode',
		icon: 'fa:address-book',
		group: ['input'],
		version: 1,
		description: 'Get contact information from Virtuous CRM',
		defaults: {
			name: 'Virtuous Contact',
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
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Contact by ID',
						value: 'getById',
						description: 'Get a specific contact by their ID',
						action: 'Get a contact by ID',
					},
					{
						name: 'Get Contact by Email',
						value: 'getByEmail',
						description: 'Get a contact by their email address',
						action: 'Get a contact by email',
					},
					{
						name: 'Search Contacts',
						value: 'search',
						description: 'Search for contacts with filters',
						action: 'Search contacts',
					},
					{
						name: 'Update Contact',
						value: 'update',
						description: 'Update an existing contact',
						action: 'Update a contact',
					},
				],
				default: 'getById',
			},
			// Contact ID field
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						operation: ['getById'],
					},
				},
				default: 0,
				description: 'The ID of the contact to retrieve',
			},
			// Contact ID field for update
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						operation: ['update'],
					},
				},
				default: 0,
				description: 'The ID of the contact to update',
			},
			// Email field
			{
				displayName: 'Email Address',
				name: 'email',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['getByEmail'],
					},
				},
				default: '',
				placeholder: 'contact@example.com',
				description: 'The email address of the contact to retrieve',
			},
			// Update Contact Fields
			{
				displayName: 'Contact Data',
				name: 'contactData',
				type: 'collection',
				displayOptions: {
					show: {
						operation: ['update'],
					},
				},
				default: {},
				placeholder: 'Add Contact Field',
				description: 'Contact fields to update',
				options: [
					{
						displayName: 'Anniversary Day',
						name: 'anniversaryDay',
						type: 'number',
						typeOptions: {
							minValue: 1,
							maxValue: 31,
						},
						default: 0,
						description: 'Anniversary day (1-31)',
					},
					{
						displayName: 'Anniversary Month',
						name: 'anniversaryMonth',
						type: 'number',
						typeOptions: {
							minValue: 1,
							maxValue: 12,
						},
						default: 0,
						description: 'Anniversary month (1-12)',
					},
					{
						displayName: 'Anniversary Year',
						name: 'anniversaryYear',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Contact Type',
						name: 'contactType',
						type: 'options',
						options: [
							{ name: 'Household', value: 'Household' },
							{ name: 'Organization', value: 'Organization' },
							{ name: 'Foundation', value: 'Foundation' },
						],
						default: 'Household',
						description: 'Type of contact',
					},
					{
						displayName: 'Custom Collections',
						name: 'customCollections',
						type: 'fixedCollection',
						typeOptions: {
							multipleValues: true,
						},
						default: {},
						description: 'Custom collections for the contact',
						options: [
							{
								displayName: 'Collection',
								name: 'collection',
								values: [
									{
										displayName: 'Name',
										name: 'name',
										type: 'string',
										default: '',
										description: 'Collection name',
									},
									{
										displayName: 'Fields',
										name: 'fields',
										type: 'fixedCollection',
										typeOptions: {
											multipleValues: true,
										},
										default: {},
										description: 'Fields in this collection',
										options: [
											{
												displayName: 'Field',
												name: 'field',
												values: [
													{
														displayName: 'Name',
														name: 'name',
														type: 'string',
														default: '',
														description: 'Field name',
													},
													{
														displayName: 'Value',
														name: 'value',
														type: 'string',
														default: '',
														description: 'Field value',
													},
												],
											},
										],
									},
								],
							},
						],
					},
					{
						displayName: 'Custom Fields',
						name: 'customFields',
						type: 'fixedCollection',
						typeOptions: {
							multipleValues: true,
						},
						default: {},
						description: 'Custom fields for the contact',
						options: [
							{
								displayName: 'Field',
								name: 'field',
								values: [
									{
										displayName: 'Display Name',
										name: 'displayName',
										type: 'string',
										default: '',
										description: 'Display name of the custom field',
									},
									{
										displayName: 'Name',
										name: 'name',
										type: 'string',
										default: '',
										description: 'Name of the custom field',
									},
									{
										displayName: 'Value',
										name: 'value',
										type: 'string',
										default: '',
										description: 'Value of the custom field',
									},
								],
							},
						],
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						typeOptions: {
							alwaysOpenEditWindow: true,
							rows: 4,
						},
						default: '',
						description: 'Description of the contact',
					},
					{
						displayName: 'Informal Name',
						name: 'informalName',
						type: 'string',
						default: '',
						description: 'Informal name of the contact',
					},
					{
						displayName: 'Is Private',
						name: 'isPrivate',
						type: 'boolean',
						default: false,
						description: 'Whether the contact is marked as private',
					},
					{
						displayName: 'Marital Status',
						name: 'maritalStatus',
						type: 'options',
						options: [
							{ name: 'Divorced', value: 'Divorced' },
							{ name: 'Married', value: 'Married' },
							{ name: 'Other', value: 'Other' },
							{ name: 'Single', value: 'Single' },
							{ name: 'Widowed', value: 'Widowed' },
						],
						default: 'Single',
						description: 'Marital status of the contact',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the contact',
					},
					{
						displayName: 'Origin Segment ID',
						name: 'originSegmentId',
						type: 'number',
						default: 0,
						description: 'ID of the origin segment',
					},
					{
						displayName: 'Website',
						name: 'website',
						type: 'string',
						default: '',
						placeholder: 'https://example.com',
						description: 'Website URL of the contact',
					},
				],
			},
			// Search Filters
			{
				displayName: 'Search Filters',
				name: 'searchFilters',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['search'],
					},
				},
				default: {},
				placeholder: 'Add Filter',
				description: 'Add filters to narrow down your contact search',
				options: [
					// Contact ID Filter
					{
						displayName: 'Contact ID',
						name: 'contactId',
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
									{ name: 'Less Than Or Equal', value: 'LessThanOrEqual' }
								],
								default: 'Is',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'number',
								default: 0,
								description: 'Contact ID to filter by',
							},
						],
					},
					// Contact Type Filter
					{
						displayName: 'Contact Type',
						name: 'contactType',
						values: [
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'Is', value: 'Is' },
									{ name: 'Is Not', value: 'IsNot' },
								],
								default: 'Is',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'options',
								options: [
									{ name: 'Foundation', value: 'Foundation' },
									{ name: 'Household', value: 'Household' },
									{ name: 'Organization', value: 'Organization' },
								],
								default: 'Household',
							},
						],
					},
					// First Name Filter
					{
						displayName: 'First Name',
						name: 'firstName',
						values: [
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'Is', value: 'Is' },
									{ name: 'Contains', value: 'Contains' },
									{ name: 'Starts With', value: 'StartsWith' },
									{ name: 'Ends With', value: 'EndsWith' },
								],
								default: 'Contains',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'First name to filter by',
							},
						],
					},
					// Last Name Filter
					{
						displayName: 'Last Name',
						name: 'lastName',
						values: [
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'Is', value: 'Is' },
									{ name: 'Contains', value: 'Contains' },
									{ name: 'Starts With', value: 'StartsWith' },
									{ name: 'Ends With', value: 'EndsWith' },
								],
								default: 'Contains',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Last name to filter by',
							},
						],
					},
					// Email Address Filter
					{
						displayName: 'Email Address',
						name: 'emailAddress',
						values: [
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'Contains', value: 'Contains' },
									{ name: 'Ends With', value: 'EndsWith' },
									{ name: 'Is', value: 'Is' },
									{ name: 'Is Known', value: 'IsKnown' },
									{ name: 'Is Not Known', value: 'IsNotKnown' },
									{ name: 'Starts With', value: 'StartsWith' },
								],
								default: 'Contains',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Email address to filter by',
								displayOptions: {
									hide: {
										operator: ['IsKnown', 'IsNotKnown'],
									},
								},
							},
						],
					},
					// Phone Number Filter
					{
						displayName: 'Phone Number',
						name: 'phoneNumber',
						values: [
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'Contains', value: 'Contains' },
									{ name: 'Ends With', value: 'EndsWith' },
									{ name: 'Is', value: 'Is' },
									{ name: 'Is Known', value: 'IsKnown' },
									{ name: 'Is Not Known', value: 'IsNotKnown' },
									{ name: 'Starts With', value: 'StartsWith' },
								],
								default: 'Contains',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Phone number to filter by',
								displayOptions: {
									hide: {
										operator: ['IsKnown', 'IsNotKnown'],
									},
								},
							},
						],
					},
					// City Filter
					{
						displayName: 'City',
						name: 'city',
						values: [
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'Contains', value: 'Contains' },
									{ name: 'Ends With', value: 'EndsWith' },
									{ name: 'Is', value: 'Is' },
									{ name: 'Is Known', value: 'IsKnown' },
									{ name: 'Is Not Known', value: 'IsNotKnown' },
									{ name: 'Starts With', value: 'StartsWith' },
								],
								default: 'Contains',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'City to filter by',
								displayOptions: {
									hide: {
										operator: ['IsKnown', 'IsNotKnown'],
									},
								},
							},
						],
					},
					// State Filter
					{
						displayName: 'State',
						name: 'state',
						values: [
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'In', value: 'In' },
									{ name: 'Is', value: 'Is' },
									{ name: 'Is Known', value: 'IsKnown' },
									{ name: 'Is Not', value: 'IsNot' },
									{ name: 'Is Not Known', value: 'IsNotKnown' },
									{ name: 'Not In', value: 'NotIn' },
								],
								default: 'Is',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'State to filter by (use comma-separated values for In/Not In operators)',
								displayOptions: {
									hide: {
										operator: ['IsKnown', 'IsNotKnown'],
									},
								},
							},
						],
					},
					// Private Filter
					{
						displayName: 'Private',
						name: 'private',
						values: [
							{
								displayName: 'Value',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'Is True', value: 'IsTrue' },
									{ name: 'Is False', value: 'IsFalse' },
								],
								default: 'IsFalse',
								description: 'Filter by private status',
							},
						],
					},
					// Create Date Filter
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
				],
			},
			// Pagination Settings
			{
				displayName: 'Pagination',
				name: 'pagination',
				type: 'fixedCollection',
				displayOptions: {
					show: {
						operation: ['search'],
					},
				},
				default: {},
				placeholder: 'Add Pagination',
				description: 'Configure pagination settings',
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
								description: 'Number of contacts per batch (each batch becomes one workflow item)',
								displayOptions: {
									show: {
										paginationMode: ['automaticBatched'],
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
								description: 'Maximum number of pages to retrieve (safety limit)',
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
										description: 'Disable automatic pagination',
									},
									{
										name: 'Automatic (All Results)',
										value: 'automatic',
										description: 'Automatically paginate through all results and return as individual items',
									},
									{
										name: 'Automatic (Batched)',
										value: 'automaticBatched',
										description: 'Automatically paginate and return results in batches (better for API calls, bulk operations)',
									},
									{
										name: 'Page by Page',
										value: 'pageByPage',
										description: 'Return one page at a time with pagination info (useful for large datasets)',
									},
								],
								default: 'off',
							},
							{
								displayName: 'Skip (Starting Point)',
								name: 'skip',
								type: 'number',
								typeOptions: {
									minValue: 0,
								},
								default: 0,
								description: 'Number of records to skip (starting point for pagination)',
								displayOptions: {
									hide: {
										paginationMode: ['off'],
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
								default: 50,
								description: 'Number of records per page (max 500)',
								displayOptions: {
									hide: {
										paginationMode: ['off'],
									},
								},
							},
						],
					},
				],
			},
			// Additional options
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				default: {},
				placeholder: 'Add Option',
				options: [
					{
						displayName: 'Include Segments',
						name: 'includeSegments',
						type: 'boolean',
						default: false,
						description: 'Whether to include segment information in the response',
					},
					{
						displayName: 'Include Custom Fields',
						name: 'includeCustomFields',
						type: 'boolean',
						default: false,
						description: 'Whether to include custom fields in the response',
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
					case 'getById':
						responseData = await getContactById(this, i);
						break;
					case 'getByEmail':
						responseData = await getContactByEmail(this, i);
						break;
					case 'search':
						responseData = await searchContacts(this, i);
						break;
					case 'update':
						responseData = await updateContact(this, i);
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

// Helper function to get base URL from credentials
function getBaseUrlFromCredentials(credentials: any): string {
	const environment = credentials.environment as string;
	switch (environment) {
		case 'dev':
			return 'https://apidevlegacy.virtuoussoftware.com';
		case 'qa':
			return 'https://apiqa.virtuoussoftware.com';
		default:
			return 'https://apidevlegacy.virtuoussoftware.com';
	}
}

// Standalone helper functions using context
async function getContactById(context: IExecuteFunctions, itemIndex: number): Promise<any> {
	const contactId = context.getNodeParameter('contactId', itemIndex) as number;

	// Get the credentials to determine the base URL
	const credentials = await context.getCredentials('virtuousApi');
	const baseUrl = getBaseUrlFromCredentials(credentials);

	const requestOptions: IRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/api/Contact/${contactId}`,
		json: true,
	};

	return await context.helpers.requestWithAuthentication.call(
		context,
		'virtuousApi',
		requestOptions
	);
}

async function getContactByEmail(context: IExecuteFunctions, itemIndex: number): Promise<any> {
	const email = context.getNodeParameter('email', itemIndex) as string;
	const additionalOptions = context.getNodeParameter('additionalOptions', itemIndex) as any;
	const credentials = await context.getCredentials('virtuousApi');
	const baseUrl = getBaseUrlFromCredentials(credentials);
	const queryParams: any = {
		email: email,
	};

	if (additionalOptions.includeSegments) {
		queryParams.includeSegments = 'true';
	}
	if (additionalOptions.includeCustomFields) {
		queryParams.includeCustomFields = 'true';
	}

	const requestOptions: IRequestOptions = {
		method: 'GET',
		url: `${baseUrl}/api/Contact/Find`,
		qs: queryParams,
		json: true,
	};

	return await context.helpers.requestWithAuthentication.call(
		context,
		'virtuousApi',
		requestOptions
	);
}

async function searchContacts(context: IExecuteFunctions, itemIndex: number): Promise<any> {
	const searchFilters = context.getNodeParameter('searchFilters', itemIndex) as any;
	const pagination = context.getNodeParameter('pagination', itemIndex) as any;
	const additionalOptions = context.getNodeParameter('additionalOptions', itemIndex) as any;
	const credentials = await context.getCredentials('virtuousApi');
	const baseUrl = getBaseUrlFromCredentials(credentials);

	// Extract pagination settings
	const paginationSettings = pagination?.pagination || {};
	const paginationMode = paginationSettings.paginationMode || 'off';
	const pageSize = paginationSettings.take || 50;
	const startSkip = paginationSettings.skip || 0;
	const maxPages = paginationSettings.maxPages || 10;
	const batchSize = paginationSettings.batchSize || 50;

	// Check if automatic pagination is enabled
	if (paginationMode === 'automatic') {
		const results = await handleAutomaticPagination(
			context,
			baseUrl,
			searchFilters,
			additionalOptions,
			startSkip,
			pageSize,
			maxPages
		);

		return results.results;
	}	// Check if batched automatic pagination is enabled
	if (paginationMode === 'automaticBatched') {
		const results = await handleAutomaticPagination(
			context,
			baseUrl,
			searchFilters,
			additionalOptions,
			startSkip,
			pageSize,
			maxPages
		);

		// Split results into batches
		const contacts = results.results;
		const batches = [];

		for (let i = 0; i < contacts.length; i += batchSize) {
			const batch = contacts.slice(i, i + batchSize);
			batches.push({
				contacts: batch,
				batchInfo: {
					batchNumber: Math.floor(i / batchSize) + 1,
					totalBatches: Math.ceil(contacts.length / batchSize),
					contactsInBatch: batch.length,
					totalContacts: contacts.length,
					startIndex: i,
					endIndex: Math.min(i + batchSize - 1, contacts.length - 1)
				}
			});
		}

		return batches;
	}

	// Check if page-by-page pagination is enabled
	if (paginationMode === 'pageByPage') {
		// For page-by-page, we just return one page with pagination info
		const queryParams: any = {
			take: pageSize,
			skip: startSkip,
		};

		// Add additional options to query params
		if (additionalOptions.includeSegments) {
			queryParams.includeSegments = 'true';
		}
		if (additionalOptions.includeCustomFields) {
			queryParams.includeCustomFields = 'true';
		}

		// Build the request body with search filters
		const requestBody = buildRequestBody(searchFilters);

		const requestOptions: IRequestOptions = {
			method: 'POST',
			url: `${baseUrl}/api/Contact/Query`,
			qs: queryParams,
			body: requestBody,
			json: true,
		};

		const response = await context.helpers.requestWithAuthentication.call(
			context,
			'virtuousApi',
			requestOptions
		);

		// Extract contacts from response
		let contacts = [];
		if (Array.isArray(response)) {
			contacts = response;
		} else if (response && Array.isArray(response.list)) {
			contacts = response.list;
		} else if (response && Array.isArray(response.contacts)) {
			contacts = response.contacts;
		} else if (response && Array.isArray(response.data)) {
			contacts = response.data;
		}

		return {
			contacts: contacts,
			pagination: {
				currentPage: Math.floor(startSkip / pageSize) + 1,
				pageSize: pageSize,
				skip: startSkip,
				returned: contacts.length,
				hasMore: contacts.length === pageSize,
				nextSkip: startSkip + pageSize
			}
		};
	}	// Single request mode (original behavior)
	const queryParams: any = {
		take: pageSize,
		skip: startSkip,
	};

	// Add additional options to query params
	if (additionalOptions.includeSegments) {
		queryParams.includeSegments = 'true';
	}
	if (additionalOptions.includeCustomFields) {
		queryParams.includeCustomFields = 'true';
	}

	// Build the request body with search filters
	const requestBody = buildRequestBody(searchFilters);

	const requestOptions: IRequestOptions = {
		method: 'POST',
		url: `${baseUrl}/api/Contact/Query`,
		qs: queryParams,
		body: requestBody,
		json: true,
	};

	return await context.helpers.requestWithAuthentication.call(
		context,
		'virtuousApi',
		requestOptions
	);
}

// Helper function for automatic pagination
async function handleAutomaticPagination(
	context: IExecuteFunctions,
	baseUrl: string,
	searchFilters: any,
	additionalOptions: any,
	startSkip: number,
	pageSize: number,
	maxPages: number
): Promise<any> {
	const allResults: any[] = [];
	let currentSkip = startSkip;
	let pageCount = 0;

	// Build the request body once (it doesn't change between requests)
	const requestBody = buildRequestBody(searchFilters);

	while (pageCount < maxPages) {
		// Set up query params for this page
		const queryParams: any = {
			take: pageSize,
			skip: currentSkip,
		};

		// Add additional options to query params
		if (additionalOptions.includeSegments) {
			queryParams.includeSegments = 'true';
		}
		if (additionalOptions.includeCustomFields) {
			queryParams.includeCustomFields = 'true';
		}

		// Make the request
		const requestOptions: IRequestOptions = {
			method: 'POST',
			url: `${baseUrl}/api/Contact/Query`,
			qs: queryParams,
			body: requestBody,
			json: true,
		};

		const response = await context.helpers.requestWithAuthentication.call(
			context,
			'virtuousApi',
			requestOptions
		);

		// Handle different response structures
		let contacts = [];
		if (Array.isArray(response)) {
			// If response is directly an array
			contacts = response;
		} else if (response && Array.isArray(response.list)) {
			// If response has a 'list' property with contacts
			contacts = response.list;
		} else if (response && Array.isArray(response.contacts)) {
			// If response has a 'contacts' property
			contacts = response.contacts;
		} else if (response && Array.isArray(response.data)) {
			// If response has a 'data' property
			contacts = response.data;
		}

		// If no contacts found, stop pagination
		if (!contacts || contacts.length === 0) {
			break;
		}

		// Add results to our collection
		allResults.push(...contacts);

		// If we got fewer results than the page size, we've reached the end
		if (contacts.length < pageSize) {
			break;
		}

		// Prepare for next page
		currentSkip += pageSize;
		pageCount++;
	}

	return {
		results: allResults,
		totalResults: allResults.length,
		pagesFetched: pageCount
	};
}

// Helper function to build request body from search filters
function buildRequestBody(searchFilters: any): any {
	const requestBody: any = {
		groups: []
	};

	// Process each filter type and convert to API format
	if (searchFilters) {
		const filterGroup: any = {
			conditions: []
		};

		// Process Contact ID filters
		if (searchFilters.contactId && searchFilters.contactId.length > 0) {
			for (const filter of searchFilters.contactId) {
				filterGroup.conditions.push({
					parameter: 'Contact Id',
					operator: filter.operator,
					value: filter.value.toString()
				});
			}
		}

		// Process Contact Type filters
		if (searchFilters.contactType && searchFilters.contactType.length > 0) {
			for (const filter of searchFilters.contactType) {
				filterGroup.conditions.push({
					parameter: 'Contact Type',
					operator: filter.operator,
					value: filter.value
				});
			}
		}

		// Process First Name filters
		if (searchFilters.firstName && searchFilters.firstName.length > 0) {
			for (const filter of searchFilters.firstName) {
				filterGroup.conditions.push({
					parameter: 'First Name',
					operator: filter.operator,
					value: filter.value
				});
			}
		}

		// Process Last Name filters
		if (searchFilters.lastName && searchFilters.lastName.length > 0) {
			for (const filter of searchFilters.lastName) {
				filterGroup.conditions.push({
					parameter: 'Last Name',
					operator: filter.operator,
					value: filter.value
				});
			}
		}

		// Process Email Address filters
		if (searchFilters.emailAddress && searchFilters.emailAddress.length > 0) {
			for (const filter of searchFilters.emailAddress) {
				const condition: any = {
					parameter: 'Email Address',
					operator: filter.operator
				};
				if (filter.operator !== 'IsKnown' && filter.operator !== 'IsNotKnown') {
					condition.value = filter.value;
				}
				filterGroup.conditions.push(condition);
			}
		}

		// Process Phone Number filters
		if (searchFilters.phoneNumber && searchFilters.phoneNumber.length > 0) {
			for (const filter of searchFilters.phoneNumber) {
				const condition: any = {
					parameter: 'Phone Number',
					operator: filter.operator
				};
				if (filter.operator !== 'IsKnown' && filter.operator !== 'IsNotKnown') {
					condition.value = filter.value;
				}
				filterGroup.conditions.push(condition);
			}
		}

		// Process City filters
		if (searchFilters.city && searchFilters.city.length > 0) {
			for (const filter of searchFilters.city) {
				const condition: any = {
					parameter: 'City',
					operator: filter.operator
				};
				if (filter.operator !== 'IsKnown' && filter.operator !== 'IsNotKnown') {
					condition.value = filter.value;
				}
				filterGroup.conditions.push(condition);
			}
		}

		// Process State filters
		if (searchFilters.state && searchFilters.state.length > 0) {
			for (const filter of searchFilters.state) {
				const condition: any = {
					parameter: 'State',
					operator: filter.operator
				};
				if (filter.operator !== 'IsKnown' && filter.operator !== 'IsNotKnown') {
					condition.value = filter.value;
				}
				filterGroup.conditions.push(condition);
			}
		}

		// Process Private filters
		if (searchFilters.private && searchFilters.private.length > 0) {
			for (const filter of searchFilters.private) {
				filterGroup.conditions.push({
					parameter: 'Is Private',
					operator: filter.operator,
					value: ''
				});
			}
		}

		// Process Create Date filters
		if (searchFilters.createDate && searchFilters.createDate.length > 0) {
			for (const filter of searchFilters.createDate) {
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
		}

		// Process Last Modified Date filters
		if (searchFilters.lastModifiedDate && searchFilters.lastModifiedDate.length > 0) {
			for (const filter of searchFilters.lastModifiedDate) {
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

		// Only add the filter group if it has conditions
		if (filterGroup.conditions.length > 0) {
			requestBody.groups.push(filterGroup);
		}
	}

	return requestBody;
}

async function updateContact(context: IExecuteFunctions, itemIndex: number): Promise<any> {
	const contactId = context.getNodeParameter('contactId', itemIndex) as number;
	const contactData = context.getNodeParameter('contactData', itemIndex) as any;

	// Get the credentials to determine the base URL
	const credentials = await context.getCredentials('virtuousApi');
	const baseUrl = getBaseUrlFromCredentials(credentials);

	// Build the request body
	const requestBody: any = {};

	// Add contact fields if provided
	if (contactData.contactType !== undefined && contactData.contactType !== '') {
		requestBody.contactType = contactData.contactType;
	}
	if (contactData.name !== undefined && contactData.name !== '') {
		requestBody.name = contactData.name;
	}
	if (contactData.informalName !== undefined && contactData.informalName !== '') {
		requestBody.informalName = contactData.informalName;
	}
	if (contactData.description !== undefined && contactData.description !== '') {
		requestBody.description = contactData.description;
	}
	if (contactData.website !== undefined && contactData.website !== '') {
		requestBody.website = contactData.website;
	}
	if (contactData.maritalStatus !== undefined && contactData.maritalStatus !== '') {
		requestBody.maritalStatus = contactData.maritalStatus;
	}
	if (contactData.anniversaryMonth !== undefined && contactData.anniversaryMonth !== 0) {
		requestBody.anniversaryMonth = contactData.anniversaryMonth;
	}
	if (contactData.anniversaryDay !== undefined && contactData.anniversaryDay !== 0) {
		requestBody.anniversaryDay = contactData.anniversaryDay;
	}
	if (contactData.anniversaryYear !== undefined && contactData.anniversaryYear !== 0) {
		requestBody.anniversaryYear = contactData.anniversaryYear;
	}
	if (contactData.originSegmentId !== undefined && contactData.originSegmentId !== 0) {
		requestBody.originSegmentId = contactData.originSegmentId;
	}
	if (contactData.isPrivate !== undefined) {
		requestBody.isPrivate = contactData.isPrivate;
	}

	// Process custom fields
	if (contactData.customFields && contactData.customFields.field && contactData.customFields.field.length > 0) {
		requestBody.customFields = contactData.customFields.field.map((field: any) => ({
			name: field.name,
			value: field.value,
			displayName: field.displayName,
		}));
	}

	// Process custom collections
	if (contactData.customCollections && contactData.customCollections.collection && contactData.customCollections.collection.length > 0) {
		requestBody.customCollections = contactData.customCollections.collection.map((collection: any) => ({
			name: collection.name,
			fields: collection.fields?.field ? collection.fields.field.map((field: any) => ({
				name: field.name,
				value: field.value,
			})) : [],
		}));
	}

	const requestOptions: IRequestOptions = {
		method: 'PUT',
		url: `${baseUrl}/api/Contact/${contactId}`,
		body: requestBody,
		json: true,
	};

	return await context.helpers.requestWithAuthentication.call(
		context,
		'virtuousApi',
		requestOptions
	);
}
