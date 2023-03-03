import { TableColumn } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterTableTypesAddColumnName20220708163217 implements RunnableMigration<MigrationContext> {
	public name = '20220708163217.AlterTableTypes.AddColumnName';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.addColumn(
			'types',
			new TableColumn({
				name: 'name',
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
			'types',
			new TableColumn({
				name: 'name',
				type: 'text',
				isUnique: true,
				isNullable: false,
			})
		);
	}
}
