import { NodeOperationError, type IExecuteFunctions, type INodeProperties } from 'n8n-workflow';
import { virtuousCrmApiRequest } from '../../shared/crmTransport';

export const giftTransactionCreateDescription = 	{
		description: {
			properties: [
	{
		displayName: 'Input Method',
		name: 'inputMethod',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['giftTransaction']
			}
		},
		options: [
			{
				name: 'Using Fields Below',
				value: 'fields'
			},
			{
				name: 'Using JSON',
				value: 'json'
			}
		],
		default: 'fields',
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
	{
				displayName: 'JSON Data',
				name: 'jsonData',
				type: 'json',
				default: `{
		"referenceSource": "<string>",
		"referenceId": "<string>",
		"contactType": "<string>",
		"name": "<string>",
		"title": "<string>",
		"firstName": "<string>",
		"middleName": "<string>",
		"lastName": "<string>",
		"suffix": "<string>",
		"emailType": "<string>",
		"email": "<string>",
		"phoneType": "<string>",
		"phone": "<string>",
		"address1": "<string>",
		"address2": "<string>",
		"city": "<string>",
		"state": "<string>",
		"postal": "<string>",
		"country": "<string>",
		"eventId": "<integer>",
		"eventName": "<string>",
		"invited": "<boolean>",
		"rsvp": "<boolean>",
		"rsvpResponse": "<boolean>",
		"attended": "<boolean>",
		"tags": "<string>",
		"originSegmentCode": "<string>",
		"emailLists": [
				"<string>",
				"<string>"
		],
		"customFields": "<object>",
		"volunteerAttendances": [
				{
						"volunteerOpportunityId": "<integer>",
						"volunteerOpportunityName": "<string>",
						"date": "<string>",
						"hours": "<string>"
				},
				{
						"volunteerOpportunityId": "<integer>",
						"volunteerOpportunityName": "<string>",
						"date": "<string>",
						"hours": "<string>"
				}
		]
}`,
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						inputMethod: ['json'],
					},
				},
				description: 'Complete JSON payload',
			}
] as INodeProperties[],
},

/**
 * Clean fields for API submission by removing empty, null, undefined, and default values
 * @param rawFields - Object containing all field values from the form
 * @returns Cleaned object with only meaningful values
 */
cleanFieldsForApi(rawFields: { [key: string]: any }): { [key: string]: any } {
	const cleanedData: { [key: string]: any } = {};

	// Define default/placeholder values to exclude
	const defaultValues: { [key: string]: any } = {
		tags: 'tag1;tag2;tag3',
		emailLists: '[]',
		volunteerAttendances: '[]',
		attended: false, // default boolean value
	};

	// Helper function to check if value should be excluded
	const shouldExclude = (key: string, value: any): boolean => {
		// Exclude empty strings, null, undefined
		if (value === '' || value === null || value === undefined) {
			return true;
		}

		// Exclude default/placeholder values
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
				if ((Array.isArray(parsed) && parsed.length === 0) ||
					(typeof parsed === 'object' && parsed !== null && Object.keys(parsed).length === 0)) {
					return true;
				}
			} catch (e) {
				// Not JSON, continue with other checks
			}
		}

		return false;
	};

	// Only include non-empty, non-default values
	Object.entries(rawFields).forEach(([key, value]) => {
		if (!shouldExclude(key, value)) {
			// Handle special processing for certain fields
			if (key === 'emailLists' || key === 'volunteerAttendances') {
				// Parse JSON string fields
				try {
					cleanedData[key] = typeof value === 'string' ? JSON.parse(value) : value;
				} catch (e) {
					// If parsing fails, use the original value
					cleanedData[key] = value;
				}
			} else if (key === 'customFields') {
				// Handle custom fields JSON
				try {
					const parsed = typeof value === 'string' ? JSON.parse(value) : value;
					if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
						cleanedData[key] = parsed;
					}
				} catch (e) {
					// If parsing fails and it's not empty, include it
					if (value && value !== '{}') {
						cleanedData[key] = value;
					}
				}
			} else {
				// Include the value as-is
				cleanedData[key] = value;
			}
		}
	});

	return cleanedData;
},

