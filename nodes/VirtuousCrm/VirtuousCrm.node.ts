import {
	NodeConnectionType,
	NodeOperationError,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { ContactDescription } from './resources/contact';
import { GiftDescription } from './resources/giftTransaction';
import { ContactCollectionDescription } from './resources/contactCollection';
import { ContactIndividualCollectionDescription } from './resources/contactIndividualCollection';
import { ContactIndividualDescription } from './resources/contactIndividual';
import { contactTransactionCreateDescription } from './resources/contact/create';
import { contactGetByIdDescription } from './resources/contact/getById';
import { contactGetByReferenceDescription } from './resources/contact/getByReference';
import { giftTransactionCreateDescription } from './resources/giftTransaction/create';
import { contactCollectionGetDescription } from './resources/contactCollection/get';
import { contactCollectionCreateDescription } from './resources/contactCollection/create';
import { contactCollectionUpdateDescription } from './resources/contactCollection/update';
import { contactIndividualCollectionGetDescription } from './resources/contactIndividualCollection/get';
import { contactIndividualCollectionCreateDescription } from './resources/contactIndividualCollection/create';
import { contactIndividualCollectionUpdateDescription } from './resources/contactIndividualCollection/update';
import { contactIndividualGetByIdDescription } from './resources/contactIndividual/getById';
import { contactIndividualGetByContactDescription } from './resources/contactIndividual/getByContact';
import { contactIndividualFindByEmailDescription } from './resources/contactIndividual/findByEmail';

export class VirtuousCrm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Virtuous CRM',
		name: 'virtuousCrm',
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		icon: {
			light: 'file:../../icons/virtuous-logo-mark.svg',
			dark: 'file:../../icons/virtuous-logo-mark.svg',
		},
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
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Contact Collection',
						value: 'contactCollection',
					},
					{
						name: 'Contact Individual',
						value: 'contactIndividual',
					},
					{
						name: 'Contact Individual Collection',
						value: 'contactIndividualCollection',
					},
					{
						name: 'Gift',
						value: 'gift',
					},
				],
				noDataExpression: true,
				default: 'contact',
			},
			...ContactDescription,
			...ContactCollectionDescription,
			...ContactIndividualDescription,
			...ContactIndividualCollectionDescription,
			...GiftDescription,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const results: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const resource = this.getNodeParameter('resource', itemIndex) as string;
				const operation = this.getNodeParameter('operation', itemIndex) as string;

				let result: any;

				if (resource === 'contact' && operation === 'singleContactTransaction') {
					result = await contactTransactionCreateDescription.execute.call(this, itemIndex);
				} else if (resource === 'contact' && operation === 'getContactById') {
					result = await contactGetByIdDescription.execute.call(this, itemIndex);
				} else if (resource === 'contact' && operation === 'getContactByReference') {
					result = await contactGetByReferenceDescription.execute.call(this, itemIndex);
				} else if (resource === 'contactIndividual' && operation === 'getContactIndividualById') {
					result = await contactIndividualGetByIdDescription.execute.call(this, itemIndex);
				} else if (resource === 'contactIndividual' && operation === 'getIndividualsByContact') {
					result = await contactIndividualGetByContactDescription.execute.call(this, itemIndex);
				} else if (resource === 'contactIndividual' && operation === 'findIndividualByEmail') {
					result = await contactIndividualFindByEmailDescription.execute.call(this, itemIndex);
				} else if (resource === 'contactCollection' && operation === 'getContactCollections') {
					result = await contactCollectionGetDescription.execute.call(this, itemIndex);
				} else if (resource === 'contactCollection' && operation === 'createContactCollection') {
					result = await contactCollectionCreateDescription.execute.call(this, itemIndex);
				} else if (resource === 'contactCollection' && operation === 'updateContactCollection') {
					result = await contactCollectionUpdateDescription.execute.call(this, itemIndex);
				} else if (
					resource === 'contactIndividualCollection' &&
					operation === 'getContactIndividualCollections'
				) {
					result = await contactIndividualCollectionGetDescription.execute.call(this, itemIndex);
				} else if (
					resource === 'contactIndividualCollection' &&
					operation === 'createContactIndividualCollection'
				) {
					result = await contactIndividualCollectionCreateDescription.execute.call(this, itemIndex);
				} else if (
					resource === 'contactIndividualCollection' &&
					operation === 'updateContactIndividualCollection'
				) {
					result = await contactIndividualCollectionUpdateDescription.execute.call(this, itemIndex);
				} else if (resource === 'gift' && operation === 'singleGiftTransaction') {
					result = await giftTransactionCreateDescription.execute.call(this, itemIndex);
				} else {
					throw new NodeOperationError(
						this.getNode(),
						`The resource "${resource}" with operation "${operation}" is not supported. Please check your node configuration.`,
					);
				}

				results.push({
					json: result,
					pairedItem: itemIndex,
				});
			} catch (error) {
				if (this.continueOnFail()) {
					results.push({
						json: { error: error.message },
						pairedItem: { item: itemIndex },
					});
					continue;
				}

				throw new NodeOperationError(this.getNode(), error as Error, {
					description: error.description,
					itemIndex: itemIndex,
				});
			}
		}

		return [results];
	}
}
