import { IDataObject, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

interface IOptionsUi {
	userId?: number | string;
	contactId?: number | string;
}

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const requestMethod = 'POST';
	const uid = this.getNodeParameter('uid', 0) as string;
	const entityType = this.getNodeParameter('entityType', 0) as string;
	const entityId = this.getNodeParameter('entityId', 0) as number;
	const options = (this.getNodeParameter('options', 0, {}) as IOptionsUi) || {};
	const endpoint = `leads/unsorted/${uid}/link`;

	const linkPayload: IDataObject = {
		entity_id: entityId,
		entity_type: entityType,
	};

	if (options.contactId !== undefined && options.contactId !== 0 && options.contactId !== '') {
		linkPayload.metadata = {
			contact_id: Number(options.contactId),
		};
	}

	const body: IDataObject = {
		link: linkPayload,
	};

	if (options.userId !== undefined && options.userId !== '') {
		body.user_id = Number(options.userId);
	}

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(responseData);
}
