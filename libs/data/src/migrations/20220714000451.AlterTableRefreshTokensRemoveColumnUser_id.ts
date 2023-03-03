import { TableColumn } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterTableRefreshTokensRemoveColumnUser_id20220714000451 implements RunnableMigration<MigrationContext> {
	public name = '20220714000451.AlterTableRefreshTokensRemoveColumnUser_id';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.dropColumn('refresh_tokens', 'user_id');
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.addColumn(
			'refresh_tokens',
			new TableColumn({
				name: 'user_id',
				type: 'text',
				isNullable: false,
			})
		);
	}
}
