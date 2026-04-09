import type { INodeProperties } from 'n8n-workflow';
import { contactIndividualGetByIdDescription } from './getById';
import { contactIndividualGetByContactDescription } from './getByContact';
import { contactIndividualFindByEmailDescription } from './findByEmail';

export const ContactIndividualDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contactIndividual'],
			},
		},
		options: [
			{
				name: 'Get Individual',
				value: 'getContactIndividualById',
				description: 'Get an individual by their ID',
				action: 'Get an individual by their id',
			},
			{
				name: 'Get Individuals for Contact',
				value: 'getIndividualsByContact',
				description: 'Get all individuals for a contact',
				action: 'Get all individuals for a contact',
			},
			{
				name: 'Find Individual by Email',
				value: 'findIndividualByEmail',
				description: 'Find an individual by email address',
				action: 'Find an individual by email address',
			},
		],
		default: 'getContactIndividualById',
	},
	...contactIndividualGetByIdDescription.description.properties,
	...contactIndividualGetByContactDescription.description.properties,
	...contactIndividualFindByEmailDescription.description.properties,
];
