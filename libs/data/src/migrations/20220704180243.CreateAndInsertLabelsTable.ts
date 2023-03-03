import { Table } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';
import { LabelTypesEnum } from './../enums/model-enums';

export class CreateAndInsertLabelsTable20220704180243 implements RunnableMigration<MigrationContext> {
	public name = '20220704180243.CreateAndInsertLabelsTable';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.createTable(
			new Table({
				name: 'labels',
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
			`INSERT INTO "labels"("id", "name") VALUES ('${LabelTypesEnum['farBelowNormal']}', 'FAR BELOW NORMAL'), ('${LabelTypesEnum['belowNormal']}', 'BELOW NORMAL'), ('${LabelTypesEnum['normal']}', 'NORMAL'), ('${LabelTypesEnum['aboveNorm']}', 'ABOVE THE NORM'), ('${LabelTypesEnum['muchHigherNormal']}', 'MUCH HIGHER THAN NORMAL')`
		);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.dropTable('labels');
	}
}
