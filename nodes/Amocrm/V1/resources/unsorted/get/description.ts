import { IDisplayOptions } from 'n8n-workflow';
import { IUnsortedProperties } from '../../interfaces';
import { addFilterDescription } from '../../_components/FilterDescription';
import { addLimitDescription } from '../../_components/LimitDescription';
import { addPageDescription } from '../../_components/PageDescription';
import { addReturnAll } from '../../_components/ReturnAllDescription';
import { addSortDescription } from '../../_components/SortDescription';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['unsorted'],
		operation: ['get'],
	},
};

export const description: IUnsortedProperties = [
	addReturnAll(displayOptions),
	addFilterDescription(displayOptions, [
		{
			displayName: 'Unsorted UIDs',
			name: 'uid',
			type: 'string',
			default: '',
			description: 'Comma-separated list of unsorted UIDs to filter by',
		},
		{
			displayName: 'Categories',
			name: 'category',
			type: 'multiOptions',
			default: [],
			options: [
				{
					name: 'Call (SIP)',
					value: 'sip',
				},
				{
					name: 'Chat',
					value: 'chats',
				},
				{
					name: 'Form',
					value: 'forms',
				},
				{
					name: 'Mail',
					value: 'mail',
				},
			],
			description: 'Select categories to include in the response',
		},
		{
			displayName: 'Pipeline Names or IDs',
			name: 'pipeline_id',
			type: 'multiOptions',
			default: [],
			typeOptions: {
				loadOptionsMethod: 'getPipelines',
			},
			description:
				'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
			noDataExpression: true,
		},
	]),
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions,
		options: [
			addSortDescription(undefined, [
				{
					name: 'Created At',
					value: 'created_at',
				},
				{
					name: 'Updated At',
					value: 'updated_at',
				},
			]),
		],
	},
	addPageDescription({
		show: {
			...displayOptions.show,
			returnAll: [false],
		},
	}),
	addLimitDescription(displayOptions),
];
