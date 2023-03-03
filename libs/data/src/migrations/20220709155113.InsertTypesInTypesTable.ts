import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';
import { TypesEnum } from '../enums/model-enums';

export class InsertTypesInTypesTable20220709155113 implements RunnableMigration<MigrationContext> {
	public name = '20220709155113.InsertTypesInTypesTable';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.query(
			`INSERT INTO "types"("id", "unitOfMeasurement", "name") VALUES ('${TypesEnum['temperature']}', 'C', 'temperature'), ('${TypesEnum['humidity']}', '%', 'humidity'), ('${TypesEnum['oxygenСontent']}', '%', 'oxygen'), ('${TypesEnum['carbonContent']}', '%', 'carbon'), ('${TypesEnum['nitrogenContent']}', '%', 'nitrogen')`
		);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.query('TRUNCATE TABLE types');
	}
}
