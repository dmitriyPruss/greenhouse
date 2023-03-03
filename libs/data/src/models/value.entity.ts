import {
	Column,
	BeforeInsert,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Index } from './index.entity';

@Entity({ name: 'values' })
export class Value {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('numeric', { precision: 8, scale: 2 })
	value: number;

	@Column({ type: 'uuid' })
	indexId: string;

	@ManyToOne(() => Index, (index) => index.values)
	index: Index;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
