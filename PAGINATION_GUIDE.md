# Virtuous API Pagination Guide

This guide explains the pagination options available in the Virtuous n8n nodes and when to use each mode.

## Pagination Modes

### Off
- **Use Case**: Testing queries, working with small datasets, or when you want the raw API response
- **Behavior**: Returns only one page of results exactly as the API provides them
- **Output**: Original API response structure with metadata
- **Best For**: Development, debugging, or when you need the exact API format

### Automatic (All Results)
- **Use Case**: Iterating through contacts/gifts with other nodes (e.g., getting gifts for each contact)
- **Behavior**: Fetches ALL results across all pages and returns each record as a separate workflow item
- **Output**: Individual records, perfect for connecting to other nodes
- **Best For**: Workflow automation where you need to process each record individually
- **Example**: Get all contacts → Get gifts for each contact

### Automatic (Batched)
- **Use Case**: Processing large datasets in manageable chunks while still getting everything
- **Behavior**: Fetches ALL results but groups them into batches based on your batch size setting
- **Output**: Batches of records with metadata (batch number, total batches, etc.)
- **Best For**: Bulk operations, data migration, or when you need all data but want to process it in chunks
- **Parameters**: 
  - Batch Size: Number of records per batch (each batch = one workflow item)
  - Internal Batch Size: API call efficiency (how many records per API request)

### Page by Page
- **Use Case**: Building custom pagination flows or when you need precise control
- **Behavior**: Returns exactly one page with detailed pagination metadata
- **Output**: One page of results plus navigation info (current page, next page info, etc.)
- **Best For**: Custom pagination logic, UI pagination, or memory-constrained environments
- **Parameters**:
  - Skip: Starting record number (0 for first page, 50 for second if page size is 50)
  - Take: Records per page (max 500)

## Parameter Quick Reference

### For Automatic Modes:
- **Internal Batch Size** (10-500, default 100): Controls API efficiency. Higher = faster but more memory.
- **Max Pages** (1-100, default 10): Safety limit to prevent runaway pagination. Increase for large datasets.

### For Batched Mode:
- **Batch Size** (1-1000, default 50): How many records per workflow item. Smaller = more granular, larger = more efficient.

### For Page by Page:
- **Skip** (0+): Starting point. Use skip = page_number * page_size for traditional pagination.
- **Take** (1-500): Records per page. API maximum is 500.

## Common Workflows

### Iterate Through All Contacts
```
Search Contacts (Automatic) → Get Gifts by Contact → Process Each Gift
```

### Bulk Data Export
```
Search Contacts (Batched, batch size 100) → Process Each Batch → Export to Database
```

### Memory-Efficient Processing
```
Search Contacts (Page by Page) → Process Page → Conditionally Get Next Page
```

### Quick Testing
```
Search Contacts (Off, take 10) → Review Results → Refine Query
```

## Tips

1. **Start with "Off" mode** when developing to see the raw API response
2. **Use "Automatic" mode** when you need to iterate with other nodes
3. **Use "Batched" mode** for large datasets that need bulk processing
4. **Use "Page by Page"** only when you need custom pagination control
5. **Increase Max Pages** if you expect more than 1000 records (10 pages × 100 per page)
6. **Adjust Internal Batch Size** based on your API rate limits and memory constraints
