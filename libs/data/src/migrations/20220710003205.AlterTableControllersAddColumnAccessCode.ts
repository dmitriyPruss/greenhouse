import { TableColumn } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterTableControllersAddColumnAccessCode20220710003205 implements RunnableMigration<MigrationContext> {
	public name = '20220710003205.AlterTableControllersAddColumnAccessCode';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.addColumn(
			'controllers',
			new TableColumn({
				name: 'accessCode',
				type: 'text',
				isUnique: true,
				isNullable: false,
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
				name: 'accessCode',
				type: 'text',
				isUnique: true,
				isNullable: false,
			})
		);
	}
}
