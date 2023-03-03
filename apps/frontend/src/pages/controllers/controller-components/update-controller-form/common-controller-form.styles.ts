import { grey } from '@mui/material/colors';
import { SxProps } from '@mui/material';

export interface ICssStyle {
	[propName: string]: string | number;
}

export const dialogTitleControllerStyle: SxProps = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	background: `linear-gradient(to right bottom, #000, ${grey[800]}, ${grey[900]}, ${grey[800]}, #000)`,
	width: '97%',
	m: '70px auto 5px',
	borderRadius: 2,
};

export const paragraphStyle: ICssStyle = { color: '#fff', fontWeight: 'bold' };

export const settingsIconButtonStyle: SxProps = { fontSize: '1.4em', mr: 2, color: '#fff' };

export const dialogActionsStyle: SxProps = { display: 'flex', justifyContent: 'space-evenly' };

export const closeButtonStyle: SxProps = {
	width: '180px',
	fontSize: '1.05em',
	fontWeight: 'bold',
	p: 1.5,
	mb: 2,
};
