import { NodeApiError, type IExecuteFunctions, type INodeProperties } from 'n8n-workflow';
import { virtuousCrmApiRequest } from '../../shared/crmTransport';

export const contactIndividualGetByIdDescription = {
	description: {
		properties: [
			{
				displayName: 'Contact Individual ID',
				name: 'contactIndividualId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['contactIndividual'],
						operation: ['getContactIndividualById'],
					},
				},
				description: 'The contact individual identifier',
			},
		] as INodeProperties[],
	},

	async execute(this: IExecuteFunctions, itemIndex: number) {
		const contactIndividualId = this.getNodeParameter('contactIndividualId', itemIndex) as number;

		try {
			const response = await virtuousCrmApiRequest.call(
				this,
				'GET',
				`/api/ContactIndividual/${contactIndividualId}`,
				{},
				undefined,
			);
			return response;
		} catch (error: any) {
			throw new NodeApiError(this.getNode(), error);
		}
	},
};
