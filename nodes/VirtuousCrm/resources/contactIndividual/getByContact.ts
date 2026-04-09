import { NodeApiError, type IExecuteFunctions, type INodeProperties } from 'n8n-workflow';
import { virtuousCrmApiRequest } from '../../shared/crmTransport';

export const contactIndividualGetByContactDescription = {
	description: {
		properties: [
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['contactIndividual'],
						operation: ['getIndividualsByContact'],
					},
				},
				description: 'The contact identifier',
			},
		] as INodeProperties[],
	},

	async execute(this: IExecuteFunctions, itemIndex: number) {
		const contactId = this.getNodeParameter('contactId', itemIndex) as number;

		try {
			const response = virtuousCrmApiRequest.call(
				this,
				'GET',
				`/api/ContactIndividual/ByContact/${contactId}`,
				{},
				undefined,
			);
			return response;
		} catch (error: any) {
			throw new NodeApiError(this.getNode(), error);
		}
	},
};
