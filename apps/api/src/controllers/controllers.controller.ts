import {
	Controller,
	Get,
	Query,
	UseGuards,
	Body,
	Req,
	Param,
	Post,
	Patch,
	Delete,
	ForbiddenException,
} from '@nestjs/common';
import { ControllerDto, ListWithTotals, ControllerFilter } from '@boilerplate/shared';
import { JwtAuthGuard } from '../services/guard/jwt.guard';
import { ControllersService } from '../services/controllers.service';
import { AccessesService } from '../services/accesses.service';

@Controller('controllers')
@UseGuards(JwtAuthGuard)
export class ControllersController {
	constructor(
		private readonly accessesService: AccessesService,
		private readonly controllersService: ControllersService
	) {}

	// READ
	@Get()
	public async findAll(@Query() filter: ControllerFilter, @Req() req: Request): Promise<ListWithTotals<ControllerDto>> {
		const userId = req['user'].id;

		return await this.controllersService.findAll(userId, filter);
	}

	@Get(':id')
	public async findOne(@Param('id') id: string): Promise<ControllerDto> {
		return (await this.controllersService.findById(id)) as any;
	}

	@Get('/keys/:id')
	public async findKeysForController(
		@Query() filter: ControllerFilter,
		@Param('id') id: string,
		@Req() req: Request
	): Promise<any> {
		const userId = req['user'].id;

		const { method } = req;

		const isAdmin = await this.accessesService.doesHaveAdminRights(userId, id, method);

		if (!isAdmin) {
			throw new ForbiddenException('You do not have administrator rights');
		}

		return (await this.controllersService.findKeys(id, filter)) as any;
	}

	@Get('/with_values/:id')
	public async findOneWithValues(@Param('id') id: string): Promise<ControllerDto> {
		return (await this.controllersService.findByIdWithValues(id)) as any;
	}

	@Get('/subscribe/:id')
	public async subscribe(@Param('id') id: string, @Query('hardwareCode') hardwareCode: any): Promise<boolean> {
		const isController = await this.controllersService.findByHardwareCode(id, hardwareCode);

		return isController ? true : false;
	}

	// CREATE
	@Post('/new_controller')
	public async createController(@Body() newControllerDto: ControllerDto, @Req() req: Request) {
		const controller = await this.controllersService.createController(newControllerDto);
		const user = req['user'];
		const userId = req['user'].id;

		await this.accessesService.setAdminAccess(userId, controller.id, controller, user);

		return {
			status: 'success',
			data: controller,
		};
	}

	@Post('/new_key')
	public async createKey(@Body() body: { id: string; role: string }) {
		return await this.controllersService.setNewKey(body);
	}

	// UPDATE
	@Patch(':id')
	public async updateController(@Param('id') id: string, @Req() req: Request, @Body() dto: ControllerDto) {
		const userId = req['user'].id;

		const { method } = req;

		const isAdmin = await this.accessesService.doesHaveAdminRights(userId, id, method);

		if (!isAdmin) {
			throw new ForbiddenException('You do not have administrator rights');
		}

		return await this.controllersService.updateController(id, dto);
	}

	@Patch('/deactivate/:id')
	public async deactivateKey(@Param('id') id: string, @Body() deactivatedValue: { deactivated: boolean }) {
		const { deactivated } = deactivatedValue;

		return await this.controllersService.deactivate(id, deactivated);
	}

	// DELETE
	@Delete(':id')
	public async deleteController(@Param('id') id: string, @Req() req: Request) {
		const userId = req['user'].id;

		const { method } = req;

		const isAdmin = await this.accessesService.doesHaveAdminRights(userId, id, method);

		if (!isAdmin) {
			throw new ForbiddenException('You do not have administrator rights');
		}

		await this.controllersService.deleteController(id);
	}
}
