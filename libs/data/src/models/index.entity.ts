import { Column, BeforeInsert, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Controller } from './controller.entity';
import { Tolerance } from './tolerance.entity';
import { Type } from './type.entity';
import { Value } from './value.entity';
import { TypesEnum } from '../enums/model-enums';

@Entity({ name: 'indexes' })
export class Index {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'text', unique: true })
	name: string;

	@OneToMany(() => Tolerance, (tolerance) => tolerance.index, { cascade: ['insert', 'update'] })
	tolerances: Tolerance[];

	@OneToMany(() => Value, (value) => value.index, { cascade: ['insert', 'update'] })
	values: Value[];

	@Column({ type: 'uuid' })
	typeId: TypesEnum;

	@ManyToOne(() => Type)
	type: Type;

	@Column({ type: 'uuid' })
	controllerId: string;

	@ManyToOne(() => Controller, (controller) => controller.indexes)
	controller: Controller;

	@BeforeInsert()
	private beforeInsert(): void {
		this.createdAt = new Date();
	}

	@Column()
	public createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column('numeric', { precision: 8, scale: 2 })
	previousValue: number;

	@Column('numeric', { precision: 8, scale: 2 })
	lastValue: number;
}
