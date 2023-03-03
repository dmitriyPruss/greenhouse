import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class CreateValuesIndices20220811141112 implements RunnableMigration<MigrationContext> {
	public name = '20220811141112.CreateValuesIndices';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.query(`
				CREATE INDEX IF NOT EXISTS created_at_idx ON values USING btree ("createdAt" DESC);
	
				ALTER TABLE values CLUSTER ON created_at_idx;

				CLUSTER values;
	
				CREATE INDEX IF NOT EXISTS index_id_idx ON values USING btree ("indexId");
			`);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.query(`
			DROP INDEX IF EXISTS created_at_idx;
			DROP INDEX IF EXISTS index_id_idx;
		`);
	}
}
