import { INodeProperties } from 'n8n-workflow';

import * as get from './get';
import * as create from './create';
import * as accept from './accept';
import * as link from './link';
import * as reject from './reject';
import * as summary from './summary';

export { get, create, accept, link, reject, summary };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['unsorted'],
			},
		},
		options: [
			{
				name: 'Accept Unsorted',
				value: 'accept',
				description: 'Accept an unsorted item by UID',
				action: 'Accept unsorted item',
			},
			{
				name: 'Create Unsorted',
				value: 'create',
				description: 'Create unsorted items',
				action: 'Create unsorted items',
			},
			{
				name: 'Get Unsorted List',
				value: 'get',
				description: 'List unsorted items',
				action: 'Get unsorted list',
			},
			{
				name: 'Get Unsorted Summary',
				value: 'summary',
				description: 'Get aggregated information about unsorted items',
				action: 'Get unsorted summary',
			},
			{
				name: 'Link Unsorted',
				value: 'link',
				description: 'Link an unsorted item to an existing entity',
				action: 'Link unsorted item',
			},
			{
				name: 'Reject Unsorted',
				value: 'reject',
				description: 'Reject an unsorted item by UID',
				action: 'Reject unsorted item',
			},
		],
		default: 'get',
	},
	...get.description,
	...create.description,
	...accept.description,
	...link.description,
	...reject.description,
	...summary.description,
];
