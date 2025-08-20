import type { IExecuteFunctions, IRequestOptions } from 'n8n-workflow';

// Shared constants
export const VIRTUOUS_ICON = 'file:virtuous-logo-mark.svg';
export const MAX_RECORDS = 100000; // 100k record limit
export const BATCH_SIZE = 100; // Standard batch size for pagination

// Helper function to get base URL from credentials
export function getBaseUrlFromCredentials(credentials: any): string {
	const environment = credentials.environment as string;
	switch (environment) {
		case 'dev':
			return 'https://apidevlegacy.virtuoussoftware.com';
		case 'qa':
			return 'https://apiqa.virtuoussoftware.com';
		case 'prod':
			return 'https://api.virtuoussoftware.com';
		default:
			return 'https://apidevlegacy.virtuoussoftware.com';
	}
}

// Generic function to make authenticated API requests
export async function makeAuthenticatedRequest(
	context: IExecuteFunctions,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	url: string,
	body?: any
): Promise<any> {
	const requestOptions: IRequestOptions = {
		method,
		url,
		json: true,
	};

	if (body) {
		requestOptions.body = body;
	}

	return await context.helpers.requestWithAuthentication.call(
		context,
		'virtuousApi',
		requestOptions
	);
}

// Generic automatic pagination handler
export async function handleAutomaticPagination<T>(
	context: IExecuteFunctions,
	fetchFunction: (skip: number, take: number) => Promise<T[]>,
	batchSize: number = BATCH_SIZE,
	maxPages?: number
): Promise<T[]> {
	const allResults: T[] = [];
	let skip = 0;
	let hasMoreData = true;
	let pagesFetched = 0;
	const maxRecordsLimit = maxPages ? maxPages * batchSize : MAX_RECORDS;

	while (hasMoreData && allResults.length < maxRecordsLimit) {
		const response = await fetchFunction(skip, batchSize);

		if (Array.isArray(response) && response.length > 0) {
			// Check if adding these results would exceed the limit
			const remainingSlots = maxRecordsLimit - allResults.length;
			const resultsToAdd = response.slice(0, remainingSlots);
			allResults.push(...resultsToAdd);

			hasMoreData = response.length === batchSize && allResults.length < maxRecordsLimit;
			pagesFetched++;

			// Stop if we've reached max pages
			if (maxPages && pagesFetched >= maxPages) {
				hasMoreData = false;
			}
		} else {
			hasMoreData = false;
		}

		skip += batchSize;

		// Safety check to prevent infinite loops (fallback)
		if (skip > 50000) {
			break;
		}
	}

	return allResults;
}

// Helper to normalize response format (handles both arrays and single objects)
export function normalizeResponse(response: any): any[] {
	if (Array.isArray(response)) {
		return response;
	} else if (response && typeof response === 'object') {
		return [response];
	}
	return [];
}

// Helper to extract contacts from API response (handles wrapped responses)
export function extractContactsFromResponse(response: any): any[] {
	if (Array.isArray(response)) {
		return response;
	} else if (response && Array.isArray(response.list)) {
		return response.list;
	} else if (response && Array.isArray(response.contacts)) {
		return response.contacts;
	} else if (response && Array.isArray(response.data)) {
		return response.data;
	} else if (response && typeof response === 'object') {
		return [response];
	}
	return [];
}

// Helper to extract gifts from API response (handles wrapped responses)
export function extractGiftsFromResponse(response: any): any[] {
	if (Array.isArray(response)) {
		return response;
	} else if (response && Array.isArray(response.list)) {
		return response.list;
	} else if (response && Array.isArray(response.gifts)) {
		return response.gifts;
	} else if (response && Array.isArray(response.data)) {
		return response.data;
	} else if (response && typeof response === 'object') {
		return [response];
	}
	return [];
}

// Common pagination parameter structure
export const paginationOptions = [
	{
		name: 'Off',
		value: 'off',
		description: 'Return raw API response (one page only). Use when you want the original response structure or testing queries.',
	},
	{
		name: 'Automatic',
		value: 'automatic',
		description: 'Fetch ALL results and return each as individual workflow items. Perfect for iterating with other nodes.',
	},
	{
		name: 'Batched',
		value: 'batched',
		description: 'Fetch ALL results but group them into batches. Each batch becomes one workflow item with metadata.',
	},
	{
		name: 'Page by Page',
		value: 'pageByPage',
		description: 'Return exactly one page with navigation info. Use when you need precise control over pagination.',
	},
];

// Common take/skip parameter helpers
export function createTakeParameter(operation: string, paginationField: string) {
	return {
		displayName: 'Take',
		name: `${operation}TakePaginated`,
		type: 'number' as const,
		displayOptions: {
			show: {
				operation: [operation],
				[paginationField]: ['off', 'batched', 'pageByPage'],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: 50,
		description: 'Number of results per page',
	};
}

export function createSkipParameter(operation: string, paginationField: string) {
	return {
		displayName: 'Skip',
		name: `${operation}SkipPaginated`,
		type: 'number' as const,
		displayOptions: {
			show: {
				operation: [operation],
				[paginationField]: ['off', 'pageByPage'],
			},
		},
		typeOptions: {
			minValue: 0,
		},
		default: 0,
		description: 'Number of records to skip',
	};
}
