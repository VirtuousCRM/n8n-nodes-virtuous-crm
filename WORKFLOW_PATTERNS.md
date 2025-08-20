# n8n Workflow Patterns for Virtuous Nodes

## Iterating Through Contact Results

One of the most common workflows is to search for contacts and then perform operations on each contact (like getting their gifts). Here's how to set this up:

### Pattern 1: Contact Search → Gift Query

1. **Contact Node (Search Contacts)**
   - Operation: "Search Contacts"
   - Configure your search filters
   - Set pagination mode based on your needs:
     - "Automatic" - returns each contact as individual items (recommended for this pattern)
     - "Off" - returns one page of results

2. **Gift Node (Get by Contact)**
   - Operation: "Get by Contact"
   - Contact ID: Use the expression `{{ $json.Id || $json.id }}` (this is the default)
   - This will automatically pull the contact ID from each contact record
   
   **Note**: The expression `{{ $json.Id || $json.id }}` handles both common ID field formats:
   - `Id` (Pascal case - common in .NET APIs like Virtuous)
   - `id` (lowercase - common in REST APIs)

### How It Works

When you connect the Contact node to the Gift node:
- Contact node searches and returns multiple contacts
- **Enhanced response handling** automatically extracts contacts from wrapped API responses like `{ "list": [...] }`
- n8n automatically runs the Gift node once for each contact
- The expression `{{ $json.Id || $json.id }}` pulls the contact ID from each contact record
- Gift node queries gifts for that specific contact

### Example Setup

**Contact Node:**
```
Operation: Search Contacts
Filters: 
  - Last Name: Contains "Smith"
Pagination: Automatic
```

**Gift Node:**
```
Operation: Get by Contact
Contact ID: {{ $json.Id || $json.id }}
```

### Response Format Handling

The nodes now automatically handle different API response formats:

**Direct Array Response:**
```json
[
  { "Id": 123, "name": "Contact 1" },
  { "Id": 456, "name": "Contact 2" }
]
```

**Wrapped Response:**
```json
{
  "list": [
    { "Id": 123, "name": "Contact 1" },
    { "Id": 456, "name": "Contact 2" }
  ],
  "totalCount": 2
}
```

Both formats are automatically handled and the contacts are extracted for iteration.

### Example Setup

**Contact Node:**
```
Operation: Search Contacts
Filters: 
  - Last Name: Contains "Smith"
Pagination: Automatic
```

**Gift Node:**
```
Operation: Get by Contact
Contact ID: {{ $json.id }}
```

### Pattern 2: Contact Search → Multiple Operations

You can also use this pattern for multiple operations on each contact:

Contact Search → Split In Batches → [Gift Query, Contact Update, etc.]

### Pattern 3: Using Custom Contact ID Fields

If your contact data has a different ID field structure, you can adjust the expression:
- `{{ $json.contactId }}` - if the field is named contactId
- `{{ $json.Contact.Id }}` - if nested in a Contact object
- `{{ $json["Contact Id"] }}` - if the field name has spaces

### Pattern 4: Filtering Results

You can also add conditions in the Gift node:
```
Contact ID: {{ $json.id }}
Filters:
  - Gift Date From: 2024-01-01
  - Minimum Amount: 100
```

## Tips

1. **Use Expression Editor**: Click the expression icon (fx) next to input fields to see available data from previous nodes
2. **Check Data Structure**: Use a "Edit Fields" or "Set" node to inspect the structure of your contact data
3. **Handle Empty Results**: Enable "Continue on Fail" if some contacts might not have gifts
4. **Batch Processing**: For large datasets, use "automaticBatched" pagination in the contact search

## Troubleshooting

- **"Invalid contact ID" error**: Check that your expression is pulling a valid number
- **No results**: Verify the contact ID field name matches your data structure
- **Too many results**: Consider adding filters or using pagination
