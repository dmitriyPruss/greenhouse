import { Table } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class CreateControllersTable20220619233000 implements RunnableMigration<MigrationContext> {
	public name = '20220619233000.CreateControllersTable';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.createTable(
			new Table({
				name: 'controllers',
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
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'description',
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

		await queryRunner.dropTable('controllers');
	}
}
