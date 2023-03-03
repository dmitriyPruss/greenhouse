import { grey, blue } from '@mui/material/colors';
import { SxProps } from '@mui/material';
import { gridClasses } from '@mui/x-data-grid';

export interface ICssStyle {
	[propName: string]: string | number;
}

export const inputControllerStyle: SxProps = { width: '100%' };

export const errorInputControllerStyle: SxProps = { position: 'absolute', left: 5, top: 55 };

export const errorToleranceStyle: SxProps = { width: '90%', fontSize: '1em', textAlign: 'center' };

export const sendButtonStyle: SxProps = {
	width: '180px',
	fontSize: '1.05em',
	fontWeight: 'bold',
	m: '25px 0 0px',
	p: 1.5,
};

export const indexSpecsHeader: SxProps = { color: grey[300], m: '5px 0' };

export const indexListStyle: SxProps = {
	width: '97%',
	bgcolor: grey[500],
	borderRadius: 1,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
};

export const indexListItemStyle: SxProps = {
	width: '95%',
	display: 'flex',
	flexDirection: 'column',
	bgcolor: grey[100],
	m: 1,
	borderRadius: 1,
};

export const deleteIconButtonStyle: SxProps = { bgcolor: '#444', borderRadius: 1, width: '100%' };

export const appendIndexButtonStyle: SxProps = { fontSize: '0.9em', m: '15px 0' };

export const toleranceHeaderStyle: SxProps = { color: grey[700], m: '5px 0', fontWeight: 'bold', textAlign: 'center' };

export const listItemToleranceStyle: SxProps = { width: '100%', p: '0 0 35px', mb: 2, bgcolor: grey[200] };

export const formControlToleranceStyle: SxProps = { width: '100%' };

export const listToleranceStyle: SxProps = { position: 'relative', p: 2, borderRadius: 1 };

export const colorInputTextStyle: SxProps = { textAlign: 'center' };

export const dangerColorStyle: SxProps = { bgcolor: '#f44336', ...colorInputTextStyle };

export const warnColorStyle: SxProps = { bgcolor: '#ffca28', ...colorInputTextStyle };

export const safeColorStyle: SxProps = { bgcolor: '#9ccc65', ...colorInputTextStyle };

export const deleteIconToleranceStyle: SxProps = { bgcolor: '#fff', borderRadius: 1, width: '100%' };

export const appendButtonToleranceStyle: SxProps = { fontSize: '0.8em', m: '5px 0 10px', background: blue[400] };

export const arrowIconStyle: SxProps = { fontSize: '2em' };

export const accordionDetailsStyle: SxProps = { bgcolor: 'grey' };

export const tabsContainerStyle: SxProps = { borderBottom: 1, borderColor: 'divider' };

export const tabStyle: SxProps = { color: 'green', fontWeight: 'bold' };

export const indexNameStyle: SxProps = {
	color: '#bbb',
	textAlign: 'center',
	fontSize: '1.5em',
	p: '10px 0',
	letterSpacing: '3px',
	textShadow: '0 -2px 0 #555',
	'@media screen and (max-width: 570px)': {
		fontSize: '2em',
		letterSpacing: '1px',
	},
};

export const summaryContentStyle: SxProps = {
	top: 0,
	left: 0,
	bottom: 0,
	right: 0,
	position: 'absolute',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
};

export const progressOuterContainerStyle: SxProps = { position: 'relative', display: 'inline-flex' };

export const progressInnerContainerStyle: SxProps = {
	color: grey[400],
	position: 'relative',
	transform: 'rotate(-90deg)',
};

export const backProgresstyle: SxProps = { position: 'absolute' };
export const typeContentStyle: SxProps = { fontSize: '1.1em' };

export const gridTableStyle: SxProps = {
	[`& .${gridClasses.columnHeader}`]: {
		bgcolor: grey[900],
		fontWeight: 'bold',
		fontSize: '1.3em',
	},
	[`& .${gridClasses.row}`]: {
		bgcolor: grey[800],
		color: grey[50],
		cursor: 'pointer',
		width: '100%',

		'&:hover': {
			bgcolor: grey[200],
			color: grey[900],
		},
	},
	m: '30px auto',
	p: 1,
	border: '3px solid grey',
	'& .MuiDataGrid-cell': {
		borderRight: `1px solid ${grey[500]}`,
		borderTop: `1px solid ${grey[500]}`,
		borderBottom: `1px solid ${grey[500]}`,
		display: 'flex',
		justifyContent: 'center',
	},
	'& .MuiDataGrid-columnHeaderTitleContainer': {
		color: grey[100],

		display: 'flex',
		justifyContent: 'center',
	},
	'& .MuiDataGrid-footerContainer.css-17jjc08-MuiDataGrid-footerContainer': {
		bgcolor: grey[900],
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

export const chartLoaderStyle: ICssStyle = { width: '100%', height: '100%', backgroundColor: '#000', color: '#fff' };
