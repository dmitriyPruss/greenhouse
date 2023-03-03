import { styled } from '@mui/material/styles';
import { SxProps } from '@mui/material';

export interface ICssStyle {
	[propName: string]: string | number;
}

export const SignUpMediaScreen = styled('div')(({ theme }) => ({
	marginTop: 5,
	display: 'flex',
	flexDirection: 'column',
	position: 'relative',
	alignItems: 'center',

	[theme.breakpoints.down(600)]: {
		marginTop: 1,
	},
}));

export function setHelperTextStyle(top: number): SxProps {
	return { position: 'absolute', left: 2, top };
}

export const passwordErrorStyle: SxProps = { mb: 6, position: 'relative' };

export const alertErrorStyle: SxProps = {
	width: '100%',
	marginTop: 10,
	marginBottom: 2,
	padding: '1px 5px',
	fontWeight: 'bold',
	border: '3px solid red',
	borderRadius: '7px',
};

export const alertTitleErrorStyle: SxProps = { fontWeight: 'bold', color: 'red', fontSize: '1em' };

export const continueButtonStyle: SxProps = { width: '65%', mt: 1, mb: 2 };

export const signInLinkStyle: ICssStyle = { fontSize: '0.9em' };

export const alertTextStyle: ICssStyle = { margin: '3px 0', fontSize: '0.8em' };

export const containerStyle: SxProps = { p: 1, height: '100vh' };

export const headerStyle: SxProps = { mt: 1, p: 1, color: 'green' };

export const subHeaderStyle: SxProps = { color: 'green' };

export const formContainerStyle: SxProps = { mt: 1 };

export const lockIconStyle: SxProps = { m: 0.5, bgcolor: 'secondary.main', border: '2px solid pink' };
