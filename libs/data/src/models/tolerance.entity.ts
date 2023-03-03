import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ColorTypesEnum, DangerRateTypesEnum, LabelTypesEnum } from '../enums/model-enums';
import { Color } from './color.entity';
import { Index } from './index.entity';
import { Label } from './label.entity';
import { DangerRate } from './dangerRate.entity';

@Entity({ name: 'tolerances' })
export class Tolerance {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('numeric', { precision: 16, scale: 5 })
	startValue: number;

	@Column({ type: 'uuid' })
	colorId: ColorTypesEnum;

	@ManyToOne(() => Color)
	color: Color;

	@Column({ type: 'uuid' })
	dangerRateId: DangerRateTypesEnum;

	@ManyToOne(() => DangerRate)
	dangerRate: DangerRate;

	@Column({ type: 'uuid' })
	labelId: LabelTypesEnum;

	@ManyToOne(() => Label)
	label: Label;

	@ManyToOne(() => Index, (index) => index.tolerances)
	index: Index;
}
