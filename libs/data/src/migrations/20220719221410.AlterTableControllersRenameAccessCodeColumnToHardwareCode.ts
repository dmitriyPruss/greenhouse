import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterTableControllersRenameAccessCodeColumnToHardwareCode20220719221410
	implements RunnableMigration<MigrationContext>
{
	public name = '20220719221410.AlterTableControllersRenameAccessCodeColumnToHardwareCode';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.renameColumn('controllers', 'accessCode', 'hardwareCode');
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.renameColumn('controllers', 'hardwareCode', 'accessCode');
	}
}
