import { type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { ContactTransactionDescription } from './resources/contactTransaction';
import { GiftTransactionDescription } from './resources/giftTransaction';

export class VirtuousCrm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Virtuous CRM',
		name: 'virtuousCrm',
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		icon: { light: 'file:../../icons/virtuous-logo-mark.svg', dark: 'file:../../icons/virtuous-logo-mark.svg' },
		group: ['input'],
		version: 1,
		description: 'Interact with the Virtuous CRM API',
		codex: {
			alias: ['CRM', 'Virtuous'],
			categories: ['AI'],
			subcategories: {
				AI: ['Tools'],
				Tools: ['CRM']
			}
		},
		usableAsTool: true,
		defaults: {
			name: 'Virtuous CRM Api Endpoints',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'virtuousCrmApi',
				required: true
			}
		],
		requestDefaults: {
			baseURL: 'https://api.virtuoussoftware.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Contact Transaction',
						value: 'contactTransaction'
					},
					{
						name: 'Gift Transaction',
						value: 'giftTransaction',
					}
				],
				noDataExpression: true,
				default: 'contactTransaction',
			},
			...ContactTransactionDescription,
			...GiftTransactionDescription
		],
	};
}
