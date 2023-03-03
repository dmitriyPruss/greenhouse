import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { PaginationFilter, ListWithTotals } from '@boilerplate/shared';
import { getLimitOptionFromFilter, getOffsetOptionFromFilter } from './base-filters-extensions';

declare module 'typeorm/query-builder/SelectQueryBuilder' {
	interface SelectQueryBuilder<Entity> {
		getManyWithTotals(
			this: SelectQueryBuilder<Entity>,
			filter: PaginationFilter,
			disableTotalsCalculation?: boolean
		): Promise<ListWithTotals<Entity>>;
	}
}

SelectQueryBuilder.prototype.getManyWithTotals = async function <Entity>(
	this: SelectQueryBuilder<Entity>,
	filter: PaginationFilter,
	disableTotalsCalculation = false
): Promise<ListWithTotals<Entity>> {
	const currentLimit = getLimitOptionFromFilter(filter);
	const currentOffset = getOffsetOptionFromFilter(filter);

	const totalCountReq = disableTotalsCalculation ? null : this.getCount();

	const currentPageReq = this.limit(currentLimit).offset(currentOffset).getMany();

	const [totalCount, currentPage] = await Promise.all([totalCountReq, currentPageReq]);

	return {
		list: currentPage,

		limit: currentLimit,
		offset: currentOffset,
		total: totalCount,
	};
};
