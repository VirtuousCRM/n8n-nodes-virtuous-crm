import { NodeApiError, type IExecuteFunctions, type INodeProperties } from 'n8n-workflow';
import { virtuousCrmApiRequest } from '../../shared/crmTransport';

export const contactCollectionUpdateDescription = {
	description: {
		properties: [
			{
				displayName: 'Input Method',
				name: 'inputMethod',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['contactCollection'],
						operation: ['updateContactCollection'],
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
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['contactCollection'],
						operation: ['updateContactCollection'],
					},
				},
				description: 'The contact identifier',
			},
			{
				displayName: 'Collection Instance ID',
				name: 'collectionInstanceId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['contactCollection'],
						operation: ['updateContactCollection'],
					},
				},
				description: 'The collection instance identifier',
			},
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'json',
				required: true,
				default: '[{"name": "", "value": ""}]',
				displayOptions: {
					show: {
						resource: ['contactCollection'],
						operation: ['updateContactCollection'],
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
    "fields": [
        {
            "name": "<string>",
            "value": "<string>"
        }
    ]
}`,
				displayOptions: {
					show: {
						resource: ['contactCollection'],
						operation: ['updateContactCollection'],
						inputMethod: ['json'],
					},
				},
				description: 'Complete JSON payload',
			},
		] as INodeProperties[],
	},

	async execute(this: IExecuteFunctions, itemIndex: number) {
		const inputMethod = this.getNodeParameter('inputMethod', itemIndex) as string;
		const contactId = this.getNodeParameter('contactId', itemIndex) as number;
		const collectionInstanceId = this.getNodeParameter('collectionInstanceId', itemIndex) as number;
		let bodyData: any;

		if (inputMethod === 'json') {
			const jsonData = this.getNodeParameter('jsonData', itemIndex) as string;
			try {
				bodyData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
			} catch (error) {
				throw new NodeApiError(this.getNode(), error);
			}
		} else {
			const fields = this.getNodeParameter('fields', itemIndex) as string;
			let parsedFields: any;
			try {
				parsedFields = typeof fields === 'string' ? JSON.parse(fields) : fields;
			} catch (error) {
				throw new NodeApiError(this.getNode(), error);
			}

			bodyData = {
				fields: parsedFields,
			};
		}

		try {
			const response = virtuousCrmApiRequest.call(
				this,
				'PUT',
				`/api/Contact/${contactId}/Collection/${collectionInstanceId}`,
				{},
				bodyData,
			);
			return response;
		} catch (error: any) {
			throw new NodeApiError(this.getNode(), error);
		}
	},
};
