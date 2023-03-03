import { styled } from '@mui/material/styles';
import { SxProps } from '@mui/material';
import { green } from '@mui/material/colors';

export const UserCardMediaScreen = styled('div')(({ theme }) => ({
	width: '45%',
	margin: '20px auto',

	[theme.breakpoints.down(1000)]: {
		width: '55%',
	},
	[theme.breakpoints.down(800)]: {
		width: '70%',
	},
	[theme.breakpoints.down(600)]: {
		width: '90%',
	},
}));

export const userCardStyle: SxProps = {
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
};

export const cardContentStyle: SxProps = { backgroundColor: green[200] };

export const contentStyle: SxProps = { display: 'flex', flexDirection: 'column', alignItems: 'center' };

export const contentHeaderStyle: SxProps = {
	color: green[200],
	letterSpacing: '3px',
	textShadow: `0px 1px 0px ${green[800]}`,
};

export const nameStyle: SxProps = { mt: 1.5, ...contentStyle };

export const nameDataStyle: SxProps = { fontWeight: 'bold', letterSpacing: '3px' };

export const contentFontStyle: SxProps = { fontSize: '12px' };

export const emailStyle: SxProps = { mt: 1.5, mb: 2, ...contentStyle };

export const emailDataStyle: SxProps = { fontWeight: 'bold' };
