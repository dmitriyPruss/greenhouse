import { TableColumn, TableForeignKey } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterKeysTableAddColumnAccessId20220724230421 implements RunnableMigration<MigrationContext> {
	public name = '20220724230421.AlterKeysTableAddColumnAccessId';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.addColumn(
			'keys',
			new TableColumn({
				name: 'accessId',
				type: 'uuid',
			})
		);

		await queryRunner.createForeignKey(
			'keys',
			new TableForeignKey({
				columnNames: ['accessId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'accesses',
				onDelete: 'CASCADE',
			})
		);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		const table = await queryRunner.getTable('keys');
		const foreignKeyController = table.foreignKeys.find((fk) => fk.columnNames.indexOf('accessId') !== -1);
		await queryRunner.dropForeignKey('keys', foreignKeyController);
		await queryRunner.dropColumn('keys', 'accessId');
	}
}
