import { NodeApiError, type IExecuteFunctions, type INodeProperties } from 'n8n-workflow';
import { virtuousCrmApiRequest } from '../../shared/crmTransport';

export const contactIndividualCollectionGetDescription = {
	description: {
		properties: [] as INodeProperties[],
	},

	async execute(this: IExecuteFunctions, itemIndex: number) {
		try {
			const response = virtuousCrmApiRequest.call(
				this,
				'GET',
				'/api/ContactIndividual/CustomCollections',
				{},
				undefined,
			);
			return response;
		} catch (error: any) {
			throw new NodeApiError(this.getNode(), error);
		}
	},
};
