import { TableColumn, TableForeignKey } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterTableKeysAddColumnControllerId20220725133353 implements RunnableMigration<MigrationContext> {
	public name = '20220725133353.AlterTableKeysAddColumnControllerId';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.addColumn(
			'keys',
			new TableColumn({
				name: 'controllerId',
				type: 'uuid',
			})
		);

		await queryRunner.createForeignKey(
			'keys',
			new TableForeignKey({
				columnNames: ['controllerId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'controllers',
				onDelete: 'CASCADE',
			})
		);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		const table = await queryRunner.getTable('keys');
		const foreignKeyController = table.foreignKeys.find((fk) => fk.columnNames.indexOf('controllerId') !== -1);
		await queryRunner.dropForeignKey('keys', foreignKeyController);
		await queryRunner.dropColumn('keys', 'controllerId');
	}
}
