import { IDisplayOptions } from 'n8n-workflow';
import { IUnsortedProperties } from '../../interfaces';
import { addFilterDescription } from '../../_components/FilterDescription';
import { addDateRangeDescription } from '../../_components/DateRangeDescription';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['unsorted'],
		operation: ['summary'],
	},
};

export const description: IUnsortedProperties = [
	addFilterDescription(displayOptions, [
		{
			displayName: 'Unsorted UIDs',
			name: 'uid',
			type: 'string',
			default: '',
			description: 'Comma-separated list of unsorted UIDs to filter by',
		},
		addDateRangeDescription('Created At Range', 'created_at'),
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
];
