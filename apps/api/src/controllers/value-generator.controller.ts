import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ControllerDto } from '@boilerplate/shared';
import { ValueGeneratorService } from '../services/value-generator.service';

@Controller('generated_values')
export class ValueGeneratorController {
	constructor(private readonly valueGeneratorService: ValueGeneratorService) {}

	// READ
	@Get()
	public async findController(@Headers('hardware-code') hardwareCode: string): Promise<ControllerDto> {
		return (await this.valueGeneratorService.findAll(hardwareCode)) as any;
	}

	// CREATE
	@Post()
	public async createValues(@Body() body: { newValues: { value: number; indexId: string }[]; controllerId: string }) {
		const { newValues, controllerId } = body;

		return await this.valueGeneratorService.createNewValues(newValues, controllerId);
	}
}
