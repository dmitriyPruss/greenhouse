import { grey, purple } from '@mui/material/colors';
import { SxProps } from '@mui/material';

export interface ICssStyle {
	[propName: string]: string | number;
}

export const dialogTitleControllerStyle: SxProps = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	background: `linear-gradient(to right bottom, ${purple[900]}, ${purple[400]})`,
	color: '#fff',
	width: '50%',
	m: '70px auto 5px',
	borderRadius: 2,
};

export const settingsIconButtonStyle: SxProps = { fontSize: '1.5em' };

export const dialogActionsStyle: SxProps = { display: 'flex', justifyContent: 'space-evenly' };

export const closeButtonStyle: SxProps = {
	width: '120px',
	fontSize: '1.05em',
	fontWeight: 'bold',
	p: 1.5,
	bgcolor: grey[900],
};

export const inputControllerStyle: SxProps = { width: '100%' };

export const errorInputControllerStyle: SxProps = { position: 'absolute', left: 5, top: 55 };

export const sendButtonStyle: SxProps = {
	width: '120px',
	fontSize: '1.05em',
	fontWeight: 'bold',
	p: 1.5,
	bgcolor: purple[700],
};

export const paragraphStyle: ICssStyle = { fontWeight: 'bold', margin: '3px 0' };

export const subParagraphStyle: ICssStyle = {
	textAlign: 'center',
	margin: '3px 0',
	fontSize: '0.7em',
	letterSpacing: '2px',
};

export const dialogStyle: SxProps = { minWidth: '360px' };
