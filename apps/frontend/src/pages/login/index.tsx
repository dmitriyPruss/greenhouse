import { FC } from 'react';
import { Box } from '@mui/material';
import LoginComponent from './login-component';
import BackgroundImageList from '../../components/background-image-list';
import BackImage from './../../../../../public/images/background.jpg';
import { imageParams } from './image-params';
import { imageContainerStyle } from './login.styles';

const LoginPage: FC = () => (
	<Box display="flex" bgcolor="#EBFFF0" minWidth={'350px'}>
		<Box width="59%" sx={imageContainerStyle}>
			<BackgroundImageList images={imageParams} backImage={BackImage} />
		</Box>
		<LoginComponent />
	</Box>
);

export default LoginPage;
