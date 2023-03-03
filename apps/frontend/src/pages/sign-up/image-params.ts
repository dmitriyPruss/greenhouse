import FirstGreenhouse from './../../../../../public/images/greenhouse5.jpg';
import SecondGreenhouse from './../../../../../public/images/greenhouse6.jpg';
import ThirdGreenhouse from './../../../../../public/images/greenhouse7.jpg';
import FourthGreenhouse from './../../../../../public/images/greenhouse8.jpg';

export interface IImageParams {
	img: string;
	title: string;
}

export const imageParams: IImageParams[] = [
	{ img: FirstGreenhouse, title: 'First greenhouse' },
	{ img: SecondGreenhouse, title: 'Second greenhouse' },
	{ img: ThirdGreenhouse, title: 'Third greenhouse' },
	{ img: FourthGreenhouse, title: 'Fourth greenhhouse' },
];
