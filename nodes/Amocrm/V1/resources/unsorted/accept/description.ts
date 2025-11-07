import { IDisplayOptions } from 'n8n-workflow';
import { IUnsortedProperties } from '../../interfaces';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['unsorted'],
		operation: ['accept'],
	},
};

export const description: IUnsortedProperties = [
	{
		displayName: 'Unsorted UID',
		name: 'uid',
		type: 'string',
		required: true,
		default: '',
		description: 'UID of the unsorted item to accept',
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
				displayName: 'Status Name or ID',
				name: 'statusId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getStatusesWithoutUnsorted',
				},
				default: '',
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
			},
		],
	},
];
