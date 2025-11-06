import { IDataObject, INodeExecutionData, IExecuteFunctions, NodeOperationError } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const requestMethod = 'POST';
	const type = this.getNodeParameter('type', 0) as string;
	const endpoint = `leads/unsorted/${type}`;

	const rawPayload = this.getNodeParameter('payloadJson', 0) as
		| string
		| IDataObject
		| IDataObject[];

	let body: IDataObject | IDataObject[];

	if (typeof rawPayload === 'string') {
		try {
			body = JSON.parse(rawPayload) as IDataObject | IDataObject[];
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Payload (JSON) must be valid JSON');
		}
	} else {
		body = rawPayload;
	}

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(responseData);
}
