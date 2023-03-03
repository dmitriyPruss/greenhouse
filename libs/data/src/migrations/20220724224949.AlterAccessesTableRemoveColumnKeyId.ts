import { TableColumn } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterAccessesTableRemoveColumnKeyId20220724224949 implements RunnableMigration<MigrationContext> {
	public name = '20220724224949.AlterAccessesTableRemoveColumnKeyId';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.dropColumn('accesses', 'keyId');
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.addColumn(
			'accesses',
			new TableColumn({
				name: 'keyId',
				type: 'uuid',
			})
		);
	}
}
