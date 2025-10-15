import { NodeOperationError, type IExecuteFunctions, type INodeProperties } from 'n8n-workflow';
import { virtuousCrmApiRequest } from '../../shared/crmTransport';

export const contactTransactionCreateDescription = {
	description: {
		properties: [
			{
				displayName: 'Input Method',
				name: 'inputMethod',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
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
				displayName: 'Reference Source',
				name: 'referenceSource',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The reference source of the contact',
			},
			{
				displayName: 'Reference ID',
				name: 'referenceId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The reference ID of the contact',
			},
			{
				displayName: 'Contact Type',
				name: 'contactType',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description:
					'The type of contact. Examples: Household, Organization, Foundation. Configurable via CRM.',
			},
			{
				displayName: 'Full Name',
				name: 'name',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The name of the contact',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The title of the contact',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The first name of the contact',
			},
			{
				displayName: 'Middle Name',
				name: 'middleName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The middle name of the contact',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The last name of the contact',
			},
			{
				displayName: 'Suffix',
				name: 'suffix',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The suffix of the contact',
			},
			{
				displayName: 'Birth Month',
				name: 'birthMonth',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['giftTransaction'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The birth month of the contact',
			},
			{
				displayName: 'Birth Day',
				name: 'birthDay',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['giftTransaction'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The birth day of the contact',
			},
			{
				displayName: 'Birth Year',
				name: 'birthYear',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['giftTransaction'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The birth year of the contact',
			},
			{
				displayName: 'Gender',
				name: 'gender',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['giftTransaction'],
						operation: ['singleGiftTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The gender of the contact',
			},
			{
				displayName: 'Email Type',
				name: 'emailType',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				placeholder: 'Primary Email',
				description:
					'The email type of the contact. Examples: Primary Email, Secondary Email, Home Email, Work Email, Other Email.',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The email of the contact',
			},
			{
				displayName: 'Phone Type',
				name: 'phoneType',
				type: 'string',
				default: '',
				placeholder: 'Mobile Phone',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description:
					'The phone type of the contact. Examples: Home Phone, Mobile Phone, Work Phone, Other Phone.',
			},
			{
				displayName: 'Phone Number',
				name: 'phone',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The phone number of the contact',
			},
			{
				displayName: 'Address Line 1',
				name: 'address1',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The address line 1 of the contact',
			},
			{
				displayName: 'Address Line 2',
				name: 'address2',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The address line 2 of the contact',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The city of the contact',
			},

			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The state of the contact',
			},
			{
				displayName: 'Postal Code',
				name: 'postal',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The postal code of the contact',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The country of the contact',
			},
			{
				displayName: 'Event ID',
				name: 'eventId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The event ID of the contact',
			},
			{
				displayName: 'Event Name',
				name: 'eventName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The event name of the contact',
			},
			{
				displayName: 'Invited',
				name: 'invited',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The invitation of the contact',
			},
			{
				displayName: 'RSVP Response',
				name: 'rsvpResponse',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The rsvp response of the contact',
			},
			{
				displayName: 'Attended',
				name: 'attended',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'Whether the contact attended',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				placeholder: 'tag1;tag2;tag3',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The tags of the contact',
			},
			{
				displayName: 'Origin Segment Code',
				name: 'originSegmentCode',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The origin segment code of the contact',
			},
			{
				displayName: 'Email Lists',
				name: 'emailLists',
				type: 'json',
				default: '[]',
				placeholder: '["list1", "list2", "list3"]',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The email lists associated with the contact',
			},
			{
				displayName: 'Custom Fields',
				name: 'customFields',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description:
					'JSON Object. Example: {"fieldName": "fieldValue", "fieldName2": "fieldValue2"}',
			},
			{
				displayName: 'Custom Objects',
				name: 'customObjects',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The custom objects',
				placeholder: `[
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
    ]`,
			},
			{
				displayName: 'Volunteer Attendances',
				name: 'volunteerAttendances',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['contactTransaction'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The volunteer attendances',
				placeholder: `[
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
    ]`,
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
		"birthMonth": "<string>",
		"birthDay": "<string>",
		"birthYear": "<string>",
		"gender": "<string>",
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
						operation: ['singleContactTransaction'],
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
		const cleanedData: { [key: string]: any } = {};

		// Define default/placeholder values to exclude
		const defaultValues: { [key: string]: any } = {
			// JSON array fields with default empty arrays
			emailLists: '[]',
			customObjects: '[]',
			volunteerAttendances: '[]',

			// JSON object fields with default empty objects
			customFields: '{}',

			// Boolean fields with false defaults
			invited: false,
			rsvpResponse: false,
			attended: false,

			// String fields with placeholder values (note: tags has placeholder, not default)
			// The tags field uses placeholder: 'tag1;tag2;tag3' but no default value
			// So empty string will be excluded by the empty string check
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

		// Only include non-empty, non-default values
		Object.entries(rawFields).forEach(([key, value]) => {
			if (!shouldExclude(key, value)) {
				// Handle special processing for certain fields
				if (key === 'emailLists' || key === 'customObjects' || key === 'volunteerAttendances') {
					// Parse JSON string fields that should be arrays
					try {
						const parsed = typeof value === 'string' ? JSON.parse(value) : value;
						// Only include if it's a non-empty array
						if (Array.isArray(parsed) && parsed.length > 0) {
							cleanedData[key] = parsed;
						}
					} catch (e) {
						// If parsing fails but it's not empty default, use original value
						if (value && value !== '[]' && value !== '') {
							cleanedData[key] = value;
						}
					}
				} else if (key === 'customFields') {
					// Handle custom fields JSON object
					try {
						const parsed = typeof value === 'string' ? JSON.parse(value) : value;
						if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
							cleanedData[key] = parsed;
						}
					} catch (e) {
						// If parsing fails and it's not empty default, include it
						if (value && value !== '{}' && value !== '[]' && value !== '') {
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
				throw new NodeOperationError(this.getNode(), `Invalid JSON: ${error.message}`, {
					itemIndex,
				});
			}
		} else {
			const rawFields = {
				referenceSource: this.getNodeParameter('referenceSource', itemIndex),
				referenceId: this.getNodeParameter('referenceId', itemIndex),
				contactType: this.getNodeParameter('contactType', itemIndex),
				name: this.getNodeParameter('name', itemIndex),
				title: this.getNodeParameter('title', itemIndex),
				firstName: this.getNodeParameter('firstName', itemIndex),
				middleName: this.getNodeParameter('middleName', itemIndex),
				lastName: this.getNodeParameter('lastName', itemIndex),
				suffix: this.getNodeParameter('suffix', itemIndex),
				birthMonth: this.getNodeParameter('birthMonth', itemIndex),
				birthDay: this.getNodeParameter('birthDay', itemIndex),
				birthYear: this.getNodeParameter('birthYear', itemIndex),
				gender: this.getNodeParameter('gender', itemIndex),
				emailType: this.getNodeParameter('emailType', itemIndex),
				email: this.getNodeParameter('email', itemIndex),
				phoneType: this.getNodeParameter('phoneType', itemIndex),
				phone: this.getNodeParameter('phone', itemIndex),
				address1: this.getNodeParameter('address1', itemIndex),
				address2: this.getNodeParameter('address2', itemIndex),
				city: this.getNodeParameter('city', itemIndex),
				state: this.getNodeParameter('state', itemIndex),
				postal: this.getNodeParameter('postal', itemIndex),
				country: this.getNodeParameter('country', itemIndex),
				eventId: this.getNodeParameter('eventId', itemIndex),
				eventName: this.getNodeParameter('eventName', itemIndex),
				invited: this.getNodeParameter('invited', itemIndex),
				rsvpResponse: this.getNodeParameter('rsvpResponse', itemIndex),
				attended: this.getNodeParameter('attended', itemIndex),
				tags: this.getNodeParameter('tags', itemIndex),
				originSegmentCode: this.getNodeParameter('originSegmentCode', itemIndex),
				emailLists: this.getNodeParameter('emailLists', itemIndex),
				customFields: this.getNodeParameter('customFields', itemIndex),
				customObjects: this.getNodeParameter('customObjects', itemIndex),
				volunteerAttendances: this.getNodeParameter('volunteerAttendances', itemIndex),
			};
			// Clean up the payload using our helper method
			bodyData = contactTransactionCreateDescription.cleanFieldsForApi(rawFields);
		}

		try {
			const response = virtuousCrmApiRequest.call(
				this,
				'POST',
				'/api/Contact/Transaction',
				{},
				bodyData,
			);
			return response;
		} catch (error: any) {
			// Create a more user-friendly error message
			const errorMessage =
				error.response?.body?.message ||
				error.response?.body?.error ||
				error.message ||
				'Unknown error occurred';

			const statusCode = error.statusCode || error.status || error.response?.status;

			throw new NodeOperationError(
				this.getNode(),
				`Virtuous CRM API Error (${statusCode}): ${errorMessage}`,
				{ itemIndex },
			);
		}
	},
};
