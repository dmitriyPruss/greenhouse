import { styled } from '@mui/material/styles';

export const HomeMediaScreen = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	boxSizing: 'border-box',
	minWidth: '380px',
	width: '100%',
	height: '100vh',
	backgroundColor: '#CCFFCC',
	[theme.breakpoints.down(670)]: {
		height: '100%',
	},
}));
