import { Entity, Column, BeforeInsert, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Access } from './access.entity';
import { RefreshToken } from './refreshToken.entity';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	name: string;

	@Column()
	lastName: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, { cascade: ['insert', 'update'] })
	refreshTokens: RefreshToken[];

	@OneToMany(() => Access, (access) => access.user)
	public accesses!: Access[];

	@BeforeInsert()
	private beforeInsert(): void {
		this.createdAt = new Date();
	}

	@Column()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;
}
