import { IDataObject, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../../transport';
import { makeRangeProperty } from '../../_components/DateRangeDescription';
import { IStringRange } from '../../../Interface';
import { stringToArray } from '../../../helpers/stringToArray';

interface IFilterUi {
	uid?: string;
	created_at?: {
		dateRangeCustomProperties?: IStringRange;
	};
	pipeline_id?: Array<number | string>;
}

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const body = {} as IDataObject;
	const qs = {} as IDataObject;

	const filter = (this.getNodeParameter('filter', 0, {}) as IFilterUi) || {};

	const filterPayload: IDataObject = {};

	const uids = stringToArray(filter.uid);
	if (uids.length === 1) {
		[filterPayload.uid] = uids;
	} else if (uids.length) {
		filterPayload.uid = uids;
	}

	const createdAtRange = makeRangeProperty(filter.created_at?.dateRangeCustomProperties);
	if (createdAtRange) {
		filterPayload.created_at = createdAtRange;
	}

	if (filter.pipeline_id?.length) {
		const pipelineIds = filter.pipeline_id
			.map((value) => Number(value))
			.filter((value) => !Number.isNaN(value));
		if (pipelineIds.length === 1) {
			[filterPayload.pipeline_id] = pipelineIds;
		} else if (pipelineIds.length) {
			filterPayload.pipeline_id = pipelineIds;
		}
	}

	if (Object.keys(filterPayload).length) {
		qs.filter = filterPayload;
	}

	const requestMethod = 'GET';
	const endpoint = `leads/unsorted/summary`;

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);
	return this.helpers.returnJsonArray(responseData);
}
