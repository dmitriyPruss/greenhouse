import { Table } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';
import { UserRolesEnum } from '@boilerplate/shared';

export class CreateAndInsertRolesTable20220704160000 implements RunnableMigration<MigrationContext> {
	public name = '20220704160000.CreateAndInsertRolesTable';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.createTable(
			new Table({
				name: 'roles',
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
				],
			})
		);

		await queryRunner.query(
			`INSERT INTO "roles"("id", "name") VALUES ('${UserRolesEnum['Admin']}', 'ADMIN'), ('${UserRolesEnum['User']}', 'READONLY')`
		);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.dropTable('roles');
	}
}
