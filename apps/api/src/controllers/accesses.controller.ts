import { Controller, UseGuards, Body, Req, Post, NotFoundException } from '@nestjs/common';
import { KeyDto } from '@boilerplate/shared';
import { JwtAuthGuard } from '../services/guard/jwt.guard';
import { AccessesService } from '../services/accesses.service';

@Controller('accesses')
@UseGuards(JwtAuthGuard)
export class AccessesController {
	constructor(private readonly accessesService: AccessesService) {}

	// POST
	@Post()
	public async setAccess(@Req() req: Request, @Body() dto: KeyDto) {
		const userId = req['user'].id;

		const access = await this.accessesService.setAccess(userId, dto.key);

		if (!access) {
			throw new NotFoundException('Wrong key');
		}

		return access;
	}
}
