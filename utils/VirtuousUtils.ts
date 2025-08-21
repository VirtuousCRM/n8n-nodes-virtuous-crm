import type { IExecuteFunctions } from 'n8n-workflow';

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

// Shared pagination options for all Virtuous nodes
export const PAGINATION_OPTIONS = [
	{
		name: 'Off',
		value: 'off',
		description: 'Return raw API response (one page only). Use when you want the original response structure or are testing queries.',
	},
	{
		name: 'Automatic (All Results)',
		value: 'automatic',
		description: 'Fetch ALL results and return each as individual workflow items. Perfect for iterating with other nodes.',
	},
	{
		name: 'Automatic (Batched)',
		value: 'automaticBatched',
		description: 'Fetch ALL results but group them into batches. Each batch becomes one workflow item with metadata. Good for bulk processing.',
	},
	{
		name: 'Page by Page',
		value: 'pageByPage',
		description: 'Return exactly one page with navigation info. Use when you need precise control over pagination or are building custom pagination flows.',
	},
];

// Helper to create batch size parameter for pagination
export function createBatchSizeParameter() {
	return {
		displayName: 'Batch Size',
		name: 'batchSize',
		type: 'number' as const,
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: 50,
		description: 'Number of results per batch (each batch becomes one workflow item). Use smaller values for more granular processing, larger for efficiency.',
		displayOptions: {
			show: {
				paginationMode: ['automaticBatched'],
			},
		},
	};
}

// Helper to create internal batch size parameter for pagination
export function createInternalBatchSizeParameter() {
	return {
		displayName: 'Internal Batch Size',
		name: 'internalBatchSize',
		type: 'number' as const,
		typeOptions: {
			minValue: 10,
			maxValue: 500,
		},
		default: 100,
		description: 'Number of records to fetch per API call (larger = faster but more memory)',
		displayOptions: {
			show: {
				paginationMode: ['automatic', 'automaticBatched'],
			},
		},
	};
}

// Helper to create max pages parameter for pagination
export function createMaxPagesParameter() {
	return {
		displayName: 'Max Pages',
		name: 'maxPages',
		type: 'number' as const,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 10,
		description: 'Safety limit for automatic pagination. Set higher if you expect large datasets, lower to prevent timeouts.',
		displayOptions: {
			show: {
				paginationMode: ['automatic', 'automaticBatched'],
			},
		},
	};
}

// Helper to create pagination mode parameter
export function createPaginationModeParameter(entityType: string = 'results') {
	const descriptions = {
		contacts: 'Fetch ALL contacts and return each as individual workflow items. Perfect for iterating with other nodes (e.g., Gift queries per contact).',
		gifts: 'Fetch ALL gifts and return each as individual workflow items. Perfect for iterating with other nodes.',
		results: 'Fetch ALL results and return each as individual workflow items. Perfect for iterating with other nodes.',
	};

	const batchedDescriptions = {
		contacts: 'Fetch ALL contacts but group them into batches. Each batch becomes one workflow item with metadata. Good for bulk processing.',
		gifts: 'Fetch ALL gifts but group them into batches. Each batch becomes one workflow item with metadata. Good for bulk processing.',
		results: 'Fetch ALL results but group them into batches. Each batch becomes one workflow item with metadata. Good for bulk processing.',
	};

	return {
		displayName: 'Pagination Mode',
		name: 'paginationMode',
		type: 'options' as const,
		options: [
			{
				name: 'Off',
				value: 'off',
				description: 'Return raw API response (one page only per input). Use when you want the original response structure or are testing queries.',
			},
			{
				name: 'Automatic (All Results)',
				value: 'automatic',
				description: descriptions[entityType as keyof typeof descriptions] || descriptions.results,
			},
			{
				name: 'Automatic (Batched)',
				value: 'automaticBatched',
				description: batchedDescriptions[entityType as keyof typeof batchedDescriptions] || batchedDescriptions.results,
			},
			{
				name: 'Page by Page',
				value: 'pageByPage',
				description: 'Return exactly one page with navigation info per input. Use when you need precise control over pagination or are building custom pagination flows.',
			},
		],
		default: 'off',
		description: 'Choose how to handle large result sets. "Automatic" is best for iterating with other nodes.',
	};
}

// Helper to create skip parameter for pagination
export function createSkipParameter(showModes: string[] = ['pageByPage']) {
	return {
		displayName: 'Skip (Starting Point)',
		name: 'skip',
		type: 'number' as const,
		typeOptions: {
			minValue: 0,
		},
		default: 0,
		description: 'Number of records to skip. Use 0 for first page, 50 for second (if page size=50), etc.',
		displayOptions: {
			show: {
				paginationMode: showModes,
			},
		},
	};
}

// Helper to create take parameter for pagination
export function createTakeParameter(showModes: string[] = ['off', 'pageByPage'], customDescription?: string) {
	return {
		displayName: 'Take (Page Size)',
		name: 'take',
		type: 'number' as const,
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: 50,
		description: customDescription || 'Number of results to return per page. Note: When processing multiple input items, this limit applies to EACH input item separately.',
		displayOptions: {
			show: {
				paginationMode: showModes,
			},
		},
	};
}
