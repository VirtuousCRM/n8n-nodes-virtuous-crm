import type { INodeProperties } from 'n8n-workflow';

const showOnlyForContactTransaction = {
	operation: ['contactTransaction'],
	resource: ['contactTransaction'],
};
export const contactTransactionCreateDescription: INodeProperties[] = [
	{
		displayName: 'Reference Source',
		name: 'referenceSource',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The source of the contact transaction',
	},
	{
		displayName: 'Reference ID',
		name: 'referenceId',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The source ID of the contact transaction',
	},
	{
		displayName: 'Contact Type',
		name: 'contactType',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description:
			'The type of contact for the contact transaction. Examples: Household, Organization, Foundation. Configurable via CRM.',
	},
	{
		displayName: 'Full Name',
		name: 'contactName',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The name of the contact for the contact transaction',
	},
	{
		displayName: 'Title',
		name: 'contactTitle',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The title of the contact for the contact transaction',
	},
	{
		displayName: 'First Name',
		name: 'contactFirstName',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The first name of the contact for the contact transaction',
	},
	{
		displayName: 'Middle Name',
		name: 'contactMiddleName',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The middle name of the contact for the contact transaction',
	},
	{
		displayName: 'Last Name',
		name: 'contactLastName',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The last name of the contact for the contact transaction',
	},
	{
		displayName: 'Suffix',
		name: 'contactSuffix',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The suffix of the contact for the contact transaction',
	},
	{
		displayName: 'Email Type',
		name: 'contactEmailType',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description:
			'The email type of the contact for the contact transaction. Examples: Primary Email, Secondary Email, Home Email, Work Email, Other Email.',
	},
	{
		displayName: 'Email',
		name: 'contactEmail',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The email of the contact for the contact transaction',
	},
	{
		displayName: 'Phone Type',
		name: 'contactPhoneType',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description:
			'The phone type of the contact for the contact transaction. Examples: Home Phone, Mobile Phone, Work Phone, Other Phone.',
	},
	{
		displayName: 'Phone Number',
		name: 'contactPhoneNumber',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The phone number of the contact for the contact transaction',
	},
	{
		displayName: 'Address Line 1',
		name: 'contactAddressLine1',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The address line 1 of the contact for the contact transaction',
	},
	{
		displayName: 'Address Line 2',
		name: 'contactAddressLine2',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The address line 2 of the contact for the contact transaction',
	},
	{
		displayName: 'City',
		name: 'contactCity',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The city of the contact for the contact transaction',
	},

	{
		displayName: 'State',
		name: 'contactState',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The state of the contact for the contact transaction',
	},
	{
		displayName: 'Postal Code',
		name: 'contactPostalCode',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The postal code of the contact for the contact transaction',
	},
	{
		displayName: 'Country',
		name: 'contactCountry',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The country of the contact for the contact transaction',
	},
	{
		displayName: 'Event ID',
		name: 'contactEventId',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The event ID of the contact for the contact transaction',
	},
	{
		displayName: 'Event Name',
		name: 'contactEventName',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The event name of the contact for the contact transaction',
	},
	{
		displayName: 'Invited',
		name: 'contactInvited',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The invitation of the contact for the contact transaction',
	},
	{
		displayName: 'Address RSVP',
		name: 'contactAddressRsvp',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The rsvp of the contact for the contact transaction',
	},
	{
		displayName: 'RSVP Response',
		name: 'contactRsvpResponse',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The rsvp response of the contact for the contact transaction',
	},
	{
		displayName: 'Attended',
		name: 'contactAttended',
		type: 'boolean',
		noDataExpression: true,
		default: false,
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'Whether the contact attended for the contact transaction',
	},
	{
		displayName: 'Tags',
		name: 'contactTags',
		type: 'string',
		noDataExpression: true,
		default: 'tag1;tag2;tag3',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The tags of the contact for the contact transaction',
	},
	{
		displayName: 'Origin Segment Code',
		name: 'contactOriginSegmentCode',
		type: 'string',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The origin segment code of the contact for the contact transaction',
	},
	{
		displayName: 'Email Lists',
		name: 'contactEmailLists',
		type: 'json',
		noDataExpression: true,
		default: '[]',
		placeholder: '["list1", "list2", "list3"]',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The email lists of the contact for the contact transaction',
	},
	{
		displayName: 'Custom Fields',
		name: 'contactCustomFields',
		type: 'json',
		noDataExpression: true,
		default: '',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The custom fields and values for the contact transaction',
		placeholder: '{"CustomField1": "Value1", "CustomField2": "Value2"}',
	},
	{
		displayName: 'Volunteer Attendances',
		name: 'contactVolunteerAttendances',
		type: 'json',
		noDataExpression: true,
		default: '[]',
		displayOptions: {
			show: showOnlyForContactTransaction,
		},
		description: 'The volunteer attendances for the contact transaction',
		placeholder:
			'[{"volunteerOpportunityId": "1", "volunteerOpportunityName": "opportunityName", "date": "", "hours": "2"}]',
	},
];
