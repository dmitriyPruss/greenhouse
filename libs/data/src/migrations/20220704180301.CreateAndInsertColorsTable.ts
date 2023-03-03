import { Table } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';
import { ColorTypesEnum } from './../enums/model-enums';

export class CreateAndInsertColorsTable20220704180301 implements RunnableMigration<MigrationContext> {
	public name = '20220704180301.CreateAndInsertColorsTable';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.createTable(
			new Table({
				name: 'colors',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'uuid',
					},
					{
						name: 'name',
						type: 'text',
						isNullable: false,
					},
				],
			})
		);

		await queryRunner.query(
			`INSERT INTO "colors"("id", "name") VALUES ('${ColorTypesEnum['dangerColor']}', '#f44336'), ('${ColorTypesEnum['warnColor']}', '#ffca28'), ('${ColorTypesEnum['safeColor']}', '#9ccc65')`
		);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.dropTable('colors');
	}
}
