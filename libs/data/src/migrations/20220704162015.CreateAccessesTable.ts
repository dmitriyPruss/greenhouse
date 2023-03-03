import { Table, TableForeignKey } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class CreateAccessesTable20220704162015 implements RunnableMigration<MigrationContext> {
	public name = '20220704162015.CreateAccessesTable';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.createTable(
			new Table({
				name: 'accesses',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'uuid',
					},
					{
						name: 'userId',
						type: 'uuid',
						isNullable: false,
					},
					{
						name: 'controllerId',
						type: 'uuid',
						isNullable: false,
					},
					{
						name: 'roleId',
						type: 'uuid',
						isNullable: false,
					},
					{
						name: 'createdAt',
						type: 'timestamp',
						isNullable: false,
					},
					{
						name: 'updatedAt',
						type: 'timestamp',
						isNullable: true,
					},
				],
			})
		);

		await queryRunner.createForeignKey(
			'accesses',
			new TableForeignKey({
				columnNames: ['userId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'CASCADE',
			})
		);

		await queryRunner.createForeignKey(
			'accesses',
			new TableForeignKey({
				columnNames: ['controllerId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'controllers',
				onDelete: 'CASCADE',
			})
		);

		await queryRunner.createForeignKey(
			'accesses',
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

		await queryRunner.dropTable('accesses');
	}
}
