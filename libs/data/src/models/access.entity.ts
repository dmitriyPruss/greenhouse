import { Column, BeforeInsert, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Controller } from './controller.entity';
import { Role } from './role.entity';
import { UserRolesEnum } from '@boilerplate/shared';

@Entity({ name: 'accesses' })
export class Access {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'uuid' })
	userId!: string;

	@Column({ type: 'uuid' })
	controllerId!: string;

	@ManyToOne(() => User, (user) => user.accesses, {
		cascade: true,
	})
	user!: User;

	@ManyToOne(() => Controller, (controller) => controller.accesses, {
		cascade: true,
	})
	controller!: Controller;

	@Column({ type: 'uuid' })
	roleId: UserRolesEnum;

	@ManyToOne(() => Role)
	role!: Role;

	@BeforeInsert()
	private beforeInsert(): void {
		this.createdAt = new Date();
	}

	@Column()
	public createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
