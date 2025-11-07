import { IDisplayOptions } from 'n8n-workflow';
import { IUnsortedProperties } from '../../interfaces';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['unsorted'],
		operation: ['link'],
	},
};

export const description: IUnsortedProperties = [
	{
		displayName: 'Unsorted UID',
		name: 'uid',
		type: 'string',
		required: true,
		default: '',
		description: 'UID of the unsorted item to link',
		displayOptions,
	},
	{
		displayName: 'Entity Type',
		name: 'entityType',
		type: 'options',
		options: [
			{
				name: 'Lead',
				value: 'leads',
			},
			{
				name: 'Customer',
				value: 'customers',
			},
		],
		default: 'leads',
		required: true,
		displayOptions,
	},
	{
		displayName: 'Entity ID',
		name: 'entityId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions,
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions,
		options: [
			{
				displayName: 'User Name or ID',
				name: 'userId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getActiveUsers',
				},
				default: '',
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'number',
				default: 0,
				description: 'ID of the contact to link along with the unsorted item',
			},
		],
	},
];
