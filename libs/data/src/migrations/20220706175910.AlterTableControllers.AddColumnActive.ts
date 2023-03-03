import { TableColumn } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterTableControllersAddColumnActive20220706175910 implements RunnableMigration<MigrationContext> {
	public name = '20220706175910.AlterTableControllers.AddColumnActive';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
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

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.dropColumn(
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
