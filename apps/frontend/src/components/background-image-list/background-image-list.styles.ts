import { SxProps } from '@mui/material';

export const imageListStyle: SxProps = {
	height: '100vh',
	m: 0,
	p: 3,
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	'@media screen and (max-width: 1100px)': {
		display: 'flex',
		flexDirection: 'column',
		p: 1,
	},
};

export const evenImageStyle: SxProps = {
	border: '5px double #E6FDE6',
	mt: 3,
	'@media screen and (max-width: 1100px)': {
		mt: 0,
	},
};

export const oddImageStyle: SxProps = {
	border: '5px double #F1FFEF',
	mb: 3,
	height: '140px',
	'@media screen and (max-width: 1100px)': {
		mb: 0,
	},
};
