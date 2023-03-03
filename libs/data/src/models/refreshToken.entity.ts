import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	isRevoked: boolean;

	@Column()
	expires: Date;

	@Column({ type: 'uuid' })
	userId: string;

	@ManyToOne(() => User, (user) => user.refreshTokens)
	user: User;
}
