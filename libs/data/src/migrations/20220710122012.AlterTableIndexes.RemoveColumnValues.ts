import { TableColumn } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterTableIndexesRemoveColumnValues20220710122012 implements RunnableMigration<MigrationContext> {
	public name = '20220710122012.AlterTableIndexes.RemoveColumnValues';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.dropColumn('indexes', 'values');
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.addColumn(
			'indexes',
			new TableColumn({
				name: 'values',
				type: 'text',
				isNullable: false,
			})
		);
	}
}
