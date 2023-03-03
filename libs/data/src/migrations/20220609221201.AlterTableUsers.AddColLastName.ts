import { TableColumn } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterTableUsersAddColLastName20220609221201 implements RunnableMigration<MigrationContext> {
	public name = '20220609221201.AlterTableUsers.AddColLastName';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.addColumn(
			'users',
			new TableColumn({
				name: 'lastName',
				type: 'text',
				isNullable: true,
			})
		);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.dropColumn(
			'users',
			new TableColumn({
				name: 'lastName',
				type: 'text',
				isNullable: true,
			})
		);
	}
}
