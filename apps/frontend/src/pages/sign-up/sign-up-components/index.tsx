import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Avatar, Box, Container, Typography, Alert, AlertTitle, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CheckedDto } from '@boilerplate/shared';
import useMobxStoreHook from '../../../hooks/use-mobx-store.hook';
import RegistrationData from './registration-data.component';
import RouterSuspense from '../../../components/router-suspense.component';
import {
	SignUpMediaScreen,
	containerStyle,
	headerStyle,
	lockIconStyle,
	alertErrorStyle,
	alertTitleErrorStyle,
	continueButtonStyle,
	alertTextStyle,
	formContainerStyle,
	signInLinkStyle,
	subHeaderStyle,
} from './sign-up.styles';

const resolver = classValidatorResolver(CheckedDto);

const SignUpComponent: FC = () => {
	const methods = useForm<CheckedDto>({ resolver });
	const { handleSubmit } = methods;

	const {
		session: { signUp },
	} = useMobxStoreHook();

	let {
		session: { isLoading },
	} = useMobxStoreHook();

	const [loading, setLoading] = useState<boolean>(false);
	const [alertError, setAlertError] = useState<Error | null>(null);

	const onConfirm = async (): Promise<void> => {
		isLoading = true;
		setLoading(isLoading);
		setAlertError(null);

		await handleSubmit(async (value) => {
			try {
				await signUp(value);
			} catch (e: any) {
				setAlertError(e);

				console.error(e.message);
			} finally {
				isLoading = false;
				setLoading(isLoading);
			}
		})();
	};

	useEffect(() => {
		return () => {
			setLoading(false);
		};
	}, []);

	useEffect(() => {
		return () => {
			setAlertError(null);
		};
	}, []);

	return (
		<Container component="article" maxWidth="xs" sx={containerStyle}>
			<SignUpMediaScreen>
				{loading ? (
					<Box position="absolute" top="-39px">
						<RouterSuspense />
					</Box>
				) : (
					''
				)}
				<Typography component="h1" variant="h4" sx={headerStyle}>
					Smart Greenhouse
				</Typography>
				<Avatar sx={lockIconStyle}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5" sx={subHeaderStyle}>
					Sign up to get more features
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit(onConfirm)} sx={formContainerStyle}>
					<FormProvider {...methods}>
						<RegistrationData />
						<Box display="flex" flexDirection="column" alignItems="center" mt={3}>
							<Button type="submit" size="medium" color="secondary" variant="contained" sx={continueButtonStyle}>
								Continue
							</Button>
							<Link style={signInLinkStyle} to={'/login'}>
								Already have an account? Sign in
							</Link>
							{alertError && (
								<Alert variant="outlined" severity="error" sx={alertErrorStyle}>
									<AlertTitle sx={alertTitleErrorStyle}>Error</AlertTitle>
									<p style={alertTextStyle}>Server problems or this email already registered</p>
								</Alert>
							)}
						</Box>
					</FormProvider>
				</Box>
			</SignUpMediaScreen>
		</Container>
	);
};

export default SignUpComponent;
