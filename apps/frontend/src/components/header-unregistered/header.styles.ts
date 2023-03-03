import { styled } from '@mui/material/styles';
import { SxProps } from '@mui/material';

export interface ICssStyle {
	[propName: string]: string | number;
}

export const menuListStyle: SxProps = {
	width: '100%',
	height: 'auto',
	bgcolor: '#E6FDE6',
};

export const linkStyle: ICssStyle = { textDecoration: 'none' };

export const ButtonGroupMediaScreen = styled('div')(({ theme }) => ({
	[theme.breakpoints.up(900)]: {
		width: '35%',
	},
	[theme.breakpoints.down(900)]: {
		width: '45%',
	},
	[theme.breakpoints.down(700)]: {
		width: '100%',
	},
}));

export const ContainerMediaScreen = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	boxSizing: 'border-box',
	[theme.breakpoints.up(700)]: {
		flexDirection: 'row',
	},
	[theme.breakpoints.down(700)]: {
		flexDirection: 'column',
	},
}));

export const HeaderMediaScreen = styled('h1')(({ theme }) => ({
	color: 'darkgreen',
	letterSpacing: 5,
	fontSize: '3em',
	opacity: 0.4,
	margin: 10,
	[theme.breakpoints.up(700)]: {
		p: '8px 0 0 24px',
		textAlign: 'start',
		width: '50%',
	},
	[theme.breakpoints.down(700)]: {
		margin: 0,
		p: 1,
		textAlign: 'center',
		width: '100%',
	},
}));

export const avatarInfoStyle: SxProps = { m: 0.5, bgcolor: 'info.main' };

export const avatarSecondaryStyle: SxProps = { m: 0.5, bgcolor: 'secondary.main' };

export const menuItemInfoStyle: SxProps = {
	m: 1,
	p: 2,
	border: '3px solid #E6FDE6',
	color: 'info.main',
	fontWeight: 'bold',
	borderRadius: 2,
	'&:hover': { bgcolor: '#CCFFCC', border: '3px solid #0288d1', boxSizing: 'border-box' },
};

export const menuItemSecondaryStyle: SxProps = {
	m: 1,
	p: 2,
	border: '3px solid #E6FDE6',
	color: 'secondary.main',
	fontWeight: 'bold',
	borderRadius: 2,
	'&:hover': { bgcolor: '#CCFFCC', border: '3px solid #9c27b0', boxSizing: 'border-box' },
};
