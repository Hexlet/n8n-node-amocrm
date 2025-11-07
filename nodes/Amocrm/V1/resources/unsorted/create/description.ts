import { IDisplayOptions } from 'n8n-workflow';
import { IUnsortedProperties } from '../../interfaces';

const displayOptions: IDisplayOptions | undefined = {
	show: {
		resource: ['unsorted'],
		operation: ['create'],
	},
};

export const description: IUnsortedProperties = [
	{
		displayName: 'Unsorted Type',
		name: 'type',
		type: 'options',
		options: [
			{
				name: 'Call (SIP)',
				value: 'sip',
			},
			{
				name: 'Form',
				value: 'forms',
			},
		],
		default: 'sip',
		description: 'Select the source category for the unsorted item',
		displayOptions,
	},
	{
		displayName: 'Payload (JSON)',
		name: 'payloadJson',
		type: 'string',
		typeOptions: {
			rows: 8,
		},
		default:
			'[{"source_name":"","source_uid":"","pipeline_id":0,"metadata":{},"_embedded":{"leads":[],"contacts":[]}}]',
		description:
			'Provide an array of unsorted items in JSON format as described in the <a href="https://www.amocrm.ru/developers/content/crm_platform/unsorted-api" target="_blank">AmoCRM documentation</a>',
		displayOptions,
	},
];
