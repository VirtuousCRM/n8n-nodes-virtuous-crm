import type { INodeProperties } from 'n8n-workflow';

const showOnlyForGiftTransaction = {
	resource: ['giftTransaction'],
};

export const GiftTransactionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForGiftTransaction,
		},
		options: [
			{
				name: 'Gift Transaction',
				value: 'giftTransaction',
				description: 'Create a Gift that will go through the import process',
				action: 'Create a gift that will go through the import process',
				routing: {
					request: {
						method: 'POST',
						url: '',
					},
				},
			},
		],
		default: 'giftTransaction',
	},
	{
		displayName: 'Transaction Source',
		name: 'transactionSource',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The source of the gift transaction',
	},
	{
		displayName: 'Transaction ID',
		name: 'transactionId',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The transaction ID of the gift transaction',
	},
	{
		displayName: 'Gift Date',
		name: 'giftDate',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The date of the gift transaction',
	},
	{
		displayName: 'Gift Cancel Date',
		name: 'giftCancelDate',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The cancel date of the gift transaction',
	},
	{
		displayName: 'Gift Type',
		name: 'giftType',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The type of the gift transaction. Examples.',
	},
	{
		displayName: 'Gift Amount',
		name: 'giftAmount',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The amount of the gift transaction',
	},
	{
		displayName: 'Currency Code',
		name: 'currencyCode',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The currency code of the gift transaction. Examples: USD, CAD, EUR, GBP.',
	},
	{
		displayName: 'Exchange Rate',
		name: 'exchangeRate',
		type: 'number',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The exchange rate of the gift transaction',
	},

	{
		displayName: 'Contact Reference ID',
		name: 'referenceId',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The source ID of the contact transaction',
	},
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The ID of the contact',
	},
	{
		displayName: 'Contact Full Name',
		name: 'contactName',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The name of the contact for the contact transaction',
	},
	{
		displayName: 'Contact Type',
		name: 'contactType',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description:
			'The type of contact for the contact transaction. Examples: Household, Organization, Foundation. Configurable via CRM.',
	},
	{
		displayName: 'Contact Title',
		name: 'contactTitle',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The title of the contact for the contact transaction',
	},
	{
		displayName: 'Contact First Name',
		name: 'contactFirstName',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The first name of the contact for the contact transaction',
	},
	{
		displayName: 'Contact Middle Name',
		name: 'contactMiddleName',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The middle name of the contact for the contact transaction',
	},
	{
		displayName: 'Contact Last Name',
		name: 'contactLastName',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The last name of the contact for the contact transaction',
	},
	{
		displayName: 'Contact Suffix',
		name: 'contactSuffix',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The suffix of the contact for the contact transaction',
	},
	{
		displayName: 'Contact Email Type',
		name: 'contactEmailType',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description:
			'The email type of the contact for the contact transaction. Examples: Primary Email, Secondary Email, Home Email, Work Email, Other Email.',
	},
	{
		displayName: 'Contact Email',
		name: 'contactEmail',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The email of the contact for the contact transaction',
	},
	{
		displayName: 'Contact Phone Type',
		name: 'contactPhoneType',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description:
			'The phone type of the contact for the contact transaction. Examples: Home Phone, Mobile Phone, Work Phone, Other Phone.',
	},
	{
		displayName: 'Contact Phone Number',
		name: 'contactPhoneNumber',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The phone number of the contact for the contact transaction',
	},
	{
		displayName: 'Contact Address Line 1',
		name: 'contactAddressLine1',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The address line 1 of the contact for the contact transaction',
	},
	{
		displayName: 'Contact Address Line 2',
		name: 'contactAddressLine2',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The address line 2 of the contact for the contact transaction',
	},
	{
		displayName: 'Contact City',
		name: 'contactCity',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The city of the contact for the contact transaction',
	},

	{
		displayName: 'Contact State',
		name: 'contactState',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The state of the contact for the contact transaction',
	},
	{
		displayName: 'Contact Postal Code',
		name: 'contactPostalCode',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The postal code of the contact for the contact transaction',
	},
	{
		displayName: 'Contact Country',
		name: 'contactCountry',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The country of the contact for the contact transaction',
	},

	{
		displayName: 'Contact Tags',
		name: 'contactTags',
		type: 'string',
		noDataExpression: true,
		default: 'tag1;tag2;tag3',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The tags of the contact for the contact transaction',
	},

	{
		displayName: 'Contact Email Lists',
		name: 'contactEmailLists',
		type: 'json',
		noDataExpression: true,
		default: '[]',
		placeholder: '["list1", "list2", "list3"]',
		displayOptions: {
			show: {
				operation: ['giftTransaction'],
			},
		},
		description: 'The email lists of the contact for the contact transaction',
	},
];
