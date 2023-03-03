import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ColorTypesEnum } from '../enums/model-enums';

@Entity({ name: 'colors' })
export class Color {
	@PrimaryGeneratedColumn('uuid')
	id: ColorTypesEnum;

	@Column({ type: 'text' })
	name: string;
}
