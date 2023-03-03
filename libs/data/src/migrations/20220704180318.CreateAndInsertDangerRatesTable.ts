import { Table } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';
import { DangerRateTypesEnum } from './../enums/model-enums';

export class CreateAndInsertDangerRatesTable20220704180318 implements RunnableMigration<MigrationContext> {
	public name = '20220704180318.CreateAndInsertDangerRatesTable';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.createTable(
			new Table({
				name: 'danger_rates',
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
			`INSERT INTO "danger_rates"("id", "name") VALUES ('${DangerRateTypesEnum['safety']}', 'SAFETY'), ('${DangerRateTypesEnum['warning']}', 'WARNING'), ('${DangerRateTypesEnum['danger']}', 'DANGER')`
		);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.dropTable('danger_rates');
	}
}
