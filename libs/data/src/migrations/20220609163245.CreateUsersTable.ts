import { Table } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class CreateUsersTable20220609163245 implements RunnableMigration<MigrationContext> {
	public name = '20220609163245.CreateUsersTable';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'uuid',
					},
					{
						name: 'name',
						type: 'text',
						isNullable: false,
					},
					{
						name: 'email',
						type: 'text',
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'password',
						type: 'text',
						isNullable: false,
					},
					{
						name: 'createdAt',
						type: 'timestamp',
						isNullable: false,
					},
					{
						name: 'updatedAt',
						type: 'timestamp',
						isNullable: true,
					},
				],
			})
		);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.dropTable('users');
	}
}
