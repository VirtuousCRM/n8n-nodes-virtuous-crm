import type { INodeProperties } from 'n8n-workflow';
import { contactIndividualCollectionGetDescription } from './get';
import { contactIndividualCollectionCreateDescription } from './create';
import { contactIndividualCollectionUpdateDescription } from './update';

export const ContactIndividualCollectionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contactIndividualCollection'],
			},
		},
		options: [
			{
				name: 'Get Custom Collections',
				value: 'getContactIndividualCollections',
				description: 'Get custom collections available for individuals',
				action: 'Get custom collections available for individuals',
			},
			{
				name: 'Create Collection for Individual',
				value: 'createContactIndividualCollection',
				description: 'Create a collection instance for an individual',
				action: 'Create a collection instance for an individual',
			},
			{
				name: 'Update Collection for Individual',
				value: 'updateContactIndividualCollection',
				description: 'Update a collection instance for an individual',
				action: 'Update a collection instance for an individual',
			},
		],
		default: 'getContactIndividualCollections',
	},
	...contactIndividualCollectionGetDescription.description.properties,
	...contactIndividualCollectionCreateDescription.description.properties,
	...contactIndividualCollectionUpdateDescription.description.properties,
];
