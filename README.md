![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-virtuous-crm

This is an n8n community node. It lets you use the [Virtuous CRM API](https://docs.virtuoussoftware.com/) in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)  
- [Operations](#operations)  
- [Credentials](#credentials)
- [Compatibility](#compatibility)  
- [Usage](#usage)
- [Resources](#resources) 

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Contact
- [Create Contact Transaction](https://docs.virtuoussoftware.com/#0b27a920-243c-4f02-a5c3-6e522b926431)
- [Get Contact](https://docs.virtuoussoftware.com/#118355eb-8028-4751-b5ab-151ff0aa2b22) - Retrieve a contact by ID
- [Get Contact by Reference](https://docs.virtuoussoftware.com/#0188f30c-9404-4767-a1db-8851250cf6d9) - Retrieve a contact by reference source and ID

### Contact Individual
- [Get Individual](https://docs.virtuoussoftware.com/#18393359-fb21-49ba-aa6c-cd3421d2a01c) - Retrieve an individual by ID
- [Get Individuals for Contact](https://docs.virtuoussoftware.com/#adfa974c-6135-4203-b456-84ffd66b2ccf) - Retrieve all individuals for a contact
- [Find Individual by Email](https://docs.virtuoussoftware.com/#ba6fb21c-071d-4993-85b0-4777a23d14dd) - Find an individual by email address

### Contact Collection
- [Get Custom Collections for Contacts](https://docs.virtuoussoftware.com/#a1699247-3c3d-4c8e-8348-b97f9134697b) - Retrieve available custom collections
- [Create Collection for Contact](https://docs.virtuoussoftware.com/#028b8b0d-62ae-4427-8b41-7edfe207aa0f) - Create a collection instance for a contact
- [Update Collection for Contact](https://docs.virtuoussoftware.com/#2ee0875f-ab44-417a-88d5-7ae7e400cd45) - Update a collection instance for a contact

### Contact Individual Collection
- [Get Custom Collections for Individuals](https://docs.virtuoussoftware.com/#494e2a6b-50bb-486c-84b4-cc4690a5b18e) - Retrieve available custom collections
- [Create Collection for Individual](https://docs.virtuoussoftware.com/#7a72740b-e1ae-4107-b04b-9d14cd8a8f49) - Create a collection instance for an individual
- [Update Collection for Individual](https://docs.virtuoussoftware.com/#7a767d99-2c37-4eec-9ee8-bf340d220f07) - Update a collection instance for an individual

### Gift
- [Create Gift Transaction](https://docs.virtuoussoftware.com/#e4a6a1e3-71a4-44f9-bd7c-9466996befac)

## Credentials

An API Key is required to interact with the Virtuous node. Refer to the documentation for API Keys [here](https://docs.virtuoussoftware.com/#authentication)

## Compatibility

Tested locally against n8n 1.115.3

## Usage

The node supports creating Contact and Gift Transactions, retrieving contacts and individuals, and managing custom collections for contacts and individuals. Transaction creation is asynchronous and requires user input on CRM+, so responses will be limited only to headers and status codes. See resources for more information.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Virtuous CRM API Documentation](https://docs.virtuoussoftware.com/)
* [Gifts Integration Best Practices](https://support.virtuous.org/hc/en-us/articles/21329138310285-Gifts-Integration-Best-Practices)
* [Contacts Integration Best Practices](https://support.virtuous.org/hc/en-us/articles/21152926831501-Contacts-Integration-Best-Practices)
