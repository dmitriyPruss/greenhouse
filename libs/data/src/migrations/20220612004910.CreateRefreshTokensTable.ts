import { Table, TableColumn, TableForeignKey } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class CreateRefreshTokensTable20220612004910 implements RunnableMigration<MigrationContext> {
	public name = '20220612004910.CreateRefreshTokensTable';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.createTable(
			new Table({
				name: 'refresh_tokens',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'uuid',
					},
					{
						name: 'user_id',
						type: 'text',
						isNullable: false,
					},
					{
						name: 'isRevoked',
						type: 'boolean',
						isNullable: false,
					},
					{
						name: 'expires',
						type: 'timestamp',
						isNullable: false,
					},
				],
			})
		);

		await queryRunner.addColumn(
			'refresh_tokens',
			new TableColumn({
				name: 'userId',
				type: 'uuid',
			})
		);

		await queryRunner.createForeignKey(
			'refresh_tokens',
			new TableForeignKey({
				columnNames: ['userId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'CASCADE',
			})
		);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		const table = await queryRunner.getTable('refresh_tokens');
		const foreignKeyController = table.foreignKeys.find((fk) => fk.columnNames.indexOf('userId') !== -1);
		await queryRunner.dropForeignKey('refresh_tokens', foreignKeyController);
		await queryRunner.dropColumn('refresh_tokens', 'userId');

		await queryRunner.dropTable('refresh_tokens');
	}
}
