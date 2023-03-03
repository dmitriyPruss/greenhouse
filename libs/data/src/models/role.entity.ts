import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRolesEnum } from '@boilerplate/shared';

export type role = 'ADMIN' | 'READONLY';

@Entity({ name: 'roles' })
export class Role {
	@PrimaryGeneratedColumn('uuid')
	public id: UserRolesEnum;

	@Column({ type: 'text' })
	public name: role;
}
