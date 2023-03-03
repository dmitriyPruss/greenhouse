import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { Controller, Index, Type, DangerRate, Tolerance, Color, Label } from '@boilerplate/data';

@Injectable()
export class ControllerHandlersRepository {
	constructor(
		@InjectRepository(Controller) private readonly controllersRepository: Repository<Controller>,
		@InjectRepository(Index) private readonly indexesRepository: Repository<Index>,
		@InjectRepository(Type) private readonly typeRepository: Repository<Type>,
		@InjectRepository(DangerRate) private readonly dangerRateRepository: Repository<DangerRate>,
		@InjectRepository(Color) private readonly colorRepository: Repository<Color>,
		@InjectRepository(Label) private readonly labelRepository: Repository<Label>
	) {}

	public synchronizeIndexes = async (controllerData: Controller, entity: Controller, id: string) => {
		for (const item of controllerData.indexes) {
			const foundIndex = entity.indexes.find((i) => i.id === item.id);

			if (!foundIndex) {
				await this.controllersRepository
					.createQueryBuilder('controllers')
					.where('controllers.id = :id', { id })
					.delete()
					.from(Index)
					.where('id = :id', { id: item.id })
					.execute();
			}

			if (foundIndex) {
				for (const tolerance of item.tolerances) {
					const foundTolerance = foundIndex.tolerances.find((i) => i.id === tolerance.id);

					if (!foundTolerance) {
						await this.indexesRepository
							.createQueryBuilder('indexes')
							.where('indexes.id = :id', { id: foundIndex.id })
							.delete()
							.from(Tolerance)
							.where('id = :id', { id: tolerance.id })
							.execute();
					}
				}

				foundIndex.type = await this.typeRepository.findOne({ where: { name: foundIndex.type.name } });

				await this.indexesRepository.save(foundIndex);
			}
		}
	};

	public addIndexes = (entity) => {
		const newIndexes = [];

		for (const index of entity.indexes) {
			if (!index.id) {
				newIndexes.push(index);
			}
		}

		return newIndexes;
	};

	public chooseTypes = async (indexes) => {
		for (const index of indexes) {
			const { name } = index.type;

			const chosenType = await this.typeRepository.findOne({ where: { name } });

			index.type = chosenType;
		}
	};

	public createTolerances = async (indexes) => {
		for (const index of indexes) {
			for (const tolerance of index.tolerances) {
				const { dangerRate, color, label } = tolerance;

				const dangerRateValue = await this.dangerRateRepository.findOne({
					where: {
						name: dangerRate,
					},
				});

				const colorValue = await this.colorRepository.findOne({
					where: {
						name: color,
					},
				});

				const labelValue = await this.labelRepository.findOne({
					where: {
						name: label,
					},
				});

				tolerance.dangerRate = dangerRateValue;
				tolerance.color = colorValue;
				tolerance.label = labelValue;
			}
		}
	};

	public updateTolerances = async (indexes) => {
		for (const index of indexes) {
			for (const tolerance of index.tolerances) {
				const { dangerRate, color, label } = tolerance;

				const dangerRateValue = await this.dangerRateRepository.findOne({
					where: {
						name: dangerRate,
					},
				});

				const colorValue = await this.colorRepository.findOne({
					where: {
						name: color,
					},
				});

				const labelValue = await this.labelRepository.findOne({
					where: {
						name: label,
					},
				});

				delete tolerance.dangerRateId;
				delete tolerance.colorId;
				delete tolerance.labelId;

				tolerance.dangerRate = dangerRateValue;
				tolerance.color = colorValue;
				tolerance.label = labelValue;
			}
		}
	};

	public getController = async (id: string) =>
		await this.controllersRepository
			.createQueryBuilder('controllers')
			.where('controllers.id = :id', { id })
			.leftJoinAndSelect('controllers.indexes', 'indexes')
			.leftJoinAndSelect('indexes.type', 'type')
			.leftJoinAndSelect('indexes.tolerances', 'tolerances')
			.getOne();

	public setTolerances = async (tolerances: Tolerance[]) => {
		for (const tolerance of tolerances) {
			tolerance.dangerRate = await this.dangerRateRepository.findOne({
				where: { id: tolerance.dangerRateId },
				select: ['name'],
			});
			tolerance.color = await this.colorRepository.findOne({
				where: { id: tolerance.colorId },
				select: ['name'],
			});
			tolerance.label = await this.labelRepository.findOne({
				where: { id: tolerance.labelId },
				select: ['name'],
			});

			tolerance.dangerRate = tolerance.dangerRate.name as any;
			tolerance.color = tolerance.color.name as any;
			tolerance.label = tolerance.label.name as any;
		}
	};
}
