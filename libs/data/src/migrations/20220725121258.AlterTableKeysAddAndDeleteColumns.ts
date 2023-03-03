import { TableColumn, TableForeignKey } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterTableKeysAddAndDeleteColumns20220725121258 implements RunnableMigration<MigrationContext> {
	public name = '20220725121258.AlterTableKeysAddAndDeleteColumns';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.addColumns('keys', [
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
				name: 'accessId',
				type: 'uuid',
			}),
		]);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.dropColumns('keys', [
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
				isNullable: false,
			}),
			new TableColumn({
				name: 'accessId',
				type: 'uuid',
				isNullable: false,
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

		await queryRunner.createForeignKey(
			'keys',
			new TableForeignKey({
				columnNames: ['accessId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'accesses',
				onDelete: 'CASCADE',
			})
		);
	}
}
