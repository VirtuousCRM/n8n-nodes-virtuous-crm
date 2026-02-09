import { NodeConnectionType, NodeOperationError, type IExecuteFunctions, type INodeExecutionData, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { ContactDescription } from './resources/contactTransaction';
import { GiftDescription } from './resources/giftTransaction';
import { contactTransactionCreateDescription } from './resources/contactTransaction/create';
import { giftTransactionCreateDescription } from './resources/giftTransaction/create';

export class VirtuousCrm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Virtuous CRM',
		name: 'virtuousCrm',
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		icon: { light: 'file:../../icons/virtuous-logo-mark.svg', dark: 'file:../../icons/virtuous-logo-mark.svg' },
		group: ['input'],
		version: 1,
		description: 'Interact with the Virtuous CRM API',
		usableAsTool: true,
		defaults: {
			name: 'Virtuous CRM Api Endpoints',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'virtuousCrmApi',
				required: true
			}
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Contact',
						value: 'contact'
					},
					{
						name: 'Gift',
						value: 'gift',
					}
				],
				noDataExpression: true,
				default: 'contact',
			},
			...ContactDescription,
			...GiftDescription
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const results: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			const resource = this.getNodeParameter('resource', itemIndex) as string;
			const operation = this.getNodeParameter('operation', itemIndex) as string;

			let result: any;

			if (resource === 'contact' && operation === 'singleContactTransaction') {
				result = await contactTransactionCreateDescription.execute.call(this, itemIndex);
			} else if (resource === 'gift' && operation === 'singleGiftTransaction') {
				result = await giftTransactionCreateDescription.execute.call(this, itemIndex);
			} else {
				throw new NodeOperationError(this.getNode(), `The resource "${resource}" with operation "${operation}" is not supported. Please check your node configuration.`);
			}

			results.push({
				json: result,
				pairedItem: itemIndex
			});
		}

		return [results];
	}
}
