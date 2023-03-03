import { grey } from '@mui/material/colors';
import { SxProps } from '@mui/material';

export const controllerHeaderStyle: SxProps = {
	color: grey[700],
	fontSize: '3.5em',
	textAlign: 'center',
	p: '10px 0',
	m: '15px 0',
	letterSpacing: '3px',
	'@media screen and (max-width: 570px)': {
		fontSize: '3em',
		letterSpacing: '1px',
	},
};

export const indicesHeaderStyle: SxProps = {
	textAlign: 'center',
	color: '#aaa',
	pt: 1,
	pb: 1,
	textShadow: '-1px -1px 0 #333',
	fontSize: '2.7em',
	'@media screen and (max-width: 570px)': {
		fontSize: '2.2em',
		letterSpacing: '1px',
	},
};

export const indicesListStyle: SxProps = {
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
};

export const indexListItemStyle: SxProps = {
	width: '95%',
	bgcolor: grey[800],
	display: 'flex',
	justifyContent: 'center',
	mt: 1,
	border: `5px double ${grey[100]}`,
	borderRadius: 1,
};
