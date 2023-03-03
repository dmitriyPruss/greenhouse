import { Table, TableForeignKey } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class CreateKeysTable20220724132047 implements RunnableMigration<MigrationContext> {
	public name = '20220724132047.CreateKeysTable';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.createTable(
			new Table({
				name: 'keys',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'uuid',
					},
					{
						name: 'roleId',
						type: 'uuid',
						isNullable: false,
					},
					{
						name: 'adminKey',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'readonlyKey',
						type: 'varchar',
						isNullable: false,
					},
				],
			})
		);

		await queryRunner.createForeignKey(
			'keys',
			new TableForeignKey({
				columnNames: ['roleId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'roles',
				onDelete: 'CASCADE',
			})
		);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.dropTable('keys');
	}
}
