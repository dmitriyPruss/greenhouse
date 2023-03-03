import { OrderParamPair } from '../../interfaces/filters/order-param-pair';
import { OrderFilter } from '../../interfaces/filters/order.filter';
import { PaginationFilter } from '../../interfaces/filters/pagination.filter';
import { ControllerDto } from '../dto/controller.dto';

export class ControllerFilter implements PaginationFilter, OrderFilter<ControllerDto> {
	orderedBy?: OrderParamPair<ControllerDto>[] | null;

	page?: number;
	pageSize?: number;
	search?: string;
}
