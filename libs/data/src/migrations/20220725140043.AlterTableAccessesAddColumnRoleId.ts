import { TableColumn, TableForeignKey } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterTableAccessesAddColumnRoleId20220725140043 implements RunnableMigration<MigrationContext> {
	public name = '20220725140043.AlterTableAccessesAddColumnRoleId';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.addColumn(
			'accesses',
			new TableColumn({
				name: 'roleId',
				type: 'uuid',
				isNullable: false,
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
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		const table = await queryRunner.getTable('accesses');
		const foreignKeyController = table.foreignKeys.find((fk) => fk.columnNames.indexOf('roleId') !== -1);
		await queryRunner.dropForeignKey('accesses', foreignKeyController);
		await queryRunner.dropColumn('accesses', 'roleId');
	}
}
