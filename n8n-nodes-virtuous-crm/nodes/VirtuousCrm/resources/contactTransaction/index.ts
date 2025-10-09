import type { INodeProperties } from 'n8n-workflow';
import { contactTransactionCreateDescription } from './create';

const showOnlyForContact = {
	resource: ['contactTransaction'],
};

export const ContactTransactionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForContact,
		},
		options: [
			{
				name: 'Contact Transaction',
						value: 'singleContactTransaction',
						description: 'Create a Contact that will go through the import process',
						action: 'Create a contact that will go through the import process',
				routing: {
					request: {
						method: 'POST',
						url: '',
					},
				},
			}
		],
		default: 'singleContactTransaction',
	},
	...contactTransactionCreateDescription
];
