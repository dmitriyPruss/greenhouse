import { TableColumn } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterTableIndexesAddColumnsValues20220720123045 implements RunnableMigration<MigrationContext> {
	public name = '20220720123045.AlterTableIndexesAddColumnsValues';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.addColumns('indexes', [
			new TableColumn({
				name: 'previousValue',
				type: 'numeric',
				isNullable: true,
			}),
			new TableColumn({
				name: 'lastValue',
				type: 'numeric',
				isNullable: true,
			}),
		]);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.dropColumns('indexes', [
			new TableColumn({
				name: 'previousValue',
				type: 'numeric',
				isNullable: true,
			}),
			new TableColumn({
				name: 'lastValue',
				type: 'numeric',
				isNullable: true,
			}),
		]);
	}
}
