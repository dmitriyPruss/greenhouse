import React, { FC } from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { imageListStyle, evenImageStyle, oddImageStyle } from './background-image-list.styles';

export interface IImageParams {
	img: string;
	title: string;
}

export interface IImages<T> extends React.HTMLAttributes<HTMLDivElement> {
	images: Array<T>;
	backImage: string;
}

const BackgroundImageList: FC<IImages<IImageParams>> = ({ images, backImage }: IImages<IImageParams>) => {
	return (
		<ImageList sx={{ ...imageListStyle, backgroundImage: `url(${backImage})` }} cols={2}>
			{images.map((image, index) => {
				if (index % 2 !== 0) {
					return (
						<ImageListItem key={image.title} sx={evenImageStyle}>
							<img src={image.img} alt={image.title} />
						</ImageListItem>
					);
				}

				return (
					<ImageListItem key={image.title} sx={oddImageStyle}>
						<img src={image.img} alt={image.title} />
					</ImageListItem>
				);
			})}
		</ImageList>
	);
};

export default BackgroundImageList;
