import { Table, TableColumn, TableForeignKey } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class CreateIndexesTable20220623112699 implements RunnableMigration<MigrationContext> {
	public name = '20220623112699.CreateIndexesTable';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.createTable(
			new Table({
				name: 'indexes',
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
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'values',
						type: 'text',
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

		await queryRunner.addColumn(
			'indexes',
			new TableColumn({
				name: 'controllerId',
				type: 'uuid',
			})
		);

		await queryRunner.addColumn(
			'indexes',
			new TableColumn({
				name: 'typeId',
				type: 'uuid',
			})
		);

		await queryRunner.createForeignKey(
			'indexes',
			new TableForeignKey({
				columnNames: ['controllerId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'controllers',
				onDelete: 'CASCADE',
			})
		);

		await queryRunner.createForeignKey(
			'indexes',
			new TableForeignKey({
				columnNames: ['typeId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'types',
				onDelete: 'CASCADE',
			})
		);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		const table = await queryRunner.getTable('indexes');
		const foreignKeyController = table.foreignKeys.find((fk) => fk.columnNames.indexOf('controllerId') !== -1);
		await queryRunner.dropForeignKey('indexes', foreignKeyController);
		await queryRunner.dropColumn('indexes', 'controllerId');

		const foreignKeyType = table.foreignKeys.find((fk) => fk.columnNames.indexOf('typeId') !== -1);
		await queryRunner.dropForeignKey('indexes', foreignKeyType);
		await queryRunner.dropColumn('indexes', 'typeId');

		await queryRunner.dropTable('indexes');
	}
}
