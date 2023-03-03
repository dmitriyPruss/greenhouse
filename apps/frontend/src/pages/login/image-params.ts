import FirstGreenhouse from './../../../../../public/images/greenhouse.jpg';
import SecondGreenhouse from './../../../../../public/images//greenhouse2.jpg';
import ThirdGreenhouse from './../../../../../public/images//greenhouse3.png';
import FourthGreenhouse from './../../../../../public/images//greenhouse4.jpg';

export interface IImageParams {
	img: string;
	title: string;
}

export const imageParams: IImageParams[] = [
	{ img: FirstGreenhouse, title: 'First greenhouse' },
	{ img: SecondGreenhouse, title: 'Second greenhouse' },
	{ img: ThirdGreenhouse, title: 'Third greeenhouse' },
	{ img: FourthGreenhouse, title: 'Fourth greenhouse' },
];
