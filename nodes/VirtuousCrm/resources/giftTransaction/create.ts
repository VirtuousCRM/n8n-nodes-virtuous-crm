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
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['gift'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				options: [
					{
						displayName: 'Acknowledgee Address',
						name: 'acknowledgeeAddress',
						type: 'string',
						default: '',
						description: 'The acknowledgee address for the gift transaction',
					},
					{
						displayName: 'Acknowledgee City',
						name: 'acknowledgeeCity',
						type: 'string',
						default: '',
						description: 'The acknowledgee city for the gift transaction',
					},
					{
						displayName: 'Acknowledgee Email',
						name: 'acknowledgeeEmail',
						type: 'string',
						default: '',
						description: 'The acknowledgee email for the gift transaction',
					},
					{
						displayName: 'Acknowledgee First Name',
						name: 'acknowledgeeFirstName',
						type: 'string',
						default: '',
						description: 'The acknowledgee first name for the gift transaction',
					},
					{
						displayName: 'Acknowledgee Individual ID',
						name: 'acknowledgeeIndividualId',
						type: 'number',
						default: 0,
						description: 'The acknowledgee individual ID for the gift transaction',
					},
					{
						displayName: 'Acknowledgee Last Name',
						name: 'acknowledgeeLastName',
						type: 'string',
						default: '',
						description: 'The acknowledgee last name for the gift transaction',
					},
					{
						displayName: 'Acknowledgee Phone',
						name: 'acknowledgeePhone',
						type: 'string',
						default: '',
						description: 'The acknowledgee phone for the gift transaction',
					},
					{
						displayName: 'Acknowledgee Postal Code',
						name: 'acknowledgeePostal',
						type: 'string',
						default: '',
						description: 'The acknowledgee postal code for the gift transaction',
					},
					{
						displayName: 'Acknowledgee State',
						name: 'acknowledgeeState',
						type: 'string',
						default: '',
						description: 'The acknowledgee state for the gift transaction',
					},
					{
						displayName: 'Cash Accounting Code',
						name: 'cashAccountingCode',
						type: 'string',
						default: '',
						description: 'The cash accounting code of the gift transaction',
					},
					{
						displayName: 'Check Number',
						name: 'checkNumber',
						type: 'string',
						default: '',
						description: 'The check number for the gift transaction',
					},
					{
						displayName: 'Contact Address Line 1',
						name: 'contactAddressLine1',
						type: 'string',
						default: '',
						description: 'The address line 1 of the contact',
					},
					{
						displayName: 'Contact Address Line 2',
						name: 'contactAddressLine2',
						type: 'string',
						default: '',
						description: 'The address line 2 of the contact',
					},
					{
						displayName: 'Contact Birth Day',
						name: 'contactBirthDay',
						type: 'string',
						default: '',
						description: 'The birth day of the contact',
					},
					{
						displayName: 'Contact Birth Month',
						name: 'contactBirthMonth',
						type: 'string',
						default: '',
						description: 'The birth month of the contact',
					},
					{
						displayName: 'Contact Birth Year',
						name: 'contactBirthYear',
						type: 'string',
						default: '',
						description: 'The birth year of the contact',
					},
					{
						displayName: 'Contact City',
						name: 'contactCity',
						type: 'string',
						default: '',
						description: 'The city of the contact',
					},
					{
						displayName: 'Contact Country',
						name: 'contactCountry',
						type: 'string',
						default: '',
						description: 'The country of the contact',
					},
					{
						displayName: 'Contact Email',
						name: 'contactEmail',
						type: 'string',
						default: '',
						description: 'The email of the contact',
					},
					{
						displayName: 'Contact Email Lists',
						name: 'contactEmailLists',
						type: 'json',
						default: '[]',
						description: 'Example: ["list1", "list2", "list3"]',
						hint: 'Provide a JSON array of email list names.',
					},
					{
						displayName: 'Contact Email Type',
						name: 'contactEmailType',
						type: 'string',
						default: '',
						description:
							'The email type of the contact. Examples: Primary Email, Secondary Email, Home Email, Work Email, Other Email.',
					},
					{
						displayName: 'Contact Full Name',
						name: 'contactName',
						type: 'string',
						default: '',
						description: 'The full name of the contact',
					},
					{
						displayName: 'Contact Gender',
						name: 'contactGender',
						type: 'string',
						default: '',
						description: 'The gender of the contact',
					},
					{
						displayName: 'Contact ID',
						name: 'contactId',
						type: 'string',
						default: '',
						description: 'The ID of the contact',
					},
					{
						displayName: 'Contact Individual ID',
						name: 'contactIndividualId',
						type: 'number',
						default: 0,
						description: 'Contact Individual ID for the gift transaction',
					},
					{
						displayName: 'Contact Middle Name',
						name: 'contactMiddleName',
						type: 'string',
						default: '',
						description: 'The middle name of the contact',
					},
					{
						displayName: 'Contact Phone Number',
						name: 'contactPhoneNumber',
						type: 'string',
						default: '',
						description: 'The phone number of the contact',
					},
					{
						displayName: 'Contact Phone Type',
						name: 'contactPhoneType',
						type: 'string',
						default: '',
						description:
							'The phone type of the contact. Examples: Home Phone, Mobile Phone, Work Phone, Other Phone.',
					},
					{
						displayName: 'Contact Postal Code',
						name: 'contactPostal',
						type: 'string',
						default: '',
						description: 'The postal code of the contact',
					},
					{
						displayName: 'Contact Reference ID',
						name: 'contactReferenceId',
						type: 'string',
						default: '',
						description: 'The reference ID of the contact',
					},
					{
						displayName: 'Contact State',
						name: 'contactState',
						type: 'string',
						default: '',
						description: 'The state of the contact',
					},
					{
						displayName: 'Contact Suffix',
						name: 'contactSuffix',
						type: 'string',
						default: '',
						description: 'The suffix of the contact',
					},
					{
						displayName: 'Contact Tags',
						name: 'contactTags',
						type: 'string',
						default: '',
						description: 'The tags of the contact, separated by semicolons. Example: tag1;tag2;tag3; .',
						hint: 'The tags of the contact',
					},
					{
						displayName: 'Contact Title',
						name: 'contactTitle',
						type: 'string',
						default: '',
						description: 'The title of the contact',
					},
					{
						displayName: 'Contact Type',
						name: 'contactType',
						type: 'string',
						default: '',
						description:
							'The type of contact. Examples: Household, Organization, Foundation. Configurable via CRM.',
					},
					{
						displayName: 'Credit Card Type',
						name: 'creditCardType',
						type: 'string',
						default: '',
						description: 'The credit card type for the gift transaction',
					},
					{
						displayName: 'Currency Code',
						name: 'giftCurrencyCode',
						type: 'string',
						default: '',
						description: 'The currency code of the gift transaction. Examples: USD, CAD, EUR, GBP.',
					},
					{
						displayName: 'Custom Fields',
						name: 'customFields',
						type: 'json',
						default: '{}',
						description: 'Example: {"fieldName": "fieldValue", "fieldName2": "fieldValue2"}',
						hint: 'Provide a JSON object of key-value pairs for custom fields.',
					},
					{
						displayName: 'Custom Objects',
						name: 'customObjects',
						type: 'json',
						default: '[]',
						description: 'Example: [{"name": "&lt;string&gt;", "fields": [{"name": "&lt;string&gt;", "value": "&lt;string&gt;"}]}]',
						hint: 'Provide a JSON array of custom objects with their fields.',
					},
					{
						displayName: 'Event Attendee Attended',
						name: 'eventAttendeeAttended',
						type: 'boolean',
						default: false,
						description: 'Whether the Event Attendee Attended the event',
					},
					{
						displayName: 'Event Attendee Event ID',
						name: 'eventAttendeeEventId',
						type: 'number',
						default: 0,
						description: 'Event Attendee Event ID for the gift transaction',
					},
					{
						displayName: 'Event Attendee Event Name',
						name: 'eventAttendeeEventName',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Event Attendee Invited',
						name: 'eventAttendeeInvited',
						type: 'boolean',
						default: false,
						description: 'Whether the Event Attendee was Invited',
					},
					{
						displayName: 'Event Attendee RSVP',
						name: 'eventAttendeeRsvp',
						type: 'boolean',
						default: false,
						description: 'Whether the Event Attendee RSVPed for the event',
					},
					{
						displayName: 'Event Attendee RSVP Response',
						name: 'eventAttendeeRsvpResponse',
						type: 'boolean',
						default: false,
						description: 'Whether the Event Attendee RSVPed for the event',
					},
					{
						displayName: 'Exchange Rate',
						name: 'giftExchangeRate',
						type: 'number',
						default: 0,
						description: 'The exchange rate of the gift transaction',
					},
					{
						displayName: 'Gift Batch',
						name: 'giftBatch',
						type: 'string',
						default: '',
						description: 'The batch of the gift transaction',
					},
					{
						displayName: 'Gift Cancel Date',
						name: 'cancelDate',
						type: 'string',
						default: '',
						description: 'The cancel date of the gift transaction',
					},
					{
						displayName: 'Gift Date',
						name: 'giftDate',
						type: 'string',
						default: '',
						description: 'The date of the gift transaction',
					},
					{
						displayName: 'Gift Designations',
						name: 'designations',
						type: 'json',
						default: '[]',
						description: 'Example: [{"ID": 1, "name": "&lt;string&gt;", "code": "&lt;string&gt;", "amountDesignated": "&lt;string&gt;"}]',
						hint: 'Provide a JSON array of gift designation objects.',
					},
					{
						displayName: 'Gift Frequency',
						name: 'giftFrequency',
						type: 'string',
						default: '',
						description: 'The frequency of the gift',
					},
					{
						displayName: 'Gift Notes',
						name: 'giftNotes',
						type: 'string',
						default: '',
						description: 'The gift notes of the gift transaction',
					},
					{
						displayName: 'Gift Premiums',
						name: 'premiums',
						type: 'json',
						default: '[]',
						hint: 'Provide a JSON array of gift premium objects.',
						description: 'Example: [{"ID": 1, "name": "&lt;string&gt;", "code": "&lt;string&gt;", "quantity": "&lt;string&gt;"}]',
					},
					{
						displayName: 'Gift Segment',
						name: 'giftSegment',
						type: 'string',
						default: '',
						description: 'The segment of the gift transaction',
					},
					{
						displayName: 'IRA Custodian',
						name: 'iraCustodian',
						type: 'string',
						default: '',
						description: 'The IRA custodian for the gift transaction',
					},
					{
						displayName: 'Is Gift Private',
						name: 'isPrivate',
						type: 'boolean',
						default: false,
						description: 'Whether the gift is private',
					},
					{
						displayName: 'Is Tax Deductible',
						name: 'isTaxDeductible',
						type: 'boolean',
						default: false,
						description: 'Whether the gift is tax deductible',
					},
					{
						displayName: 'Media Outlet',
						name: 'mediaOutlet',
						type: 'string',
						default: '',
						description: 'The media outlet of the gift transaction',
					},
					{
						displayName: 'Non-Cash Gift Description',
						name: 'nonCashGiftDescription',
						type: 'string',
						default: '',
						description: 'Non-cash gift description for the gift transaction',
					},
					{
						displayName: 'Non-Cash Gift Type',
						name: 'nonCashGiftType',
						type: 'string',
						default: '',
						description: 'The non-cash gift type for the gift transaction',
					},
					{
						displayName: 'Non-Cash Gift Type ID',
						name: 'nonCashGiftTypeId',
						type: 'number',
						default: 0,
						description: 'The non-cash gift type ID for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Address1',
						name: 'passthroughContactAddress1',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Address1 for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Address2',
						name: 'passthroughContactAddress2',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Address2 for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Birth Day',
						name: 'passthroughContactBirthDay',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Birth Day for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Birth Month',
						name: 'passthroughContactBirthMonth',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Birth Month for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Birth Year',
						name: 'passthroughContactBirthYear',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Birth Year for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact City',
						name: 'passthroughContactCity',
						type: 'string',
						default: '',
						description: 'Passthrough Contact City for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Country',
						name: 'passthroughContactCountry',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Country for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Email',
						name: 'passthroughContactEmail',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Email for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Email Lists',
						name: 'passthroughContactEmailLists',
						type: 'json',
						default: '[]',
						description: 'Example: ["list1", "list2", "list3"]',
						hint: 'Provide a JSON array of email list names for the passthrough contact.',
					},
					{
						displayName: 'Passthrough Contact Email Type',
						name: 'passthroughContactEmailType',
						type: 'string',
						default: '',
						description:
							'The email type of the passthrough contact for the contact transaction. Examples: Primary Email, Secondary Email, Home Email, Work Email, Other Email.',
					},
					{
						displayName: 'Passthrough Contact First Name',
						name: 'passthroughContactFirstName',
						type: 'string',
						default: '',
						description: 'Passthrough Contact First Name for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Full Name',
						name: 'passthroughContactName',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Full Name for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Gender',
						name: 'passthroughContactGender',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Gender for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact ID',
						name: 'passthroughContactId',
						type: 'number',
						default: 0,
						description: 'Passthrough Contact ID for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Last Name',
						name: 'passthroughContactLastName',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Last Name for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Middle Name',
						name: 'passthroughContactMiddleName',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Middle Name for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Phone',
						name: 'passthroughContactPhone',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Phone for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Phone Type',
						name: 'passthroughContactPhoneType',
						type: 'string',
						default: '',
						description:
							'The phone type of the passthrough contact. Examples: Home Phone, Mobile Phone, Work Phone, Other Phone.',
					},
					{
						displayName: 'Passthrough Contact Postal Code',
						name: 'passthroughContactPostal',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Postal Code for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Reference ID',
						name: 'passthroughContactReferenceId',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Reference ID for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact State',
						name: 'passthroughContactState',
						type: 'string',
						default: '',
						description: 'Passthrough Contact State for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Suffix',
						name: 'passthroughContactSuffix',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Suffix for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Tags',
						name: 'passthroughContactTags',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Tags for the gift transaction',
						hint: 'Multiple tags can be separated by semicolons. Example: tag1;tag2;tag3',
					},
					{
						displayName: 'Passthrough Contact Title',
						name: 'passthroughContactTitle',
						type: 'string',
						default: '',
						description: 'Passthrough Contact Title for the gift transaction',
					},
					{
						displayName: 'Passthrough Contact Type',
						name: 'passthroughContactType',
						type: 'string',
						default: '',
						description:
							'The type of contact for the passthrough contact. Examples: Household, Organization, Foundation. Configurable via CRM.',
					},
					{
						displayName: 'Pledge Expected Fulfillment Date',
						name: 'pledgeExpectedFullfillmentDate',
						type: 'string',
						default: '',
						description: 'The pledge expected fulfillment date of the gift transaction',
					},
					{
						displayName: 'Pledge Frequency',
						name: 'pledgeFrequency',
						type: 'string',
						default: '',
						description: 'The pledge frequency of the gift transaction',
					},
					{
						displayName: 'Pledge Transaction ID',
						name: 'pledgeTransactionId',
						type: 'string',
						default: '',
						description: 'The pledge transaction ID of the gift transaction',
					},
					{
						displayName: 'Receipt Date',
						name: 'receiptDate',
						type: 'string',
						default: '',
						description: 'The receipt date of the gift transaction',
					},
					{
						displayName: 'Receipt Segment',
						name: 'receiptSegment',
						type: 'string',
						default: '',
						description: 'The receipt segment of the gift transaction',
					},
					{
						displayName: 'Recurring Gift Transaction ID',
						name: 'recurringGiftTransactionId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Recurring Gift Transaction Update',
						name: 'recurringGiftTransactionUpdate',
						type: 'boolean',
						default: false,
						description: 'Whether to update the recurring gift transaction',
					},
					{
						displayName: 'Stock Number of Shares',
						name: 'stockNumberOfShares',
						type: 'number',
						default: 0,
						description: 'Stock number of shares for the gift transaction',
					},
					{
						displayName: 'Stock Ticker Symbol',
						name: 'stockTickerSymbol',
						type: 'string',
						default: '',
						description: 'Stock ticker symbol for the gift transaction',
					},
					{
						displayName: 'Submission URL',
						name: 'submissionUrl',
						type: 'string',
						default: '',
						description: 'The submission URL for the gift transaction',
					},
					{
						displayName: 'Transaction ID',
						name: 'transactionId',
						type: 'string',
						default: '',
						description: 'The transaction ID of the gift transaction',
					},
					{
						displayName: 'Transaction Source',
						name: 'transactionSource',
						type: 'string',
						default: '',
						description: 'The source of the gift transaction',
					},
					{
						displayName: 'Tribute',
						name: 'tribute',
						type: 'string',
						default: '',
						description: 'The tribute for the gift transaction',
					},
					{
						displayName: 'Tribute City',
						name: 'tributeCity',
						type: 'string',
						default: '',
						description: 'The tribute city for the gift transaction',
					},
					{
						displayName: 'Tribute First Name',
						name: 'tributeFirstName',
						type: 'string',
						default: '',
						description: 'The tribute first name for the gift transaction',
					},
					{
						displayName: 'Tribute ID',
						name: 'tributeId',
						type: 'number',
						default: 0,
						description: 'The tribute dedication ID for the gift transaction',
					},
					{
						displayName: 'Tribute Last Name',
						name: 'tributeLastName',
						type: 'string',
						default: '',
						description: 'The tribute last name for the gift transaction',
					},
					{
						displayName: 'Tribute State',
						name: 'tributeState',
						type: 'string',
						default: '',
						description: 'The tribute state for the gift transaction',
					},
					{
						displayName: 'Tribute Type',
						name: 'tributeType',
						type: 'string',
						default: '',
						description: 'The tribute dedication type for the gift transaction',
					},
				],
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
        }
    ],
    "premiums": [
        {
            "id": "<integer>",
            "name": "<string>",
            "code": "<string>",
            "quantity": "<string>"
        }
    ],
    "customFields": {
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
			// Required fields
			const contactFirstName = this.getNodeParameter('contactFirstName', itemIndex) as string;
			const contactLastName = this.getNodeParameter('contactLastName', itemIndex) as string;
			const giftType = this.getNodeParameter('giftType', itemIndex) as string;
			const giftAmount = this.getNodeParameter('giftAmount', itemIndex) as string;
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as Record<string, any>;

			// --- Helper: extract fields from additionalFields by prefix/keys into a nested object ---
			const extractFields = (fieldMap: Record<string, string>): Record<string, any> => {
				const obj: Record<string, any> = {};
				for (const [uiField, apiField] of Object.entries(fieldMap)) {
					if (additionalFields[uiField] !== undefined) {
						obj[apiField] = additionalFields[uiField];
					}
				}
				return obj;
			};

			// --- Helper: parse JSON string value ---
			const parseJsonField = (value: any): any => {
				if (typeof value === 'string') {
					try {
						return JSON.parse(value);
					} catch (e) {
						return value;
					}
				}
				return value;
			};

			const contact: Record<string, any> = {
				firstName: contactFirstName,
				lastName: contactLastName,
			};

			const contactFieldMap: Record<string, string> = {
				contactReferenceId: 'referenceId',
				contactId: 'id',
				contactName: 'name',
				contactType: 'type',
				contactTitle: 'title',
				contactMiddleName: 'middleName',
				contactSuffix: 'suffix',
				contactBirthMonth: 'birthMonth',
				contactBirthDay: 'birthDay',
				contactBirthYear: 'birthYear',
				contactGender: 'gender',
				contactEmailType: 'emailType',
				contactEmail: 'email',
				contactPhoneType: 'phoneType',
				contactPhoneNumber: 'phone',
				contactTags: 'tags',
			};
			Object.assign(contact, extractFields(contactFieldMap));

			const contactAddress = extractFields({
				contactAddressLine1: 'address1',
				contactAddressLine2: 'address2',
				contactCity: 'city',
				contactState: 'state',
				contactPostal: 'postal',
				contactCountry: 'country',
			});
			if (Object.keys(contactAddress).length > 0) {
				contact.address = contactAddress;
			}

			if (additionalFields.contactEmailLists !== undefined) {
				contact.emailLists = parseJsonField(additionalFields.contactEmailLists);
			}

			// --- Build tributeDedication object ---
			const tributeDedication = extractFields({
				tributeId: 'tributeId',
				tributeType: 'tributeType',
				tributeFirstName: 'tributeFirstName',
				tributeLastName: 'tributeLastName',
				tributeCity: 'tributeCity',
				tributeState: 'tributeState',
				acknowledgeeIndividualId: 'acknowledgeeIndividualId',
				acknowledgeeFirstName: 'acknowledgeeFirstName',
				acknowledgeeLastName: 'acknowledgeeLastName',
				acknowledgeeAddress: 'acknowledgeeAddress',
				acknowledgeeCity: 'acknowledgeeCity',
				acknowledgeeState: 'acknowledgeeState',
				acknowledgeePostal: 'acknowledgeePostal',
				acknowledgeeEmail: 'acknowledgeeEmail',
				acknowledgeePhone: 'acknowledgeePhone',
			});

			// --- Build passthroughContact object ---
			const passthroughContact: Record<string, any> = extractFields({
				passthroughContactReferenceId: 'referenceId',
				passthroughContactId: 'id',
				passthroughContactName: 'name',
				passthroughContactType: 'type',
				passthroughContactTitle: 'title',
				passthroughContactFirstName: 'firstName',
				passthroughContactMiddleName: 'middleName',
				passthroughContactLastName: 'lastName',
				passthroughContactSuffix: 'suffix',
				passthroughContactBirthMonth: 'birthMonth',
				passthroughContactBirthDay: 'birthDay',
				passthroughContactBirthYear: 'birthYear',
				passthroughContactGender: 'gender',
				passthroughContactEmailType: 'emailType',
				passthroughContactEmail: 'email',
				passthroughContactPhoneType: 'phoneType',
				passthroughContactPhone: 'phone',
				passthroughContactTags: 'tags',
			});

			const passthroughAddress = extractFields({
				passthroughContactAddress1: 'address1',
				passthroughContactAddress2: 'address2',
				passthroughContactCity: 'city',
				passthroughContactState: 'state',
				passthroughContactPostal: 'postal',
				passthroughContactCountry: 'country',
			});
			if (Object.keys(passthroughAddress).length > 0) {
				passthroughContact.address = passthroughAddress;
			}

			if (additionalFields.passthroughContactEmailLists !== undefined) {
				passthroughContact.emailLists = parseJsonField(additionalFields.passthroughContactEmailLists);
			}

			const eventAttendee = extractFields({
				eventAttendeeEventId: 'eventId',
				eventAttendeeEventName: 'eventName',
				eventAttendeeInvited: 'invited',
				eventAttendeeRsvp: 'rsvp',
				eventAttendeeRsvpResponse: 'rsvpResponse',
				eventAttendeeAttended: 'attended',
			});

			const giftFieldMap: Record<string, string> = {
				transactionSource: 'transactionSource',
				transactionId: 'transactionId',
				giftDate: 'giftDate',
				cancelDate: 'cancelDate',
				giftCurrencyCode: 'currencyCode',
				giftExchangeRate: 'exchangeRate',
				giftFrequency: 'frequency',
				recurringGiftTransactionId: 'recurringGiftTransactionId',
				recurringGiftTransactionUpdate: 'recurringGiftTransactionUpdate',
				pledgeFrequency: 'pledgeFrequency',
				pledgeTransactionId: 'pledgeTransactionId',
				pledgeExpectedFullfillmentDate: 'pledgeExpectedFullfillmentDate',
				giftBatch: 'batch',
				giftNotes: 'notes',
				giftSegment: 'segment',
				mediaOutlet: 'mediaOutlet',
				receiptDate: 'receiptDate',
				receiptSegment: 'receiptSegment',
				cashAccountingCode: 'cashAccountingCode',
				tribute: 'tribute',
				isPrivate: 'isPrivate',
				isTaxDeductible: 'isTaxDeductible',
				checkNumber: 'checkNumber',
				creditCardType: 'creditCardType',
				nonCashGiftTypeId: 'nonCashGiftTypeId',
				nonCashGiftType: 'nonCashGiftType',
				nonCashGiftDescription: 'nonCashGiftDescription',
				stockTickerSymbol: 'stockTickerSymbol',
				stockNumberOfShares: 'stockNumberOfShares',
				iraCustodian: 'iraCustodian',
				submissionUrl: 'submissionUrl',
				contactIndividualId: 'contactIndividualId',
			};

			bodyData = {
				contact,
				giftType,
				amount: giftAmount,
				...extractFields(giftFieldMap),
			};

			// Parse JSON string fields at the top level
			const jsonFields = ['designations', 'premiums', 'customFields', 'customObjects'];
			for (const field of jsonFields) {
				if (additionalFields[field] !== undefined) {
					bodyData[field] = parseJsonField(additionalFields[field]);
				}
			}

			// Only include nested objects if they have data
			if (Object.keys(tributeDedication).length > 0) {
				bodyData.tributeDedication = tributeDedication;
			}
			if (Object.keys(passthroughContact).length > 0) {
				bodyData.passthroughContact = passthroughContact;
			}
			if (Object.keys(eventAttendee).length > 0) {
				bodyData.eventAttendee = eventAttendee;
			}
		}

		try {
			const response = virtuousCrmApiRequest.call(
				this,
				'POST',
				'/api/v2/Gift/Transaction',
				{},
				bodyData,
			);

			return response;
		} catch (error: any) {
			throw new NodeApiError(this.getNode(), error);
		}
	},
};
