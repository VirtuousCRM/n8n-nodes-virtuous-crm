import type { INodeProperties } from 'n8n-workflow';
import { contactTransactionCreateDescription } from './create';
import { contactGetByIdDescription } from './getById';
import { contactGetByReferenceDescription } from './getByReference';

export const ContactDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contact'],
			},
		},
		options: [
			{
				name: 'Create Contact Transaction',
				value: 'singleContactTransaction',
				description: 'Create a Contact that will go through the import process',
				action: 'Create a contact that will go through the import process',
			},
			{
				name: 'Get Contact',
				value: 'getContactById',
				description: 'Get a contact by their ID',
				action: 'Get a contact by their id',
			},
			{
				name: 'Get Contact by Reference',
				value: 'getContactByReference',
				description: 'Get a contact by reference source and ID',
				action: 'Get a contact by reference source and id',
			},
		],
		default: 'singleContactTransaction',
	},
	...contactTransactionCreateDescription.description.properties,
	...contactGetByIdDescription.description.properties,
	...contactGetByReferenceDescription.description.properties,
];
