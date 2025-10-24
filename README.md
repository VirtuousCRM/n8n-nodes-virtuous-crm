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

This node presently supports operations to create Contact and Gift Transactions:
- [Create Contact Transaction](https://docs.virtuoussoftware.com/#0b27a920-243c-4f02-a5c3-6e522b926431)
- [Create Gift Transaction](https://docs.virtuoussoftware.com/#e4a6a1e3-71a4-44f9-bd7c-9466996befac)

## Credentials

An API Key is required to interact with the Virtuous node. Refer to the documentation for API Keys [here](https://docs.virtuoussoftware.com/#authentication)

## Compatibility

Tested locally against n8n 1.115.3

## Usage

The Contact and Gift Transactions allow users to send data to Virtuous CRM+ to create or update Contacts or Gifts. The creation of records is asynchronous and requires user input on CRM+, so responses will be limited only to headers and status codes. See resources for more information

[Gifts Integration Best Practices](https://support.virtuous.org/hc/en-us/articles/21329138310285-Gifts-Integration-Best-Practices)
[Contacts Integration Best Practices](https://support.virtuous.org/hc/en-us/articles/21152926831501-Contacts-Integration-Best-Practices)

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Virtuous CRM Api Documentation](https://docs.virtuoussoftware.com/)
