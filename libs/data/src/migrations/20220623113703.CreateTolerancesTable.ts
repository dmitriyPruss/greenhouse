import { Table, TableColumn, TableForeignKey } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class CreateTolerancesTable20220623113703 implements RunnableMigration<MigrationContext> {
	public name = '20220623113703.CreateTolerancesTable';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.createTable(
			new Table({
				name: 'tolerances',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'uuid',
					},
					{
						name: 'dangerRateId',
						type: 'uuid',
						isNullable: false,
					},
					{
						name: 'colorId',
						type: 'uuid',
						isNullable: false,
					},
					{
						name: 'labelId',
						type: 'uuid',
						isNullable: false,
					},
					{
						name: 'startValue',
						type: 'numeric',
						isNullable: false,
					},
				],
			})
		);

		await queryRunner.addColumn(
			'tolerances',
			new TableColumn({
				name: 'indexId',
				type: 'uuid',
			})
		);

		await queryRunner.createForeignKey(
			'tolerances',
			new TableForeignKey({
				columnNames: ['indexId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'indexes',
				onDelete: 'CASCADE',
			})
		);

		await queryRunner.createForeignKey(
			'tolerances',
			new TableForeignKey({
				columnNames: ['dangerRateId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'danger_rates',
				onDelete: 'CASCADE',
			})
		);

		await queryRunner.createForeignKey(
			'tolerances',
			new TableForeignKey({
				columnNames: ['colorId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'colors',
				onDelete: 'CASCADE',
			})
		);

		await queryRunner.createForeignKey(
			'tolerances',
			new TableForeignKey({
				columnNames: ['labelId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'labels',
				onDelete: 'CASCADE',
			})
		);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		const table = await queryRunner.getTable('tolerances');
		const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('indexId') !== -1);
		await queryRunner.dropForeignKey('tolerances', foreignKey);
		await queryRunner.dropColumn('tolerances', 'indexId');

		await queryRunner.dropTable('tolerances');
	}
}
