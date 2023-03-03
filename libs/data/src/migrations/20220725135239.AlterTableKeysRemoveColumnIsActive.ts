import { TableColumn } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterTableKeysRemoveColumnIsActive20220725135239 implements RunnableMigration<MigrationContext> {
	public name = '20220725135239.AlterTableKeysRemoveColumnIsActive';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.dropColumn('controllers', 'isActive');
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.addColumn(
			'controllers',
			new TableColumn({
				name: 'isActive',
				type: 'boolean',
				isNullable: false,
				default: true,
			})
		);
	}
}
