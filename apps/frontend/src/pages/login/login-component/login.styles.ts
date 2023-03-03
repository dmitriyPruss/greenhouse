import { SxProps } from '@mui/material';

export interface ICssStyle {
	[propName: string]: string | number;
}

export const containerStyle: SxProps = { p: 1, height: '100vh' };

export const headerStyle: SxProps = { m: 1, p: 1, color: 'green' };

export const subHeaderStyle: SxProps = { color: 'green' };

export const lockIconStyle: SxProps = { m: 0.5, bgcolor: 'info.main', border: '2px solid green' };

export const emailInputStyle: SxProps = { mb: 3, position: 'relative' };

export const emailErrorStyle: SxProps = { position: 'absolute', top: 70 };

export const passwordInputStyle: SxProps = { mt: 1, mb: 5, position: 'relative' };

export const passwordErrorStyle: SxProps = { position: 'absolute', top: 57 };

export const signInButtonStyle: SxProps = { width: '65%', mb: 4 };

export const alertErrorTitleStyle: SxProps = { fontWeight: 'bold', fontSize: '1.1em' };

export const alertErrorStyle: SxProps = {
	width: '75%',
	marginTop: 10,
	fontWeight: 'bold',
	border: '3px solid pink',
	borderRadius: '7px',
};

export const alertErrorTextStyle: ICssStyle = { margin: '3px 0', fontSize: '0.8em' };

export const linkStyle: ICssStyle = { fontSize: '0.9em' };
