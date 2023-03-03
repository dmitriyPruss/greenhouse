import { SxProps } from '@mui/material';
import { green } from '@mui/material/colors';

export const buttonStyle: SxProps = {
	backgroundColor: green[900],
	borderRadius: '5px',
	p: '8px 0',
};

export const dialogTitleStyle: SxProps = {
	display: 'flex',
	justifyContent: 'space-evenly',
	alignItems: 'flex-end',
};

export function setIconStyle(fontSize: string | number): SxProps {
	return { color: 'darkgreen', fontSize };
}

export const logoutIconStyle: SxProps = { ml: 0.5, p: 0, fontSize: '1.4em', color: '#fff' };

export const dialogActionStyle: SxProps = { display: 'flex', justifyContent: 'space-evenly', m: 1 };

export const dialogButtonStyle: SxProps = { width: '45%' };
