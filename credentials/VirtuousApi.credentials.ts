import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class VirtuousApi implements ICredentialType {
	name = 'virtuousApi';
	displayName = 'Virtuous API';
	documentationUrl = 'https://docs.virtuoussoftware.com/';
	icon = 'file:virtuous-logo-mark.svg' as const;
	properties: INodeProperties[] = [
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{
					name: 'Development',
					value: 'dev',
					description: 'Development environment (apidevlegacy.virtuoussoftware.com)',
				},
				{
					name: 'QA',
					value: 'qa',
					description: 'QA environment (apiqa.virtuoussoftware.com)',
				},
			],
			default: 'dev',
			description: 'Select the Virtuous API environment to connect to',
			required: true,
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Your Virtuous API key for the selected environment',
			required: true,
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	// Authentication for Virtuous API using Bearer token
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}'
			},
		},
	};

	// Test the credentials by making a request to the API
	test: ICredentialTestRequest = {
		request: {
			// Use expression to dynamically select base URL based on environment
			baseURL: '={{$credentials.environment === "qa" ? "https://apiqa.virtuoussoftware.com" : "https://apidevlegacy.virtuoussoftware.com"}}',
			url: '/api/Organization',
			method: 'GET',
		},
	};
}
