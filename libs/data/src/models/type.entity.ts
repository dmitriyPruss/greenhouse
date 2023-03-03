import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Index } from './index.entity';

@Entity({ name: 'types' })
export class Type {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text')
	name: string;

	@Column('varchar', { length: 20 })
	unitOfMeasurement: string;

	@OneToMany(() => Index, (index) => index.type)
	indexes: Index[];
}
