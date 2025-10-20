import { NodeApiError, type IExecuteFunctions, type INodeProperties } from 'n8n-workflow';
import { virtuousCrmApiRequest } from '../../shared/crmTransport';

export const giftTransactionCreateDescription = {
	description: {
		properties: [
			{
				displayName: 'Input Method',
				name: 'inputMethod',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
					},
				},
				options: [
					{
						name: 'Using Fields Below',
						value: 'fields',
					},
					{
						name: 'Using JSON',
						value: 'json',
					},
				],
				default: 'fields',
			},
			{
				displayName: 'Transaction Source',
				name: 'transactionSource',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The source of the gift transaction',
			},
			{
				displayName: 'Transaction ID',
				name: 'transactionId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The transaction ID of the gift transaction',
			},
			{
				displayName: 'Contact Reference ID',
				name: 'contactReferenceId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The reference ID of the contact',
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The ID of the contact',
			},
			{
				displayName: 'Contact Full Name',
				name: 'contactName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The full name of the contact',
			},
			{
				displayName: 'Contact Type',
				name: 'contactType',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description:
					'The type of contact. Examples: Household, Organization, Foundation. Configurable via CRM.',
			},
			{
				displayName: 'Contact Title',
				name: 'contactTitle',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The title of the contact',
			},
			{
				displayName: 'Contact First Name',
				name: 'contactFirstName',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The first name of the contact',
			},
			{
				displayName: 'Contact Middle Name',
				name: 'contactMiddleName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The middle name of the contact',
			},
			{
				displayName: 'Contact Last Name',
				name: 'contactLastName',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The last name of the contact',
			},
			{
				displayName: 'Contact Suffix',
				name: 'contactSuffix',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The suffix of the contact',
			},
			{
				displayName: 'Contact Birth Month',
				name: 'contactBirthMonth',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The birth month of the contact',
			},
			{
				displayName: 'Contact Birth Day',
				name: 'contactBirthDay',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The birth day of the contact',
			},
			{
				displayName: 'Contact Birth Year',
				name: 'contactBirthYear',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The birth year of the contact',
			},
			{
				displayName: 'Contact Gender',
				name: 'contactGender',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The gender of the contact',
			},
			{
				displayName: 'Contact Email Type',
				name: 'contactEmailType',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description:
					'The email type of the contact. Examples: Primary Email, Secondary Email, Home Email, Work Email, Other Email.',
			},
			{
				displayName: 'Contact Email',
				name: 'contactEmail',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The email of the contact',
			},
			{
				displayName: 'Contact Phone Type',
				name: 'contactPhoneType',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description:
					'The phone type of the contact. Examples: Home Phone, Mobile Phone, Work Phone, Other Phone.',
			},
			{
				displayName: 'Contact Phone Number',
				name: 'contactPhoneNumber',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The phone number of the contact',
			},
			{
				displayName: 'Contact Address Line 1',
				name: 'contactAddressLine1',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The address line 1 of the contact',
			},
			{
				displayName: 'Contact Address Line 2',
				name: 'contactAddressLine2',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The address line 2 of the contact',
			},
			{
				displayName: 'Contact City',
				name: 'contactCity',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The city of the contact',
			},

			{
				displayName: 'Contact State',
				name: 'contactState',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The state of the contact',
			},
			{
				displayName: 'Contact Postal Code',
				name: 'contactPostal',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The postal code of the contact',
			},
			{
				displayName: 'Contact Country',
				name: 'contactCountry',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The country of the contact',
			},

			{
				displayName: 'Contact Tags',
				name: 'contactTags',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				hint: 'The tags of the contact',
				description: 'The tags of the contact, separated by semicolons. Example: tag1;tag2;tag3; .',
			},

			{
				displayName: 'Contact Email Lists',
				name: 'contactEmailLists',
				type: 'json',
				default: '[]',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Example: ["list1", "list2", "list3"]',
				hint: 'Provide a JSON array of email list names.'
			},
			{
				displayName: 'Gift Date',
				name: 'giftDate',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The date of the gift transaction',
			},
			{
				displayName: 'Gift Cancel Date',
				name: 'cancelDate',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The cancel date of the gift transaction',
			},
			{
				displayName: 'Gift Type',
				name: 'giftType',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The type of the gift transaction. Examples: Cash, Check, Credit, EFT, NonCash, Stock, Other, ReversingTransaction, Cryptocoin, Pledge, PayPal.',
			},
			{
				displayName: 'Gift Amount',
				name: 'giftAmount',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The amount of the gift transaction',
			},
			{
				displayName: 'Currency Code',
				name: 'giftCurrencyCode',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The currency code of the gift transaction. Examples: USD, CAD, EUR, GBP.',
			},
			{
				displayName: 'Exchange Rate',
				name: 'giftExchangeRate',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The exchange rate of the gift transaction',
			},
			{
				displayName: 'Gift Frequency',
				name: 'giftFrequency',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The frequency of the gift',
			},
			{
				displayName: 'Recurring Gift Transaction ID',
				name: 'recurringGiftTransactionId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
			},
			{
				displayName: 'Recurring Gift Transaction Update',
				name: 'recurringGiftTransactionUpdate',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Whether to update the recurring gift transaction',
			},
			{
				displayName: 'Pledge Frequency',
				name: 'pledgeFrequency',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The pledge frequency of the gift transaction',
			},
			{
				displayName: 'Pledge Transaction ID',
				name: 'pledgeTransactionId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The pledge transaction ID of the gift transaction',
			},
			{
				displayName: 'Pledge Expected Fulfillment Date',
				name: 'pledgeExpectedFullfillmentDate',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The pledge expected fulfillment date of the gift transaction',
			},
			{
				displayName: 'Gift Batch',
				name: 'giftBatch',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The batch of the gift transaction',
			},
			{
				displayName: 'Gift Notes',
				name: 'giftNotes',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The gift notes of the gift transaction',
			},
			{
				displayName: 'Gift Segment',
				name: 'giftSegment',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The segment of the gift transaction',
			},
			{
				displayName: 'Media Outlet',
				name: 'mediaOutlet',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The media outlet of the gift transaction',
			},
			{
				displayName: 'Receipt Date',
				name: 'receiptDate',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The receipt date of the gift transaction',
			},
			{
				displayName: 'Receipt Segment',
				name: 'receiptSegment',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The receipt segment of the gift transaction',
			},
			{
				displayName: 'Cash Accounting Code',
				name: 'cashAccountingCode',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The cash accounting code of the gift transaction',
			},
			{
				displayName: 'Tribute',
				name: 'tribute',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The tribute for the gift transaction',
			},
			{
				displayName: 'Tribute ID',
				name: 'tributeId',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The tribute dedication ID for the gift transaction',
			},
			{
				displayName: 'Tribute Type',
				name: 'tributeType',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The tribute dedication type for the gift transaction',
			},

			{
				displayName: 'Tribute First Name',
				name: 'tributeFirstName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The tribute first name for the gift transaction',
			},
			{
				displayName: 'Tribute Last Name',
				name: 'tributeLastName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The tribute last name for the gift transaction',
			},
			{
				displayName: 'Tribute City',
				name: 'tributeCity',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The tribute city for the gift transaction',
			},
			{
				displayName: 'Tribute State',
				name: 'tributeState',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The tribute state for the gift transaction',
			},
			{
				displayName: 'Acknowledgee Individual ID',
				name: 'acknowledgeeIndividualId',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The acknowledgee individual ID for the gift transaction',
			},
			{
				displayName: 'Acknowledgee First Name',
				name: 'acknowledgeeFirstName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The acknowledgee first name for the gift transaction',
			},
			{
				displayName: 'Acknowledgee Last Name',
				name: 'acknowledgeeLastName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The acknowledgee last name for the gift transaction',
			},
			{
				displayName: 'Acknowledgee Address',
				name: 'acknowledgeeAddress',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The acknowledgee address for the gift transaction',
			},

			{
				displayName: 'Acknowledgee City',
				name: 'acknowledgeeCity',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The acknowledgee city for the gift transaction',
			},
			{
				displayName: 'Acknowledgee State',
				name: 'acknowledgeeState',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The acknowledgee state for the gift transaction',
			},
			{
				displayName: 'Acknowledgee Postal Code',
				name: 'acknowledgeePostal',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The acknowledgee postal code for the gift transaction',
			},
			{
				displayName: 'Acknowledgee Email',
				name: 'acknowledgeeEmail',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The acknowledgee email for the gift transaction',
			},
			{
				displayName: 'Acknowledgee Phone',
				name: 'acknowledgeePhone',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The acknowledgee phone for the gift transaction',
			},
			{
				displayName: 'Is Gift Private',
				name: 'isPrivate',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Whether the gift is private',
			},
			{
				displayName: 'Is Tax Deductible',
				name: 'isTaxDeductible',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Whether the gift is tax deductible',
			},
			{
				displayName: 'Check Number',
				name: 'checkNumber',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The check number for the gift transaction',
			},
			{
				displayName: 'Credit Card Type',
				name: 'creditCardType',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The credit card type for the gift transaction',
			},
			{
				displayName: 'Non-Cash Gift Type ID',
				name: 'nonCashGiftTypeId',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The non-cash gift type ID for the gift transaction',
			},
			{
				displayName: 'Non-Cash Gift Type',
				name: 'nonCashGiftType',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The non-cash gift type for the gift transaction',
			},
			{
				displayName: 'Non-Cash Gift Description',
				name: 'nonCashGiftDescription',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Non-cash gift description for the gift transaction',
			},
			{
				displayName: 'Stock Ticker Symbol',
				name: 'stockTickerSymbol',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Stock ticker symbol for the gift transaction',
			},
			{
				displayName: 'Stock Number of Shares',
				name: 'stockNumberOfShares',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Stock number of shares for the gift transaction',
			},
			{
				displayName: 'IRA Custodian',
				name: 'iraCustodian',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The IRA custodian for the gift transaction',
			},
			{
				displayName: 'Submission URL',
				name: 'submissionUrl',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The submission URL for the gift transaction',
			},
			{
				displayName: 'Gift Designations',
				name: 'designations',
				type: 'json',
				default: '[]',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Example: [{"ID": &lt;integer&gt;, "name": &lt;string&gt;, "code": &lt;string&gt;, "amountDesignated": &lt;string&gt;}, {"ID": &lt;integer&gt;, "name": &lt;string&gt;, "code": &lt;string&gt;, "amountDesignated": &lt;string&gt;}]',
				hint: 'Provide a JSON array of gift designation objects.'
			},
			{
				displayName: 'Gift Premiums',
				name: 'premiums',
				type: 'json',
				default: '[]',
				hint: 'Provide a JSON array of gift premium objects.',
				description: 'Example: [{"ID": &lt;integer&gt;, "name": &lt;string&gt;, "code": &lt;string&gt;, "quantity": &lt;string&gt;}, {"ID": &lt;integer&gt;, "name": &lt;string&gt;, "code": &lt;string&gt;, "quantity": &lt;string&gt;}]',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
			},
			{
				displayName: 'Custom Fields',
				name: 'customFields',
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description:'Example: {"fieldName": "fieldValue", "fieldName2": "fieldValue2"}',
				hint: 'Provide a JSON object of key-value pairs for custom fields.',
			},
			{
				displayName: 'Custom Objects',
				name: 'customObjects',
				type: 'json',
				default: '[]',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Example: [{"name": "&lt;string&gt;", "fields": [{"name": "&lt;string&gt;", "value": "&lt;string&gt;"}]}, {"name": "&lt;string&gt;", "fields": [{"name": "&lt;string&gt;", "value": "&lt;string&gt;"}]}]',
				hint: 'Provide a JSON array of custom objects with their fields.',
			},
			{
				displayName: 'Contact Individual ID',
				name: 'contactIndividualId',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Contact Individual ID for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Reference ID',
				name: 'passthroughContactReferenceId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Reference ID for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact ID',
				name: 'passthroughContactId',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact ID for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Full Name',
				name: 'passthroughContactName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Full Name for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Type',
				name: 'passthroughContactType',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description:
					'The type of contact for the passthrough contact. Examples: Household, Organization, Foundation. Configurable via CRM.',
			},
			{
				displayName: 'Passthrough Contact Title',
				name: 'passthroughContactTitle',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Title for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact First Name',
				name: 'passthroughContactFirstName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact First Name for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Middle Name',
				name: 'passthroughContactMiddleName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Middle Name for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Last Name',
				name: 'passthroughContactLastName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Last Name for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Suffix',
				name: 'passthroughContactSuffix',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Suffix for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Birth Month',
				name: 'passthroughContactBirthMonth',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Birth Month for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Birth Day',
				name: 'passthroughContactBirthDay',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Birth Day for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Birth Year',
				name: 'passthroughContactBirthYear',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Birth Year for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Gender',
				name: 'passthroughContactGender',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Gender for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Email Type',
				name: 'passthroughContactEmailType',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description:
					'The email type of the passthrough contact for the contact transaction. Examples: Primary Email, Secondary Email, Home Email, Work Email, Other Email.',
			},
			{
				displayName: 'Passthrough Contact Email',
				name: 'passthroughContactEmail',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Email for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Phone Type',
				name: 'passthroughContactPhoneType',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description:
					'The phone type of the passthrough contact. Examples: Home Phone, Mobile Phone, Work Phone, Other Phone.',
			},
			{
				displayName: 'Passthrough Contact Phone',
				name: 'passthroughContactPhone',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Phone for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Address1',
				name: 'passthroughContactAddress1',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Address1 for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Address2',
				name: 'passthroughContactAddress2',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Address2 for the gift transaction',
			},

			{
				displayName: 'Passthrough Contact City',
				name: 'passthroughContactCity',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact City for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact State',
				name: 'passthroughContactState',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact State for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Postal Code',
				name: 'passthroughContactPostal',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Postal Code for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Country',
				name: 'passthroughContactCountry',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Country for the gift transaction',
			},
			{
				displayName: 'Passthrough Contact Tags',
				name: 'passthroughContactTags',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Passthrough Contact Tags for the gift transaction',
				hint: 'Multiple tags can be separated by semicolons. Example: tag1;tag2;tag3',
			},
			{
				displayName: 'Passthrough Contact Email Lists',
				name: 'passthroughContactEmailLists',
				type: 'json',
				default: '[]',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Example: ["list1", "list2", "list3"]',
				hint: 'Provide a JSON array of email list names for the passthrough contact.',
			},
			{
				displayName: 'Event Attendee Event ID',
				name: 'eventAttendeeEventId',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Event Attendee Event ID for the gift transaction',
			},
			{
				displayName: 'Event Attendee Event Name',
				name: 'eventAttendeeEventName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
			},
			{
				displayName: 'Event Attendee Invited',
				name: 'eventAttendeeInvited',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Whether the Event Attendee was Invited',
			},
			{
				displayName: 'Event Attendee RSVP',
				name: 'eventAttendeeRsvp',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Whether the Event Attendee RSVPed for the event',
			},
			{
				displayName: 'Event Attendee RSVP Response',
				name: 'eventAttendeeRsvpResponse',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Whether the Event Attendee RSVPed for the event',
			},
			{
				displayName: 'Event Attendee Attended',
				name: 'eventAttendeeAttended',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Whether the Event Attendee Attended the event',
			},
			{
				displayName: 'JSON Data',
				name: 'jsonData',
				type: 'json',
				default: `{
    "transactionSource": "<string>",
    "transactionId": "<string>",
    "contact": {
        "referenceId": "<string>",
        "id": "<integer>",
        "name": "<string>",
        "type": "<string>",
        "title": "<string>",
        "firstname": "<string>",
        "middlename": "<string>",
        "lastname": "<string>",
        "suffix": "<string>",
        "birthMonth": "<string>",
        "birthDay": "<string>",
        "birthYear": "<string>",
        "gender": "<string>",
        "emailType": "<string>",
        "email": "<string>",
        "phoneType": "<string>",
        "phone": "<string>",
        "address": {
            "address1": "<string>",
            "address2": "<string>",
            "city": "<string>",
            "state": "<string>",
            "postal": "<string>",
            "country": "<string>"
        },
        "tags": "<string>",
        "emailLists": [
            "<string>",
            "<string>"
        ]
    },
    "giftDate": "<string>",
    "cancelDate": "<string>",
    "giftType": "<string>",
    "amount": "<string>",
    "currencyCode": "<string>",
    "exchangeRate": "<decimal>",
    "frequency": "<string>",
    "recurringGiftTransactionId": "<string>",
    "recurringGiftTransactionUpdate": "<boolean>",
    "pledgeFrequency": "<string>",
    "pledgeTransactionId": "<string>",
    "pledgeExpectedFullfillmentDate":"<string>",
    "batch": "<string>",
    "notes": "<string>",
    "segment": "<string>",
    "mediaOutlet": "<string>",
    "receiptDate": "<string>",
    "receiptSegment": "<string>",
    "cashAccountingCode": "<string>",
    "tribute": "<string>",
    "tributeDedication": {
        "tributeId": "<integer>",
        "tributeType": "<string>",
        "tributeFirstName": "<string>",
        "tributeLastName": "<string>",
        "tributeCity": "<string>",
        "tributeState": "<string>",
        "acknowledgeeIndividualId": "<integer>",
        "acknowledgeeFirstName": "<string>",
        "acknowledgeeLastName": "<string>",
        "acknowledgeeAddress": "<string>",
        "acknowledgeeCity": "<string>",
        "acknowledgeeState": "<string>",
        "acknowledgeePostal": "<string>",
        "acknowledgeeEmail": "<string>",
        "acknowledgeePhone": "<string>"
    },
    "isPrivate": "<boolean>",
    "isTaxDeductible": "<boolean>",
    "checkNumber": "<string>",
    "creditCardType": "<string>",
    "nonCashGiftTypeId": "<integer>",
    "nonCashGiftType": "<string>",
    "nonCashGiftDescription": "<string>",
    "stockTickerSymbol": "<string>",
    "stockNumberOfShares": "<integer>",
    "iraCustodian": "<string>",
    "submissionUrl": "<string>",
    "designations": [
        {
            "id": "<integer>",
            "name": "<string>",
            "code": "<string>",
            "amountDesignated": "<string>"
        },
        {
            "id": "<integer>",
            "name": "<string>",
            "code": "<string>",
            "amountDesignated": "<string>"
        }
    ],
    "premiums": [
        {
            "id": "<integer>",
            "name": "<string>",
            "code": "<string>",
            "quantity": "<string>"
        },
        {
            "id": "<integer>",
            "name": "<string>",
            "code": "<string>",
            "quantity": "<string>"
        }
    ],
    "customFields":
    {
        "fieldName": "fieldValue",
        "fieldName2": "fieldValue2"
    },
    "customObjects": [
        {
            "name": "<string>",
            "fields": [
                {
                    "name": "<string>",
                    "value": "<string>"
                },
                {
                    "name": "<string>",
                    "value": "<string>"
                }
            ]
        },
        {
            "name": "<string>",
            "fields": [
                {
                    "name": "<string>",
                    "value": "<string>"
                },
                {
                    "name": "<string>",
                    "value": "<string>"
                }
            ]
        }
    ],
    "contactIndividualId": "<integer>",
    "passthroughContact": {
        "referenceId": "<string>",
        "id": "<integer>",
        "name": "<string>",
        "type": "<string>",
        "title": "<string>",
        "firstname": "<string>",
        "middlename": "<string>",
        "lastname": "<string>",
        "suffix": "<string>",
        "birthMonth": "<string>",
        "birthDay": "<string>",
        "birthYear": "<string>",
        "gender": "<string>",
        "emailType": "<string>",
        "email": "<string>",
        "phoneType": "<string>",
        "phone": "<string>",
        "address": {
            "address1": "<string>",
            "address2": "<string>",
            "city": "<string>",
            "state": "<string>",
            "postal": "<string>",
            "country": "<string>"
        },
        "tags": "<string>",
        "emailLists": [
            "<string>",
            "<string>"
        ]
    },
    "eventAttendee": {
        "eventId": "<integer>",
        "eventName": "<string>",
        "invited": "<boolean>",
        "rsvp": "<boolean>",
        "rsvpResponse": "<boolean>",
        "attended": "<boolean>"
    }
}`,
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['json'],
					},
				},
				description: 'Complete JSON payload',
			},
		] as INodeProperties[],
	},

	/**
	 * Clean fields for API submission by removing empty, null, undefined, and default values
	 * @param rawFields - Object containing all field values from the form
	 * @returns Cleaned object with only meaningful values
	 */
	cleanFieldsForApi(rawFields: { [key: string]: any }): { [key: string]: any } {

		// Define default values to exclude
		const defaultValues: { [key: string]: any } = {
			// JSON array fields with default empty arrays
			contactEmailLists: '[]',
			passthroughContactEmailLists: '[]',
			designations: '[]',
			premiums: '[]',
			customObjects: '[]',

			// JSON object fields with default empty objects
			customFields: '{}',

			// Boolean fields with false defaults
			recurringGiftTransactionUpdate: false,
			isPrivate: false,
			isTaxDeductible: false,
			eventAttendeeInvited: false,
			eventAttendeeRsvp: false,
			eventAttendeeRsvpResponse: false,
			eventAttendeeAttended: false,

			// Number fields with 0 defaults
			giftExchangeRate: 0,
			tributeId: 0,
			acknowledgeeIndividualId: 0,
			nonCashGiftTypeId: 0,
			stockNumberOfShares: 0,
			contactIndividualId: 0,
			passthroughContactId: 0,
			eventAttendeeEventId: 0,
		};

		// Helper function to recursively clean nested objects
		const cleanObject = (obj: any): any => {
			if (obj === null || obj === undefined) {
				return obj;
			}

			if (Array.isArray(obj)) {
				const cleaned = obj.map(item => cleanObject(item)).filter(item => item !== undefined);
				return cleaned.length > 0 ? cleaned : undefined;
			}

			if (typeof obj === 'object') {
				const cleaned: any = {};
				for (const [key, value] of Object.entries(obj)) {
					if (!shouldExclude(key, value)) {
						// Handle special processing for certain fields
						if (key === 'contactEmailLists' || key === 'passthroughContactEmailLists' || key === 'designations' || key === 'premiums' || key === 'customObjects') {
							// Parse JSON string fields that should be arrays
							try {
								const parsed = typeof value === 'string' ? JSON.parse(value) : value;
								// Only include if it's a non-empty array
								if (Array.isArray(parsed) && parsed.length > 0) {
									cleaned[key] = parsed;
								}
							} catch (e) {
								// If parsing fails but it's not empty, use original value
								if (value && value !== '[]' && value !== '') {
									cleaned[key] = value;
								}
							}
						} else if (key === 'customFields') {
							// Handle custom fields JSON
							try {
								const parsed = typeof value === 'string' ? JSON.parse(value) : value;
								if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
									cleaned[key] = parsed;
								}
							} catch (e) {
								// If parsing fails and it's not empty, include it
								if (value && value !== '{}' && value !== '[]' && value !== '') {
									cleaned[key] = value;
								}
							}
						} else {
							// Recursively clean nested objects
							const cleanedValue = cleanObject(value);
							if (cleanedValue !== undefined) {
								cleaned[key] = cleanedValue;
							}
						}
					}
				}
				return Object.keys(cleaned).length > 0 ? cleaned : undefined;
			}

			return obj;
		};

		// Helper function to check if value should be excluded
		const shouldExclude = (key: string, value: any): boolean => {
			// Exclude empty strings, null, undefined
			if (value === '' || value === null || value === undefined) {
				return true;
			}

			// Exclude default values
			if (defaultValues.hasOwnProperty(key) && value === defaultValues[key]) {
				return true;
			}

			// Exclude empty arrays
			if (Array.isArray(value) && value.length === 0) {
				return true;
			}

			// For JSON string fields that are empty arrays or objects
			if (typeof value === 'string') {
				try {
					const parsed = JSON.parse(value);
					if (
						(Array.isArray(parsed) && parsed.length === 0) ||
						(typeof parsed === 'object' && parsed !== null && Object.keys(parsed).length === 0)
					) {
						return true;
					}
				} catch (e) {
					// Not JSON, continue with other checks
				}
			}

			return false;
		};

		// Use recursive cleaning to handle nested objects
		return cleanObject(rawFields) || {};
	},

	async execute(this: IExecuteFunctions, itemIndex: number) {
		const inputMethod = this.getNodeParameter('inputMethod', itemIndex) as string;
		let bodyData: any;

		if (inputMethod === 'json') {
			const jsonData = this.getNodeParameter('jsonData', itemIndex) as string;
			try {
				bodyData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
			} catch (error) {
				throw new NodeApiError(this.getNode(), error);
			}
		} else {
			const rawFields = {
				transactionSource: this.getNodeParameter('transactionSource', itemIndex),
				transactionId: this.getNodeParameter('transactionId', itemIndex),
				contact: {
					referenceId: this.getNodeParameter('contactReferenceId', itemIndex),
					id: this.getNodeParameter('contactId', itemIndex),
					name: this.getNodeParameter('contactName', itemIndex),
					type: this.getNodeParameter('contactType', itemIndex),
					title: this.getNodeParameter('contactTitle', itemIndex),
					firstName: this.getNodeParameter('contactFirstName', itemIndex),
					middleName: this.getNodeParameter('contactMiddleName', itemIndex),
					lastName: this.getNodeParameter('contactLastName', itemIndex),
					suffix: this.getNodeParameter('contactSuffix', itemIndex),
					birthMonth: this.getNodeParameter('contactBirthMonth', itemIndex),
					birthDay: this.getNodeParameter('contactBirthDay', itemIndex),
					birthYear: this.getNodeParameter('contactBirthYear', itemIndex),
					gender: this.getNodeParameter('contactGender', itemIndex),
					emailType: this.getNodeParameter('contactEmailType', itemIndex),
					email: this.getNodeParameter('contactEmail', itemIndex),
					phoneType: this.getNodeParameter('contactPhoneType', itemIndex),
					phone: this.getNodeParameter('contactPhoneNumber', itemIndex),
					address: {
						address1: this.getNodeParameter('contactAddressLine1', itemIndex),
						address2: this.getNodeParameter('contactAddressLine2', itemIndex),
						city: this.getNodeParameter('contactCity', itemIndex),
						state: this.getNodeParameter('contactState', itemIndex),
						postal: this.getNodeParameter('contactPostal', itemIndex),
						country: this.getNodeParameter('contactCountry', itemIndex),
					},
					tags: this.getNodeParameter('contactTags', itemIndex),
					emailLists: this.getNodeParameter('contactEmailLists', itemIndex),
				},
				giftDate: this.getNodeParameter('giftDate', itemIndex),
				cancelDate: this.getNodeParameter('cancelDate', itemIndex),
				giftType: this.getNodeParameter('giftType', itemIndex),
				amount: this.getNodeParameter('giftAmount', itemIndex),
				CurrencyCode: this.getNodeParameter('giftCurrencyCode', itemIndex),
				ExchangeRate: this.getNodeParameter('giftExchangeRate', itemIndex),
				frequency: this.getNodeParameter('giftFrequency', itemIndex),
				recurringGiftTransactionId: this.getNodeParameter('recurringGiftTransactionId', itemIndex),
				recurringGiftTransactionUpdate: this.getNodeParameter('recurringGiftTransactionUpdate',itemIndex),
				pledgeFrequency: this.getNodeParameter('pledgeFrequency', itemIndex),
				pledgeTransactionId: this.getNodeParameter('pledgeTransactionId', itemIndex),
				pledgeExpectedFullfillmentDate: this.getNodeParameter('pledgeExpectedFullfillmentDate', itemIndex),
				batch: this.getNodeParameter('giftBatch', itemIndex),
				notes: this.getNodeParameter('giftNotes', itemIndex),
				segment: this.getNodeParameter('giftSegment', itemIndex),
				mediaOutlet: this.getNodeParameter('mediaOutlet', itemIndex),
				receiptDate: this.getNodeParameter('receiptDate', itemIndex),
				receiptSegment: this.getNodeParameter('receiptSegment', itemIndex),
				cashAccountingCode: this.getNodeParameter('cashAccountingCode', itemIndex),
				tribute: this.getNodeParameter('tribute', itemIndex),
				tributeDedication: {
					tributeId: this.getNodeParameter('tributeId', itemIndex),
					tributeType: this.getNodeParameter('tributeType', itemIndex),
					tributeFirstName: this.getNodeParameter('tributeFirstName', itemIndex),
					tributeLastName: this.getNodeParameter('tributeLastName', itemIndex),
					tributeCity: this.getNodeParameter('tributeCity', itemIndex),
					tributeState: this.getNodeParameter('tributeState', itemIndex),
					acknowledgeeIndividualId: this.getNodeParameter('acknowledgeeIndividualId', itemIndex),
					acknowledgeeFirstName: this.getNodeParameter('acknowledgeeFirstName', itemIndex),
					acknowledgeeLastName: this.getNodeParameter('acknowledgeeLastName', itemIndex),
					acknowledgeeAddress: this.getNodeParameter('acknowledgeeAddress', itemIndex),
					acknowledgeeCity: this.getNodeParameter('acknowledgeeCity', itemIndex),
					acknowledgeeState: this.getNodeParameter('acknowledgeeState', itemIndex),
					acknowledgeePostal: this.getNodeParameter('acknowledgeePostal', itemIndex),
					acknowledgeeEmail: this.getNodeParameter('acknowledgeeEmail', itemIndex),
					acknowledgeePhone: this.getNodeParameter('acknowledgeePhone', itemIndex),
				},
				isPrivate: this.getNodeParameter('isPrivate', itemIndex),
				isTaxDeductible: this.getNodeParameter('isTaxDeductible', itemIndex),
				checkNumber: this.getNodeParameter('checkNumber', itemIndex),
				creditCardType: this.getNodeParameter('creditCardType', itemIndex),
				nonCashGiftTypeId: this.getNodeParameter('nonCashGiftTypeId', itemIndex),
				nonCashGiftType: this.getNodeParameter('nonCashGiftType', itemIndex),
				nonCashGiftDescription: this.getNodeParameter('nonCashGiftDescription', itemIndex),
				// Stock fields
				stockTickerSymbol: this.getNodeParameter('stockTickerSymbol', itemIndex),
				stockNumberOfShares: this.getNodeParameter('stockNumberOfShares', itemIndex),
				// IRA field
				iraCustodian: this.getNodeParameter('iraCustodian', itemIndex),
				submissionUrl: this.getNodeParameter('submissionUrl', itemIndex),
				designations: this.getNodeParameter('designations', itemIndex),
				premiums: this.getNodeParameter('premiums', itemIndex),
				customFields: this.getNodeParameter('customFields', itemIndex),
				customObjects: this.getNodeParameter('customObjects', itemIndex),
				contactIndividualId: this.getNodeParameter('contactIndividualId', itemIndex),
				passthroughContact: {
					referenceId: this.getNodeParameter('passthroughContactReferenceId', itemIndex),
					id: this.getNodeParameter('passthroughContactId', itemIndex),
					name: this.getNodeParameter('passthroughContactName', itemIndex),
					type: this.getNodeParameter('passthroughContactType', itemIndex),
					title: this.getNodeParameter('passthroughContactTitle', itemIndex),
					firstName: this.getNodeParameter('passthroughContactFirstName', itemIndex),
					middleName: this.getNodeParameter('passthroughContactMiddleName', itemIndex),
					lastName: this.getNodeParameter('passthroughContactLastName', itemIndex),
					suffix: this.getNodeParameter('passthroughContactSuffix', itemIndex),
					birthMonth: this.getNodeParameter('passthroughContactBirthMonth', itemIndex),
					birthDay: this.getNodeParameter('passthroughContactBirthDay', itemIndex),
					birthYear: this.getNodeParameter('passthroughContactBirthYear', itemIndex),
					gender: this.getNodeParameter('passthroughContactGender', itemIndex),
					email: this.getNodeParameter('passthroughContactEmail', itemIndex),
					emailType: this.getNodeParameter('passthroughContactEmailType', itemIndex),
					phone: this.getNodeParameter('passthroughContactPhone', itemIndex),
					phoneType: this.getNodeParameter('passthroughContactPhoneType', itemIndex),
					address: {
						address1: this.getNodeParameter('passthroughContactAddress1', itemIndex),
						address2: this.getNodeParameter('passthroughContactAddress2', itemIndex),
						city: this.getNodeParameter('passthroughContactCity', itemIndex),
						state: this.getNodeParameter('passthroughContactState', itemIndex),
						postal: this.getNodeParameter('passthroughContactPostal', itemIndex),
						country: this.getNodeParameter('passthroughContactCountry', itemIndex),
					},
					tags: this.getNodeParameter('passthroughContactTags', itemIndex),
					emailLists: this.getNodeParameter('passthroughContactEmailLists', itemIndex),
				},
				eventAttendee: {
					eventId: this.getNodeParameter('eventAttendeeEventId', itemIndex),
					eventName: this.getNodeParameter('eventAttendeeEventName', itemIndex),
					invited: this.getNodeParameter('eventAttendeeInvited', itemIndex),
					rsvp: this.getNodeParameter('eventAttendeeRsvp', itemIndex),
					rsvpResponse: this.getNodeParameter('eventAttendeeRsvpResponse', itemIndex),
					attended: this.getNodeParameter('eventAttendeeAttended', itemIndex),
				},
			};

			// Clean up the payload using our helper method
			bodyData = giftTransactionCreateDescription.cleanFieldsForApi(rawFields);
		}

		try {
			const response = virtuousCrmApiRequest.call(
				this,
				'POST',
				'/api/Gift/Transaction',
				{},
				bodyData,
			);

			return response;
		} catch (error: any) {
			throw new NodeApiError(this.getNode(), error);
		}
	},
};
