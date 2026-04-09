import { NodeApiError, type IExecuteFunctions, type INodeProperties } from 'n8n-workflow';
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
						resource: ['contact'],
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
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The first name of the contact',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				description: 'The last name of the contact',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['singleContactTransaction'],
						inputMethod: ['fields'],
					},
				},
				options: [
					{
						displayName: 'Address Line 1',
						name: 'address1',
						type: 'string',
						default: '',
						description: 'The address line 1 of the contact',
					},
					{
						displayName: 'Address Line 2',
						name: 'address2',
						type: 'string',
						default: '',
						description: 'The address line 2 of the contact',
					},
					{
						displayName: 'Attended',
						name: 'attended',
						type: 'boolean',
						default: false,
						description: 'Whether the contact attended',
					},
					{
						displayName: 'Birth Day',
						name: 'birthDay',
						type: 'string',
						default: '',
						description: 'The birth day of the contact',
					},
					{
						displayName: 'Birth Month',
						name: 'birthMonth',
						type: 'string',
						default: '',
						description: 'The birth month of the contact',
					},
					{
						displayName: 'Birth Year',
						name: 'birthYear',
						type: 'string',
						default: '',
						description: 'The birth year of the contact',
					},
					{
						displayName: 'City',
						name: 'city',
						type: 'string',
						default: '',
						description: 'The city of the contact',
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
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						description: 'The country of the contact',
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
						description:
							'Example: [{"name": "&lt;string&gt;", "fields": [{"name": "&lt;string&gt;", "value": "&lt;string&gt;"}]}]',
						hint: 'Provide a JSON array of custom objects with their fields.',
					},
					{
						displayName: 'Email',
						name: 'contactEmail',
						type: 'string',
						default: '',
						description: 'The email of the contact',
					},
					{
						displayName: 'Email Lists',
						name: 'emailLists',
						type: 'json',
						default: '[]',
						description: 'Example: ["list1", "list2", "list3"]',
						hint: 'Provide a JSON array of email list names.',
					},
					{
						displayName: 'Email Type',
						name: 'emailType',
						type: 'string',
						default: '',
						description:
							'The email type of the contact. Examples: Primary Email, Secondary Email, Home Email, Work Email, Other Email.',
					},
					{
						displayName: 'Event ID',
						name: 'eventId',
						type: 'number',
						default: 0,
						description: 'The event ID for the contact',
					},
					{
						displayName: 'Event Name',
						name: 'eventName',
						type: 'string',
						default: '',
						description: 'The event name for the contact',
					},
					{
						displayName: 'Full Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'The name of the contact',
					},
					{
						displayName: 'Gender',
						name: 'gender',
						type: 'string',
						default: '',
						description: 'The gender of the contact',
					},
					{
						displayName: 'Invited',
						name: 'invited',
						type: 'boolean',
						default: false,
						description: 'Whether the contacted was invited to the event',
					},
					{
						displayName: 'Middle Name',
						name: 'middleName',
						type: 'string',
						default: '',
						description: 'The middle name of the contact',
					},
					{
						displayName: 'Origin Segment Code',
						name: 'originSegmentCode',
						type: 'string',
						default: '',
						description: 'The origin segment code of the contact',
					},
					{
						displayName: 'Phone Number',
						name: 'phone',
						type: 'string',
						default: '',
						description: 'The phone number of the contact',
					},
					{
						displayName: 'Phone Type',
						name: 'phoneType',
						type: 'string',
						default: '',
						description:
							'The phone type of the contact. Examples: Home Phone, Mobile Phone, Work Phone, Other Phone.',
					},
					{
						displayName: 'Postal Code',
						name: 'postal',
						type: 'string',
						default: '',
						description: 'The postal code of the contact',
					},
					{
						displayName: 'Reference ID',
						name: 'referenceId',
						type: 'string',
						default: '',
						description: 'The reference ID of the contact',
					},
					{
						displayName: 'Reference Source',
						name: 'referenceSource',
						type: 'string',
						default: '',
						description: 'The reference source of the contact',
					},
					{
						displayName: 'RSVP Response',
						name: 'rsvpResponse',
						type: 'boolean',
						default: false,
						description: 'Whether contact rsvped to the event',
					},
					{
						displayName: 'State',
						name: 'state',
						type: 'string',
						default: '',
						description: 'The state of the contact',
					},
					{
						displayName: 'Suffix',
						name: 'suffix',
						type: 'string',
						default: '',
						description: 'The suffix of the contact',
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'The tags of the contact',
						hint: 'Multiple tags can be separated by semicolons. Example: tag1;tag2;tag3',
					},
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
						description: 'The title of the contact',
					},
					{
						displayName: 'Volunteer Attendances',
						name: 'volunteerAttendances',
						type: 'json',
						default: '[]',
						description:
							'Example: [{"volunteerOpportunityId": &lt;integer&gt;, "volunteerOpportunityName": "&lt;string&gt;", "date": "&lt;string&gt;", "hours": "&lt;string&gt;"}]',
						hint: 'Provide a JSON array of volunteer attendance objects.',
					},
				],
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
        }
    ]
}`,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['singleContactTransaction'],
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
			const firstName = this.getNodeParameter('firstName', itemIndex) as string;
			const lastName = this.getNodeParameter('lastName', itemIndex) as string;
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as Record<
				string,
				any
			>;

			// Parse JSON string fields
			const jsonStringFields = [
				'emailLists',
				'customFields',
				'customObjects',
				'volunteerAttendances',
			];
			for (const field of jsonStringFields) {
				if (additionalFields[field] !== undefined && typeof additionalFields[field] === 'string') {
					try {
						additionalFields[field] = JSON.parse(additionalFields[field]);
					} catch (e) {
						// leave as-is if parsing fails
					}
				}
			}

			// Rename contactEmail -> email to match API field name
			if (additionalFields.contactEmail !== undefined) {
				additionalFields.email = additionalFields.contactEmail;
				delete additionalFields.contactEmail;
			}

			bodyData = {
				firstName,
				lastName,
				...additionalFields,
			};
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
			throw new NodeApiError(this.getNode(), error);
		}
	},
};
