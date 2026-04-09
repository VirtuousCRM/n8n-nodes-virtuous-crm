import { NodeApiError, type IExecuteFunctions, type INodeProperties } from 'n8n-workflow';
import { virtuousCrmApiRequest } from '../../shared/crmTransport';

export const contactIndividualFindByEmailDescription = {
	description: {
		properties: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'name@email.com',
				displayOptions: {
					show: {
						resource: ['contactIndividual'],
						operation: ['findIndividualByEmail'],
					},
				},
				description: 'The email address to search for',
			},
		] as INodeProperties[],
	},

	async execute(this: IExecuteFunctions, itemIndex: number) {
		const email = this.getNodeParameter('email', itemIndex) as string;

		try {
			const response = virtuousCrmApiRequest.call(
				this,
				'GET',
				'/api/ContactIndividual/Find',
				{ email },
				undefined,
			);
			return response;
		} catch (error: any) {
			throw new NodeApiError(this.getNode(), error);
		}
	},
};
