import { SxProps } from '@mui/material';
import { red } from '@mui/material/colors';

export const dialogTitleStyle: SxProps = {
	display: 'flex',
	justifyContent: 'space-evenly',
	alignItems: 'flex-end',
};

export function setIconStyle(fontSize: string | number): SxProps {
	return { color: red[900], fontSize };
}

export const dialogActionStyle: SxProps = { display: 'flex', justifyContent: 'space-evenly', m: 1 };

export const dialogButtonStyle: SxProps = { width: '45%' };
