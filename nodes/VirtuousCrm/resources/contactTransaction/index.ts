import type { INodeProperties } from 'n8n-workflow';
import { contactTransactionCreateDescription } from './create';

export const ContactDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contact'],
			}
		},
		options: [
			{
				name: 'Create Contact Transaction',
				value: 'singleContactTransaction',
				description: 'Create a Contact that will go through the import process',
				action: 'Create a contact that will go through the import process',
			}
		],
		default: 'singleContactTransaction',
	},
	...contactTransactionCreateDescription.description.properties
];