async execute(this: IExecuteFunctions, itemIndex: number) {
	const inputMethod = this.getNodeParameter('inputMethod', itemIndex) as string;
		let bodyData: any;

		if (inputMethod === 'json') {
			const jsonData = this.getNodeParameter('jsonData', itemIndex) as string;
			try {
				bodyData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
			} catch (error) {
				throw new NodeOperationError(
					this.getNode(),
					`Invalid JSON: ${error.message}`,
					{ itemIndex }
				);
			}
		} else {
			// Build from fields - let's debug this
			// const rawFields = {
			// 	referenceSource: this.getNodeParameter('referenceSource', itemIndex),
			// 	referenceId: this.getNodeParameter('referenceId', itemIndex),
			// 	contactType: this.getNodeParameter('contactType', itemIndex),
			// 	name: this.getNodeParameter('name', itemIndex),
			// 	title: this.getNodeParameter('title', itemIndex),
			// 	firstName: this.getNodeParameter('firstName', itemIndex),
			// 	middleName: this.getNodeParameter('middleName', itemIndex),
			// 	lastName: this.getNodeParameter('lastName', itemIndex),
			// 	suffix: this.getNodeParameter('suffix', itemIndex),
			// 	emailType: this.getNodeParameter('emailType', itemIndex),
			// 	email: this.getNodeParameter('email', itemIndex),
			// 	phoneType: this.getNodeParameter('phoneType', itemIndex),
			// 	phone: this.getNodeParameter('phone', itemIndex),
			// 	address1: this.getNodeParameter('address1', itemIndex),
			// 	address2: this.getNodeParameter('address2', itemIndex),
			// 	city: this.getNodeParameter('city', itemIndex),
			// 	state: this.getNodeParameter('state', itemIndex),
			// 	postal: this.getNodeParameter('postal', itemIndex),
			// 	country: this.getNodeParameter('country', itemIndex),
			// 	eventId: this.getNodeParameter('eventId', itemIndex),
			// 	eventName: this.getNodeParameter('eventName', itemIndex),
			// 	invited: this.getNodeParameter('invited', itemIndex),
			// 	rsvpResponse: this.getNodeParameter('rsvpResponse', itemIndex),
			// 	attended: this.getNodeParameter('attended', itemIndex),
			// 	tags: this.getNodeParameter('tags', itemIndex),
			// 	originSegmentCode: this.getNodeParameter('originSegmentCode', itemIndex),
			// 	emailLists: this.getNodeParameter('emailLists', itemIndex),
			// 	customFields: this.getNodeParameter('customFields', itemIndex),
			// 	volunteerAttendances: this.getNodeParameter('volunteerAttendances', itemIndex),
			// };

			// Debug: Show raw field values before processing
			// throw new NodeOperationError(
			// 	this.getNode(),
			// 	`FIELDS DEBUG - Raw field values:\n${JSON.stringify({
			// 		inputMethod,
			// 		rawFields,
			// 		fieldTypes: Object.fromEntries(
			// 			Object.entries(rawFields).map(([key, value]) => [key, typeof value])
			// 		),
			// 		emptyFields: Object.fromEntries(
			// 			Object.entries(rawFields).filter(([key, value]) =>
			// 				value === '' || value === null || value === undefined
			// 			)
			// 		)
			// 	}, null, 2)}`,
			// 	{ itemIndex }
			// );

			// Clean up the payload using our helper method
			//bodyData = contactTransactionCreateDescription.cleanFieldsForApi(rawFields);
		}

		// Log the request details
		//const requestUrl = 'https://apidevlegacy.virtuoussoftware.com/api/Contact/Transaction';
		const requestMethod = 'POST';

		try {
			const response = virtuousCrmApiRequest.call(this, requestMethod, '/api/Contact/Transaction', {}, bodyData);
			// Make the API request with authentication
			// const response = await this.helpers.httpRequestWithAuthentication.call(
			// 	this,
			// 	'virtuousCrmApi',
			// 	{
			// 		method: requestMethod,
			// 		url: requestUrl,
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 		},
			// 		body: bodyData,
			// 		json: true,
			// 		returnFullResponse: true, // Get full response including status codes
			// 	}
			// );

			// Return the response body (the actual contact transaction data)
			return response;

		} catch (error: any) {
			// Create a more user-friendly error message
			const errorMessage = error.response?.body?.message ||
							 error.response?.body?.error ||
							 error.message ||
							 'Unknown error occurred';

			const statusCode = error.statusCode || error.status || error.response?.status;

			throw new NodeOperationError(
				this.getNode(),
				`Virtuous CRM API Error (${statusCode}): ${errorMessage}`,
				{ itemIndex }
			);
		}

}
}
