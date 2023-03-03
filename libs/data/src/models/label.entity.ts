import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LabelTypesEnum } from '../enums/model-enums';

@Entity({ name: 'labels' })
export class Label {
	@PrimaryGeneratedColumn('uuid')
	id: LabelTypesEnum;

	@Column({ type: 'text' })
	name: string;
}
