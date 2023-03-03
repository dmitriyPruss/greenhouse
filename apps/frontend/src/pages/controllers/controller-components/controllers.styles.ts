import { SxProps } from '@mui/material';
import { green, grey } from '@mui/material/colors';

export interface ICssStyle {
	[propName: string]: string | number;
}

export const inputControllerPanelStyle: SxProps = { width: '95%', bgcolor: '#fff' };

export const submitButtonStyle: SxProps = {
	backgroundColor: green[900],
	borderRadius: '5px',
	fontWeight: 'bold',
	m: 1,
	p: '0 35px',
	height: '55px',
};

export const errorBoxStyle: SxProps = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '300px',
	width: '90%',
};

export const errorTextStyle: SxProps = { color: 'red', fontSize: '2em' };

export const tableStyle: SxProps = {
	bgcolor: grey[800],
	m: '10px auto',
	p: 1,
	width: '380px',

	background: `linear-gradient( #111, ${grey[800]}, #111, black)`,
	'& .MuiDataGrid-cell': {
		display: 'flex',
		justifyContent: 'center',

		'&:hover': {
			bgcolor: grey[300],
		},
	},
	'& .MuiDataGrid-columnHeaderTitleContainer': {
		color: grey[300],
		borderRadius: 2,
		display: 'flex',
		justifyContent: 'center',
	},
	'& .MuiDataGrid-footerContainer.css-17jjc08-MuiDataGrid-footerContainer': {
		background: `linear-gradient( #333, ${grey[600]}, #333, #111)`,
		borderRadius: 2,
	},
	'& .MuiTablePagination-displayedRows': {
		color: grey[50],
		fontWeight: 'bold',
	},
	'& .MuiTablePagination-selectLabel': {
		display: 'none',
	},
	'& .MuiNativeSelect-select': {
		display: 'none',
	},
	'& .MuiTablePagination-select': {
		display: 'none',
	},
	'& .MuiTablePagination-actions': {
		color: grey[50],
	},
	'& .MuiButtonBase-root': {
		cursor: 'pointer',
		color: grey[50],
	},
};

export const callControllerButtonStyle: SxProps = {
	m: 1,
	backgroundColor: green[900],
	borderRadius: '5px',
	p: '8px',
	height: '55px',
};

export const settingsIconStyle: SxProps = { ml: 0.5, p: 0, fontSize: '1.4em', color: '#fff', mr: 1 };

export const callButtonParagraphStyle: ICssStyle = { fontWeight: 'bold' };

export const accessButtonParagraphStyle: ICssStyle = { fontWeight: 'bold', fontSize: '0.9em' };

export const accordionSummaryTextStyle: SxProps = { fontSize: '1.1em', width: '70%', flexShrink: 0 };

export const indexListItemStyle: SxProps = {
	display: 'flex',
	justifyContent: 'space-between',
	bgcolor: grey[900],
	borderRadius: 2,
	mb: 1,
	width: '98%',
};

export const nameListItemStyle: SxProps = { width: '59%', color: grey[50], fontSize: '1em' };

export const lastValueListItemStyle: SxProps = {
	width: '38%',
	bgcolor: grey[700],
	color: grey[50],
	borderRadius: 1,
	textAlign: 'center',
	fontSize: '1em',
};
