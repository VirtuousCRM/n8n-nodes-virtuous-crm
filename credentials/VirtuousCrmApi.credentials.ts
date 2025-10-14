import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class VirtuousCrmApi implements ICredentialType {
	name = 'virtuousCrmApi';

	displayName = 'Virtuous CRM API';

	icon: Icon = { light: 'file:../icons/virtuous-logo-mark.svg', dark: 'file:../icons/virtuous-logo-mark.svg' };

	documentationUrl =
		'https://docs.virtuoussoftware.com/#authentication';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Your Virtuous CRM API Key',
			required: true
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials?.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://apidevlegacy.virtuoussoftware.com',
			url: '/api/Organization',
			method: 'GET',
		},
	};
}
