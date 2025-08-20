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
	extractContactsFromResponse,
} from '../../utils/VirtuousUtils';

export class VirtuousContactNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Virtuous Contact',
		name: 'virtuousContactNode',
		icon: VIRTUOUS_ICON,
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
						name: 'Create Contact',
						value: 'create',
						description: 'Create a new contact record in Virtuous. Requires at least a name or email address.',
						action: 'Create a new contact',
					},
					{
						name: 'Get Contact by Email',
						value: 'getByEmail',
						description: 'Find and retrieve a single contact using their email address. Returns null if not found.',
						action: 'Get a contact by email',
					},
					{
						name: 'Get Contact by ID',
						value: 'getById',
						description: 'Retrieve a specific contact using their Virtuous ID. Fastest way to get a known contact.',
						action: 'Get a contact by ID',
					},
					{
						name: 'Search Contacts',
						value: 'search',
						description: 'Query contacts with advanced filters (name, tags, custom fields). Supports pagination for large result sets.',
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
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['getById'],
					},
				},
				default: '={{ $json.Id || $json.id }}',
				placeholder: '{{ $json.ID }} or 12345',
				description: 'The ID of the contact to retrieve. Use expressions to get from previous node data.',
			},
			// Contact ID field for update
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['update'],
					},
				},
				default: '={{ $json.id }}',
				placeholder: '{{ $json.ID }} or 12345',
				description: 'The ID of the contact to update. Use expressions to get from previous node data.',
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
				description: 'The email address to search for. Returns the first matching contact or null if not found.',
			},
			// Create Contact Fields
			{
				displayName: 'Contact Data',
				name: 'createContactData',
				type: 'collection',
				displayOptions: {
					show: {
						operation: ['create'],
					},
				},
				default: {},
				placeholder: 'Add Contact Field',
				description: 'Contact fields for the new contact',
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
						displayName: 'Is Archived',
						name: 'isArchived',
						type: 'boolean',
						default: false,
						description: 'Whether the contact is archived',
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
						displayName: 'Reference ID',
						name: 'referenceId',
						type: 'string',
						default: '',
						description: 'External reference ID',
					},
					{
						displayName: 'Reference Source',
						name: 'referenceSource',
						type: 'string',
						default: '',
						description: 'External reference source',
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
			// Contact Addresses for Create
			{
				displayName: 'Contact Addresses',
				name: 'contactAddresses',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['create'],
					},
				},
				default: {},
				description: 'Addresses for the contact',
				options: [
					{
						displayName: 'Address',
						name: 'address',
						values: [
							{
								displayName: 'Address 1',
								name: 'address1',
								type: 'string',
								default: '',
								description: 'Street address line 1',
							},
							{
								displayName: 'Address 2',
								name: 'address2',
								type: 'string',
								default: '',
								description: 'Street address line 2',
							},
							{
								displayName: 'City',
								name: 'city',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Country Code',
								name: 'countryCode',
								type: 'string',
								default: 'US',
								description: 'Country code (e.g., US, CA)',
							},
							{
								displayName: 'Is Primary',
								name: 'isPrimary',
								type: 'boolean',
								default: false,
								description: 'Whether this is the primary address',
							},
							{
								displayName: 'Label',
								name: 'label',
								type: 'string',
								default: '',
								description: 'Address label (e.g., Home, Work)',
							},
							{
								displayName: 'Latitude',
								name: 'latitude',
								type: 'number',
								typeOptions: {
									numberPrecision: 6,
								},
								default: 0,
								description: 'Latitude coordinate',
							},
							{
								displayName: 'Longitude',
								name: 'longitude',
								type: 'number',
								typeOptions: {
									numberPrecision: 6,
								},
								default: 0,
								description: 'Longitude coordinate',
							},
							{
								displayName: 'Postal Code',
								name: 'postal',
								type: 'string',
								default: '',
								description: 'Postal/ZIP code',
							},
							{
								displayName: 'State Code',
								name: 'stateCode',
								type: 'string',
								default: '',
								description: 'State/Province code (e.g., CA, NY)',
							},
						],
					},
				],
			},
			// Contact Individuals for Create
			{
				displayName: 'Contact Individuals',
				name: 'contactIndividuals',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['create'],
					},
				},
				default: {},
				description: 'Individual persons associated with this contact',
				options: [
					{
						displayName: 'Individual',
						name: 'individual',
						values: [
							{
								displayName: 'Approximate Age',
								name: 'approximateAge',
								type: 'number',
								typeOptions: {
									minValue: 0,
									maxValue: 150,
								},
								default: 0,
								description: 'Approximate age if exact birth date is unknown',
							},
							{
								displayName: 'Birth Day',
								name: 'birthDay',
								type: 'number',
								typeOptions: {
									minValue: 1,
									maxValue: 31,
								},
								default: 0,
								description: 'Birth day (1-31)',
							},
							{
								displayName: 'Birth Month',
								name: 'birthMonth',
								type: 'number',
								typeOptions: {
									minValue: 1,
									maxValue: 12,
								},
								default: 0,
								description: 'Birth month (1-12)',
							},
							{
								displayName: 'Birth Year',
								name: 'birthYear',
								type: 'number',
								default: 0,
							},
							{
								displayName: 'First Name',
								name: 'firstName',
								type: 'string',
								default: '',
								description: 'First name of the individual',
							},
							{
								displayName: 'Gender',
								name: 'gender',
								type: 'options',
								options: [
									{ name: 'Female', value: 'Female' },
									{ name: 'Male', value: 'Male' },
									{ name: 'Other', value: 'Other' },
								],
								default: 'Other',
								description: 'Gender of the individual',
							},
							{
								displayName: 'Is Deceased',
								name: 'isDeceased',
								type: 'boolean',
								default: false,
								description: 'Whether the individual is deceased',
							},
							{
								displayName: 'Is Primary',
								name: 'isPrimary',
								type: 'boolean',
								default: false,
								description: 'Whether this is the primary individual',
							},
							{
								displayName: 'Is Secondary',
								name: 'isSecondary',
								type: 'boolean',
								default: false,
								description: 'Whether this is a secondary individual',
							},
							{
								displayName: 'Last Name',
								name: 'lastName',
								type: 'string',
								default: '',
								description: 'Last name of the individual',
							},
							{
								displayName: 'Middle Name',
								name: 'middleName',
								type: 'string',
								default: '',
								description: 'Middle name of the individual',
							},
							{
								displayName: 'Passion',
								name: 'passion',
								type: 'string',
								default: '',
								description: 'Individual\'s passion or interests',
							},
							{
								displayName: 'Prefix',
								name: 'prefix',
								type: 'string',
								default: '',
								description: 'Name prefix (e.g., Mr., Mrs., Dr.)',
							},
							{
								displayName: 'Suffix',
								name: 'suffix',
								type: 'string',
								default: '',
								description: 'Name suffix (e.g., Jr., Sr., III)',
							},
						],
					},
				],
			},
			// Contact Methods for Individuals in Create
			{
				displayName: 'Contact Methods',
				name: 'contactMethods',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['create'],
					},
				},
				default: {},
				description: 'Contact methods (email, phone, etc.) for individuals',
				options: [
					{
						displayName: 'Contact Method',
						name: 'method',
						values: [
							{
								displayName: 'Individual Index',
								name: 'individualIndex',
								type: 'number',
								typeOptions: {
									minValue: 0,
								},
								default: 0,
								description: 'Index of the individual this contact method belongs to (0 for first individual, 1 for second, etc.)',
							},
							{
								displayName: 'Is Opted In',
								name: 'isOptedIn',
								type: 'boolean',
								default: true,
								description: 'Whether the contact has opted in for this method',
							},
							{
								displayName: 'Is Primary',
								name: 'isPrimary',
								type: 'boolean',
								default: false,
								description: 'Whether this is the primary contact method',
							},
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								options: [
									{ name: 'Email', value: 'Email' },
									{ name: 'Fax', value: 'Fax' },
									{ name: 'Mobile', value: 'Mobile' },
									{ name: 'Other', value: 'Other' },
									{ name: 'Phone', value: 'Phone' },
								],
								default: 'Email',
								description: 'Type of contact method',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'The contact method value (email address, phone number, etc.)',
							},
						],
					},
				],
			},
			// Custom Collections for Create
			{
				displayName: 'Custom Collections',
				name: 'createCustomCollections',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['create'],
					},
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
			// Custom Fields for Create
			{
				displayName: 'Custom Fields',
				name: 'createCustomFields',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['create'],
					},
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
				description: 'Build complex search queries using multiple filter types. Combine name searches, tags, custom fields, and date ranges.',
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
				description: 'Control how results are returned: all at once, in batches, or page by page. Choose based on your workflow needs.',
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
								description: 'Number of contacts per batch (each batch becomes one workflow item). Use smaller values for more granular processing, larger for efficiency.',
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
										description: 'Fetch ALL contacts and return each as individual workflow items. Perfect for iterating with other nodes (e.g., Gift queries per contact).',
									},
									{
										name: 'Automatic (Batched)',
										value: 'automaticBatched',
										description: 'Fetch ALL contacts but group them into batches. Each batch becomes one workflow item with metadata. Good for bulk processing.',
									},
									{
										name: 'Page by Page',
										value: 'pageByPage',
										description: 'Return exactly one page with navigation info. Use when you need precise control over pagination or are building custom pagination flows.',
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
									maxValue: 500,
								},
								default: 50,
								description: 'Number of records per page (max 500). Includes pagination metadata in response.',
								displayOptions: {
									show: {
										paginationMode: ['pageByPage'],
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
				description: 'Extra data to include in the API response. Enable for richer contact information.',
				options: [
					{
						displayName: 'Include Segments',
						name: 'includeSegments',
						type: 'boolean',
						default: false,
						description: 'Whether to include contact segment/group membership data. Useful for filtering or categorizing contacts.',
					},
					{
						displayName: 'Include Custom Fields',
						name: 'includeCustomFields',
						type: 'boolean',
						default: false,
						description: 'Whether to include all custom field values for contacts. Required if you need organization-specific data.',
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
					case 'create':
						responseData = await createContact(this, i);
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
// Standalone helper functions using context
async function getContactById(context: IExecuteFunctions, itemIndex: number): Promise<any> {
	const contactIdParam = context.getNodeParameter('contactId', itemIndex) as string;
	// Convert string to number, handling both direct numbers and expression results
	const contactId = parseInt(contactIdParam, 10);

	if (isNaN(contactId)) {
		throw new NodeOperationError(context.getNode(), `Invalid contact ID: ${contactIdParam}. Please provide a valid number.`);
	}

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
	const batchSize = paginationSettings.batchSize || 50;
	const internalBatchSize = paginationSettings.internalBatchSize || 100;
	const maxPages = paginationSettings.maxPages || 10;

	// Check if automatic pagination is enabled
	if (paginationMode === 'automatic') {
		const requestBody = buildRequestBody(searchFilters);
		const results = await handleAutomaticPagination(
			context,
			async (skip: number, take: number) => {
				const queryParams: any = { take, skip };
				if (additionalOptions.includeSegments) {
					queryParams.includeSegments = 'true';
				}
				if (additionalOptions.includeCustomFields) {
					queryParams.includeCustomFields = 'true';
				}

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

				// Extract contacts from response and ensure we return an array for pagination
				return extractContactsFromResponse(response);
			},
			internalBatchSize, // Use the user-configurable batch size
			maxPages // Pass max pages limit
		);

		return results;
	}	// Check if batched automatic pagination is enabled
	if (paginationMode === 'automaticBatched') {
		const requestBody = buildRequestBody(searchFilters);
		const results = await handleAutomaticPagination(
			context,
			async (skip: number, take: number) => {
				const queryParams: any = { take, skip };
				if (additionalOptions.includeSegments) {
					queryParams.includeSegments = 'true';
				}
				if (additionalOptions.includeCustomFields) {
					queryParams.includeCustomFields = 'true';
				}

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

				// Extract contacts from response and ensure we return an array for pagination
				return extractContactsFromResponse(response);
			},
			internalBatchSize, // Use the user-configurable internal batch size
			maxPages // Pass max pages limit
		);

		// Split results into batches
		const contacts = results;
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
	const contactIdParam = context.getNodeParameter('contactId', itemIndex) as string;
	// Convert string to number, handling both direct numbers and expression results
	const contactId = parseInt(contactIdParam, 10);

	if (isNaN(contactId)) {
		throw new NodeOperationError(context.getNode(), `Invalid contact ID: ${contactIdParam}. Please provide a valid number.`);
	}

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

async function createContact(context: IExecuteFunctions, itemIndex: number): Promise<any> {
	const contactData = context.getNodeParameter('createContactData', itemIndex) as any;
	const contactAddresses = context.getNodeParameter('contactAddresses', itemIndex, {}) as any;
	const contactIndividuals = context.getNodeParameter('contactIndividuals', itemIndex, {}) as any;
	const contactMethods = context.getNodeParameter('contactMethods', itemIndex, {}) as any;
	const customCollections = context.getNodeParameter('createCustomCollections', itemIndex, {}) as any;
	const customFields = context.getNodeParameter('createCustomFields', itemIndex, {}) as any;

	const credentials = await context.getCredentials('virtuousApi');
	const baseUrl = getBaseUrlFromCredentials(credentials);

	// Build the request body
	const requestBody: any = {};

	// Basic contact data
	if (contactData.anniversaryDay) requestBody.anniversaryDay = contactData.anniversaryDay;
	if (contactData.anniversaryMonth) requestBody.anniversaryMonth = contactData.anniversaryMonth;
	if (contactData.anniversaryYear) requestBody.anniversaryYear = contactData.anniversaryYear;
	if (contactData.contactType) requestBody.contactType = contactData.contactType;
	if (contactData.description) requestBody.description = contactData.description;
	if (contactData.informalName) requestBody.informalName = contactData.informalName;
	if (contactData.isArchived !== undefined) requestBody.isArchived = contactData.isArchived;
	if (contactData.isPrivate !== undefined) requestBody.isPrivate = contactData.isPrivate;
	if (contactData.maritalStatus) requestBody.maritalStatus = contactData.maritalStatus;
	if (contactData.name) requestBody.name = contactData.name;
	if (contactData.originSegmentId) requestBody.originSegmentId = contactData.originSegmentId;
	if (contactData.referenceId) requestBody.referenceId = contactData.referenceId;
	if (contactData.referenceSource) requestBody.referenceSource = contactData.referenceSource;
	if (contactData.website) requestBody.website = contactData.website;

	// Contact addresses
	if (contactAddresses.address && contactAddresses.address.length > 0) {
		requestBody.contactAddresses = contactAddresses.address.map((address: any) => {
			const addressObj: any = {};
			if (address.address1) addressObj.address1 = address.address1;
			if (address.address2) addressObj.address2 = address.address2;
			if (address.city) addressObj.city = address.city;
			if (address.countryCode) addressObj.countryCode = address.countryCode;
			if (address.isPrimary !== undefined) addressObj.isPrimary = address.isPrimary;
			if (address.label) addressObj.label = address.label;
			if (address.latitude) addressObj.latitude = address.latitude;
			if (address.longitude) addressObj.longitude = address.longitude;
			if (address.postal) addressObj.postal = address.postal;
			if (address.stateCode) addressObj.stateCode = address.stateCode;
			return addressObj;
		});
	}

	// Contact individuals
	if (contactIndividuals.individual && contactIndividuals.individual.length > 0) {
		requestBody.contactIndividuals = contactIndividuals.individual.map((individual: any, index: number) => {
			const individualObj: any = {};
			if (individual.approximateAge) individualObj.approximateAge = individual.approximateAge;
			if (individual.birthDay) individualObj.birthDay = individual.birthDay;
			if (individual.birthMonth) individualObj.birthMonth = individual.birthMonth;
			if (individual.birthYear) individualObj.birthYear = individual.birthYear;
			if (individual.firstName) individualObj.firstName = individual.firstName;
			if (individual.gender) individualObj.gender = individual.gender;
			if (individual.isDeceased !== undefined) individualObj.isDeceased = individual.isDeceased;
			if (individual.isPrimary !== undefined) individualObj.isPrimary = individual.isPrimary;
			if (individual.isSecondary !== undefined) individualObj.isSecondary = individual.isSecondary;
			if (individual.lastName) individualObj.lastName = individual.lastName;
			if (individual.middleName) individualObj.middleName = individual.middleName;
			if (individual.passion) individualObj.passion = individual.passion;
			if (individual.prefix) individualObj.prefix = individual.prefix;
			if (individual.suffix) individualObj.suffix = individual.suffix;

			// Add contact methods for this individual
			if (contactMethods.method && contactMethods.method.length > 0) {
				const methodsForThisIndividual = contactMethods.method.filter((method: any) =>
					method.individualIndex === index
				);

				if (methodsForThisIndividual.length > 0) {
					individualObj.contactMethods = methodsForThisIndividual.map((method: any) => {
						const methodObj: any = {};
						if (method.isOptedIn !== undefined) methodObj.isOptedIn = method.isOptedIn;
						if (method.isPrimary !== undefined) methodObj.isPrimary = method.isPrimary;
						if (method.type) methodObj.type = method.type;
						if (method.value) methodObj.value = method.value;
						return methodObj;
					});
				}
			}

			return individualObj;
		});
	}

	// Custom collections
	if (customCollections.collection && customCollections.collection.length > 0) {
		requestBody.customCollections = customCollections.collection.map((collection: any) => ({
			name: collection.name,
			fields: collection.fields?.field ? collection.fields.field.map((field: any) => ({
				name: field.name,
				value: field.value,
			})) : [],
		}));
	}

	// Custom fields
	if (customFields.field && customFields.field.length > 0) {
		requestBody.customFields = customFields.field.map((field: any) => ({
			name: field.name,
			value: field.value,
			displayName: field.displayName,
		}));
	}

	const requestOptions: IRequestOptions = {
		method: 'POST',
		url: `${baseUrl}/api/Contact`,
		body: requestBody,
		json: true,
	};

	return await context.helpers.requestWithAuthentication.call(
		context,
		'virtuousApi',
		requestOptions
	);
}
