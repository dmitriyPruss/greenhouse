import { grey, blue } from '@mui/material/colors';
import { SxProps } from '@mui/material';

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

export const listToleranceStyle: SxProps = { position: 'relative', borderRadius: 1 };

export const colorInputTextStyle: SxProps = { textAlign: 'center' };

export const dangerColorStyle: SxProps = { bgcolor: '#f44336', ...colorInputTextStyle };

export const warnColorStyle: SxProps = { bgcolor: '#ffca28', ...colorInputTextStyle };

export const safeColorStyle: SxProps = { bgcolor: '#9ccc65', ...colorInputTextStyle };

export const deleteIconToleranceStyle: SxProps = { bgcolor: '#fff', borderRadius: 1, width: '100%' };

export const appendButtonToleranceStyle: SxProps = { fontSize: '0.8em', m: '5px 0 10px', background: blue[400] };
