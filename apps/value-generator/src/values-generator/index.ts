import axios from 'axios';
import { start, get, Properties } from 'prompt';
import { ControllerDto, IndexDto, ValueDto } from '@boilerplate/shared';

export class ValuesGenerator {
	private controllers: ControllerDto[] = [];
	private controllerQuantity: number;

	constructor(private readonly generatedValuesRoute: string) {}

	private setControllersQuantity = async () => {
		start();

		const res: Properties = await get(['controllerQuantity']);

		if (!Number.isInteger(+res.controllerQuantity)) {
			throw new Error('Not a number!');
		}

		if (res.controllerQuantity < 1 || res.controllerQuantity > 10) {
			throw new Error('Wrong quantity!');
		}

		this.controllerQuantity = +res.controllerQuantity;
	};

	private getController = async () => {
		start();

		const res: Properties = await get(['hardwareCode']);

		const { hardwareCode } = res;

		const headers = { 'Hardware-Code': hardwareCode as string };

		try {
			return await axios.get<ControllerDto>(this.generatedValuesRoute, { headers });
		} catch (error) {
			console.error(error);
		}
	};

	private createNewValue = (index: IndexDto): ValueDto => {
		let start: number;

		const startValues: number[] = index.tolerances.map((tolerance) => +tolerance.startValue).sort();

		if (index.lastValue) {
			start = +index.lastValue;
		}

		if (!index.lastValue) {
			start = startValues[2];
		}

		const amountOfChange: number = (startValues[0] + startValues[startValues.length - 1]) / 100;

		const limit: number = Math.random();

		limit > 0.5 ? (start += amountOfChange) : (start -= amountOfChange);

		let value = Math.round(start * 100) / 100;

		const newValue: ValueDto = { value, indexId: index.id, createdAt: new Date() };

		index.previousValue = index.lastValue;
		index.lastValue = newValue.value;

		return newValue;
	};

	private createValues = async (controller: ControllerDto) => {
		const newValues: ValueDto[] = [];

		for (const index of controller.indexes) {
			newValues.push(this.createNewValue(index));
		}

		await axios.post<ValueDto[]>(this.generatedValuesRoute, { newValues, controllerId: controller.id });
	};

	public runValueGenerator = async (): Promise<void> => {
		await this.setControllersQuantity();

		for (let i = 0; i < this.controllerQuantity; i++) {
			const { data } = await this.getController();

			this.controllers = [...this.controllers, data];
		}

		setInterval(async () => {
			if (this.controllers.length) {
				for (const controller of this.controllers) {
					await this.createValues(controller);
				}
			}
		}, 2000);
	};
}
