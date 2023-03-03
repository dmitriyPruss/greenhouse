import { TableColumn, TableForeignKey } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterKeysTableRemoveAndAddColumns20220802124957 implements RunnableMigration<MigrationContext> {
	public name = '20220802124957.AlterKeysTableRemoveAndAddColumns';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.dropColumns('keys', [
			new TableColumn({
				name: 'adminKey',
				type: 'varchar',
				isNullable: false,
			}),
			new TableColumn({
				name: 'readonlyKey',
				type: 'varchar',
				isNullable: false,
			}),
			new TableColumn({
				name: 'isActiveAdminKey',
				type: 'boolean',
				isNullable: false,
				default: true,
			}),
			new TableColumn({
				name: 'isActiveReadonlyKey',
				type: 'boolean',
				isNullable: false,
				default: true,
			}),
		]);

		await queryRunner.addColumns('keys', [
			new TableColumn({
				name: 'roleId',
				type: 'uuid',
			}),
			new TableColumn({
				name: 'key',
				type: 'varchar',
				isNullable: false,
			}),
			new TableColumn({
				name: 'isDeactivated',
				type: 'timestamp',
				isNullable: true,
			}),
		]);

		await queryRunner.createForeignKey(
			'keys',
			new TableForeignKey({
				columnNames: ['roleId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'roles',
				onDelete: 'CASCADE',
			})
		);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.addColumns('keys', [
			new TableColumn({
				name: 'adminKey',
				type: 'varchar',
				isNullable: false,
			}),
			new TableColumn({
				name: 'readonlyKey',
				type: 'varchar',
				isNullable: false,
			}),
			new TableColumn({
				name: 'isActiveAdminKey',
				type: 'boolean',
				isNullable: false,
				default: true,
			}),
			new TableColumn({
				name: 'isActiveReadonlyKey',
				type: 'boolean',
				isNullable: false,
				default: true,
			}),
		]);

		await queryRunner.dropColumns('keys', [
			new TableColumn({
				name: 'roleId',
				type: 'uuid',
			}),
			new TableColumn({
				name: 'key',
				type: 'varchar',
				isNullable: false,
			}),
			new TableColumn({
				name: 'isDeactivated',
				type: 'timestamp',
				isNullable: true,
			}),
		]);
	}
}
