import { Column, BeforeInsert, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Controller } from './controller.entity';
import { Role } from './role.entity';
import { UserRolesEnum } from '@boilerplate/shared';

@Entity({ name: 'keys' })
export class Key {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'text' })
	public key: string;

	@Column()
	public isDeactivated: Date;

	@BeforeInsert()
	private beforeInsert(): void {
		this.key = uuidv4().split('-').join('').slice(0, 10);
	}

	@Column({ type: 'uuid' })
	roleId: UserRolesEnum;

	@ManyToOne(() => Role)
	role!: Role;

	@Column({ type: 'uuid' })
	controllerId: string;

	@ManyToOne(() => Controller, (controller) => controller.keys)
	controller: Controller;
}
