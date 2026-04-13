import { NodeApiError, type IExecuteFunctions, type INodeProperties } from 'n8n-workflow';
import { virtuousCrmApiRequest } from '../../shared/crmTransport';

export const contactGetByReferenceDescription = {
	description: {
		properties: [
			{
				displayName: 'Reference Source',
				name: 'referenceSource',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['getContactByReference'],
					},
				},
				description: 'The source system for the reference (e.g. external CRM name)',
			},
			{
				displayName: 'Reference ID',
				name: 'referenceId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['getContactByReference'],
					},
				},
				description: 'The reference identifier',
			},
		] as INodeProperties[],
	},

	async execute(this: IExecuteFunctions, itemIndex: number) {
		const referenceSource = this.getNodeParameter('referenceSource', itemIndex) as string;
		const referenceId = this.getNodeParameter('referenceId', itemIndex) as string;

		try {
			const response = virtuousCrmApiRequest.call(
				this,
				'GET',
				`/api/Contact/${encodeURIComponent(referenceSource)}/${encodeURIComponent(referenceId)}`,
				{},
				undefined,
			);
			return response;
		} catch (error: any) {
			throw new NodeApiError(this.getNode(), error);
		}
	},
};
