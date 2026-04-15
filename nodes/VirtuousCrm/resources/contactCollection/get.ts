import { NodeApiError, type IExecuteFunctions, type INodeProperties } from 'n8n-workflow';
import { virtuousCrmApiRequest } from '../../shared/crmTransport';

export const contactCollectionGetDescription = {
	description: {
		properties: [] as INodeProperties[],
	},

	async execute(this: IExecuteFunctions, itemIndex: number) {
		try {
			const response = await virtuousCrmApiRequest.call(
				this,
				'GET',
				'/api/Contact/CustomCollections',
				{},
				undefined,
			);
			return response;
		} catch (error: any) {
			throw new NodeApiError(this.getNode(), error);
		}
	},
};
