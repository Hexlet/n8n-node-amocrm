import { IDataObject, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { apiRequest, apiRequestAllItems } from '../../../transport';
import { stringToArray } from '../../../helpers/stringToArray';

interface IFilterUi {
	uid?: string;
	category?: string[];
	pipeline_id?: Array<number | string>;
}

interface IOptionsUi {
	sort?: {
		sortSettings?: {
			sort_by: string;
			sort_order: string;
		};
	};
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

	if (filter.category?.length) {
		filterPayload.category = filter.category;
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

	const options = (this.getNodeParameter('options', 0, {}) as IOptionsUi) || {};
	const sortSettings = options.sort?.sortSettings;

	if (sortSettings?.sort_by && sortSettings?.sort_order) {
		qs.order = {
			[sortSettings.sort_by]: sortSettings.sort_order,
		};
	}

	const returnAll = this.getNodeParameter('returnAll', 0) as boolean;

	if (!returnAll) {
		const page = this.getNodeParameter('page', 0) as number;
		qs.page = page;
	}
	const limit = this.getNodeParameter('limit', 0) as number;
	qs.limit = limit;

	const requestMethod = 'GET';
	const endpoint = `leads/unsorted`;

	if (returnAll) {
		const responseData = await apiRequestAllItems.call(this, requestMethod, endpoint, body, qs);
		return this.helpers.returnJsonArray(responseData);
	}

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);
	return this.helpers.returnJsonArray(responseData);
}
