import { TableColumn, TableForeignKey } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterTableAccessesAddColumnKeyIdRemoveColumnRoleId20220724133436
	implements RunnableMigration<MigrationContext>
{
	public name = '20220724133436.AlterTableAccessesAddColumnKeyIdRemoveColumnRoleId';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		const table = await queryRunner.getTable('accesses');
		const foreignKeyController = table.foreignKeys.find((fk) => fk.columnNames.indexOf('roleId') !== -1);
		await queryRunner.dropForeignKey('accesses', foreignKeyController);
		await queryRunner.dropColumn('accesses', 'roleId');

		await queryRunner.addColumn(
			'accesses',
			new TableColumn({
				name: 'keyId',
				type: 'uuid',
			})
		);

		await queryRunner.createForeignKey(
			'accesses',
			new TableForeignKey({
				columnNames: ['keyId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'keys',
				onDelete: 'CASCADE',
			})
		);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.addColumn(
			'accesses',
			new TableColumn({
				name: 'roleId',
				type: 'uuid',
			})
		);

		await queryRunner.createForeignKey(
			'accesses',
			new TableForeignKey({
				columnNames: ['roleId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'roles',
				onDelete: 'CASCADE',
			})
		);

		const table = await queryRunner.getTable('accesses');
		const foreignKeyController = table.foreignKeys.find((fk) => fk.columnNames.indexOf('keyId') !== -1);
		await queryRunner.dropForeignKey('accesses', foreignKeyController);
		await queryRunner.dropColumn('accesses', 'keyId');
	}
}
