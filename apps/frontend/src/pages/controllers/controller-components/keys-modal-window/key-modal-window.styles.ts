import { SxProps } from '@mui/material';
import { teal, grey } from '@mui/material/colors';
import { gridClasses } from '@mui/x-data-grid';

export interface ICssStyle {
	[propName: string]: string | number;
}

export const dialogTitleControllerStyle: SxProps = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	background: `linear-gradient(to right bottom, ${teal[700]}, ${teal[900]}, ${teal[700]})`,
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

export const subHeaderStyle: SxProps = {
	bgcolor: teal[100],
	borderRadius: 2,
	color: teal[800],
	textAlign: 'center',
	p: 1,
};

export const gridTableStyle: SxProps = {
	[`& .${gridClasses.columnHeader}`]: {
		background: `linear-gradient(to right bottom, ${teal[700]}, ${teal[900]}, ${teal[700]})`,
		fontWeight: 'bold',
		borderRadius: 1,
	},
	[`& .${gridClasses.row}`]: {
		bgcolor: teal[100],
		cursor: 'pointer',
		width: '100%',
		borderRadius: 1,
		mb: 1,
		'&:hover': {
			bgcolor: teal[200],
			color: grey[900],
			fontWeight: 'bold',
		},
	},
	m: '5px auto 15px',
	p: 1,
	border: `7px double ${teal[800]}`,
	'& .MuiDataGrid-cell': {
		display: 'flex',
		justifyContent: 'center',
		borderRight: '1px dashed #eee',

		'&:hover': {
			bgcolor: teal[300],
		},
	},
	'& .MuiDataGrid-columnHeaderTitleContainer': {
		color: '#fff',
		borderRadius: 1,
		display: 'flex',
		justifyContent: 'center',
	},
	'& .MuiDataGrid-footerContainer.css-17jjc08-MuiDataGrid-footerContainer': {
		background: `linear-gradient(to right bottom, ${teal[700]}, ${teal[900]}, ${teal[700]})`,
		borderRadius: 1,
	},
	'& .MuiTablePagination-actions': {
		color: grey[50],
		fontWeight: 'bold',
	},
	'& .MuiTablePagination-displayedRows': {
		color: grey[50],
		fontWeight: 'bold',
	},
};
