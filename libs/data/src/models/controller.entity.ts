import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, UpdateDateColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Index } from './index.entity';
import { Access } from './access.entity';
import { Key } from './key.entity';

@Entity({ name: 'controllers' })
export class Controller {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'text', unique: true })
	name: string;

	@Column('text')
	description: string;

	@OneToMany(() => Key, (key) => key.controller, { cascade: ['insert', 'update'] })
	keys: Key[];

	@Column({ type: 'text', unique: true, select: false })
	hardwareCode: string;

	@OneToMany(() => Index, (index) => index.controller, { cascade: ['insert', 'update'] })
	indexes: Index[];

	@OneToMany(() => Access, (access) => access.controller)
	accesses: Access[];

	@BeforeInsert()
	private beforeInsert(): void {
		this.hardwareCode = uuidv4().split('-').join('') + Math.round(Math.random() * 1000000000);
		this.createdAt = new Date();
	}

	@Column()
	public createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
