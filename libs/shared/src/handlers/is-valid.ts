import { ToleranceDto } from '../models/dto/controller.dto';

export type labelType = 'FAR BELOW NORMAL' | 'MUCH HIGHER THAN NORMAL' | 'BELOW NORMAL' | 'ABOVE THE NORM' | 'NORMAL';

export function isValid(entities: any): boolean {
	const tolerances: ToleranceDto[] = [...entities];

	const areUniqueElements = tolerances.map((tolerance: ToleranceDto) => {
		if (
			(tolerance.label === 'NORMAL' && tolerance.dangerRate === 'SAFETY' && tolerance.color === '#9ccc65') ||
			((tolerance.label === 'FAR BELOW NORMAL' || tolerance.label === 'MUCH HIGHER THAN NORMAL') &&
				tolerance.dangerRate === 'DANGER' &&
				tolerance.color === '#f44336') ||
			((tolerance.label === 'BELOW NORMAL' || tolerance.label === 'ABOVE THE NORM') &&
				tolerance.dangerRate === 'WARNING' &&
				tolerance.color === '#ffca28')
		) {
			return true;
		}

		return false;
	});

	const elementUniqueResult = areUniqueElements.find((res: boolean) => res === false);

	const defaultLabels: labelType[] = [
		'FAR BELOW NORMAL',
		'MUCH HIGHER THAN NORMAL',
		'BELOW NORMAL',
		'ABOVE THE NORM',
		'NORMAL',
	];
	defaultLabels.sort();

	const toleranceLabels: string[] = tolerances.map((tolerance) => tolerance.label).sort();

	const areUniqueLabels = defaultLabels.map((label, index) => label === toleranceLabels[index]);

	const labelUniqueResult = areUniqueLabels.find((res: boolean) => res === false);

	if (areUniqueElements.length === 5 && elementUniqueResult === undefined && labelUniqueResult === undefined) {
		return true;
	}

	return false;
}
