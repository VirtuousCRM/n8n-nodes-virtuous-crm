import type { INodeProperties } from 'n8n-workflow';
import { contactCollectionGetDescription } from './get';
import { contactCollectionCreateDescription } from './create';
import { contactCollectionUpdateDescription } from './update';

export const ContactCollectionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contactCollection'],
			},
		},
		options: [
			{
				name: 'Get Custom Collections',
				value: 'getContactCollections',
				description: 'Get custom collections available for contacts',
				action: 'Get custom collections available for contacts',
			},
			{
				name: 'Create Collection for Contact',
				value: 'createContactCollection',
				description: 'Create a collection instance for a contact',
				action: 'Create a collection instance for a contact',
			},
			{
				name: 'Update Collection for Contact',
				value: 'updateContactCollection',
				description: 'Update a collection instance for a contact',
				action: 'Update a collection instance for a contact',
			},
		],
		default: 'getContactCollections',
	},
	...contactCollectionGetDescription.description.properties,
	...contactCollectionCreateDescription.description.properties,
	...contactCollectionUpdateDescription.description.properties,
];
