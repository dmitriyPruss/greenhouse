import React, { FC } from 'react';
import { Box } from '@mui/material';
import BackgroundImageList from '../../components/background-image-list';
import SignUpComponent from './sign-up-components';
import BackImage from './../../../../../public/images/background2.jpg';
import { imageParams } from './image-params';
import { imageContainerStyle } from './sign-up.styles';

const SignUpPage: FC = () => (
	<Box display="flex" bgcolor="#EBFFF0" minWidth={'350px'}>
		<Box width="59%" sx={imageContainerStyle}>
			<BackgroundImageList images={imageParams} backImage={BackImage} />
		</Box>
		<SignUpComponent />
	</Box>
);

export default SignUpPage;
