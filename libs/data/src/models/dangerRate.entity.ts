import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DangerRateTypesEnum } from '../enums/model-enums';

@Entity({ name: 'danger_rates' })
export class DangerRate {
	@PrimaryGeneratedColumn('uuid')
	id: DangerRateTypesEnum;

	@Column({ type: 'text' })
	name: string;
}
