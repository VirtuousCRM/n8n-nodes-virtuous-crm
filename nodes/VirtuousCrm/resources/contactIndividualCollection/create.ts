import { NodeApiError, type IExecuteFunctions, type INodeProperties } from 'n8n-workflow';
import { virtuousCrmApiRequest } from '../../shared/crmTransport';

export const contactIndividualCollectionCreateDescription = {
	description: {
		properties: [
			{
				displayName: 'Input Method',
				name: 'inputMethod',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['contactIndividualCollection'],
						operation: ['createContactIndividualCollection'],
					},
				},
				options: [
					{
						name: 'Using Fields Below',
						value: 'fields',
					},
					{
						name: 'Using JSON',
						value: 'json',
					},
				],
				default: 'fields',
			},
			{
				displayName: 'Contact Individual ID',
				name: 'contactIndividualId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['contactIndividualCollection'],
						operation: ['createContactIndividualCollection'],
					},
				},
				description: 'The contact individual identifier',
			},
			{
				displayName: 'Custom Collection ID',
				name: 'customCollectionId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['contactIndividualCollection'],
						operation: ['createContactIndividualCollection'],
					},
				},
				description: 'The custom collection identifier',
			},
			{
				displayName: 'Name',
				name: 'collectionName',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['contactIndividualCollection'],
						operation: ['createContactIndividualCollection'],
						inputMethod: ['fields'],
					},
				},
				description: 'The name for the collection instance',
			},
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'json',
				required: true,
				default: '[{"name": "", "value": ""}]',
				displayOptions: {
					show: {
						resource: ['contactIndividualCollection'],
						operation: ['createContactIndividualCollection'],
						inputMethod: ['fields'],
					},
				},
				description: 'The collection fields as a JSON array',
				hint: 'Example: [{"name": "fieldName", "value": "fieldValue"}]',
			},
			{
				displayName: 'JSON Data',
				name: 'jsonData',
				type: 'json',
				default: `{
    "name": "<string>",
    "fields": [
        {
            "name": "<string>",
            "value": "<string>"
        }
    ]
}`,
				displayOptions: {
					show: {
						resource: ['contactIndividualCollection'],
						operation: ['createContactIndividualCollection'],
						inputMethod: ['json'],
					},
				},
				description: 'Complete JSON payload',
			},
		] as INodeProperties[],
	},

	async execute(this: IExecuteFunctions, itemIndex: number) {
		const inputMethod = this.getNodeParameter('inputMethod', itemIndex) as string;
		const contactIndividualId = this.getNodeParameter('contactIndividualId', itemIndex) as number;
		const customCollectionId = this.getNodeParameter('customCollectionId', itemIndex) as number;
		let bodyData: any;

		if (inputMethod === 'json') {
			const jsonData = this.getNodeParameter('jsonData', itemIndex) as string;
			try {
				bodyData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
			} catch (error) {
				throw new NodeApiError(this.getNode(), error);
			}
		} else {
			const collectionName = this.getNodeParameter('collectionName', itemIndex) as string;
			const fields = this.getNodeParameter('fields', itemIndex) as string;
			let parsedFields: any;
			try {
				parsedFields = typeof fields === 'string' ? JSON.parse(fields) : fields;
			} catch (error) {
				throw new NodeApiError(this.getNode(), error);
			}

			bodyData = {
				name: collectionName,
				fields: parsedFields,
			};
		}

		try {
			const response = await virtuousCrmApiRequest.call(
				this,
				'POST',
				`/api/ContactIndividual/${contactIndividualId}/Collection/${customCollectionId}`,
				{},
				bodyData,
			);
			return response;
		} catch (error: any) {
			throw new NodeApiError(this.getNode(), error);
		}
	},
};
