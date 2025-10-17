import type { INodeProperties } from 'n8n-workflow';
import { giftTransactionCreateDescription } from './create';

export const GiftTransactionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['giftTransaction'],
			}
		},
		options: [
			{
				name: 'Create Gift Transaction',
				value: 'singleGiftTransaction',
				description: 'Create a Gift that will go through the import process',
				action: 'Create a gift that will go through the import process',
			},
		],
		default: 'singleGiftTransaction',
	},
	...giftTransactionCreateDescription.description.properties
];
