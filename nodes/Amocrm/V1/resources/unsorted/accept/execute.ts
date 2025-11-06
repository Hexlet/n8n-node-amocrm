import { IDataObject, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

interface IOptionsUi {
	userId?: number | string;
	statusId?: number | string;
}

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const requestMethod = 'POST';
	const uid = this.getNodeParameter('uid', 0) as string;
	const options = (this.getNodeParameter('options', 0, {}) as IOptionsUi) || {};
	const endpoint = `leads/unsorted/${uid}/accept`;

	const body: IDataObject = {};

	if (options.userId !== undefined && options.userId !== '') {
		body.user_id = Number(options.userId);
	}

	if (options.statusId !== undefined && options.statusId !== '') {
		body.status_id = Number(options.statusId);
	}

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(responseData);
}
