import { Table, TableForeignKey } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class CreateValuesTable20220710123107 implements RunnableMigration<MigrationContext> {
	public name = '20220710123107.CreateValuesTable';

	public async up(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.createTable(
			new Table({
				name: 'values',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'uuid',
					},
					{
						name: 'indexId',
						type: 'uuid',
						isNullable: false,
					},
					{
						name: 'value',
						type: 'numeric',
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
			'values',
			new TableForeignKey({
				columnNames: ['indexId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'indexes',
				onDelete: 'CASCADE',
			})
		);
	}

	public async down(params: MigrationParams<MigrationContext>): Promise<void> {
		const {
			context: { queryRunner },
		} = params;

		await queryRunner.dropTable('values');
	}
}
