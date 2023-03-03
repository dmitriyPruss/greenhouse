import { PaginationFilter } from '../../interfaces/filters/pagination.filter';

type roleType = 'ADMIN' | 'READONLY';

export class AccessKeyFilter implements PaginationFilter {
	page?: number;
	pageSize?: number;
	role: roleType;
}
