import { FC, MouseEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
	Alert,
	AlertTitle,
	Avatar,
	Box,
	Button,
	Checkbox,
	Container,
	FormControl,
	FormControlLabel,
	FormHelperText,
	IconButton,
	InputLabel,
	InputAdornment,
	OutlinedInput,
	TextField,
	Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockSharpIcon from '@mui/icons-material/LockSharp';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import useMobxStoreHook from '../../../hooks/use-mobx-store.hook';
import { LoginDto } from '@boilerplate/shared';
import RouterSuspense from '../../../components/router-suspense.component';
import {
	alertErrorStyle,
	containerStyle,
	headerStyle,
	emailInputStyle,
	emailErrorStyle,
	linkStyle,
	lockIconStyle,
	passwordInputStyle,
	passwordErrorStyle,
	signInButtonStyle,
	alertErrorTitleStyle,
	alertErrorTextStyle,
	subHeaderStyle,
} from './login.styles';

const resolver = classValidatorResolver(LoginDto);

const LoginComponent: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginDto>({ resolver });

	const {
		session: { login },
	} = useMobxStoreHook();

	let {
		session: { isLoading },
	} = useMobxStoreHook();

	const [loading, setLoading] = useState<boolean>(false);
	const [alertError, setAlertError] = useState<Error | null>(null);

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

	const onConfirm = async (): Promise<void> => {
		isLoading = true;
		setLoading(isLoading);
		setAlertError(null);

		await handleSubmit(async (value) => {
			try {
				await login(value);
			} catch (e: any) {
				setAlertError(e);

				console.error(e.message);
			} finally {
				isLoading = false;
				setLoading(isLoading);
			}
		})();
	};

	const [showPassword, setShow] = useState<boolean>(false);

	const handleClickShowPassword = () => {
		setShow(!showPassword);
	};

	const handleMouseDownPassword = (event: MouseEvent) => {
		event.preventDefault();
	};

	return (
		<Container component="article" maxWidth="xs" sx={containerStyle}>
			<Box display="flex" flexDirection="column" alignItems="center" mt={8} position="relative">
				{loading ? (
					<Box position="absolute" top="-70px">
						<RouterSuspense />
					</Box>
				) : (
					''
				)}
				<Typography component="h1" variant="h4" sx={headerStyle}>
					Smart Greenhouse
				</Typography>
				<Avatar sx={lockIconStyle}>
					<LockSharpIcon />
				</Avatar>
				<Typography component="h2" variant="h5" sx={subHeaderStyle}>
					Login to get more features
				</Typography>
				<Box component="form" onSubmit={handleSubmit(onConfirm)} noValidate mt={1}>
					<FormControl fullWidth sx={emailInputStyle}>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Email Address"
							autoComplete="email"
							autoFocus
							error={!!errors.email}
							aria-describedby="component-error-text"
							{...register('email')}
						/>
						<FormHelperText error id="component-error-text" sx={emailErrorStyle}>
							{errors.email?.message}
						</FormHelperText>
					</FormControl>
					<FormControl error={!!errors.password} fullWidth sx={passwordInputStyle} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							required
							fullWidth
							label="Password"
							type={showPassword ? 'text' : 'password'}
							autoComplete="current-password"
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
							aria-describedby="component-error-password"
							{...register('password')}
						/>
						<FormHelperText error id="component-error-password" sx={passwordErrorStyle}>
							{errors.password?.message}
						</FormHelperText>
					</FormControl>

					<FormControlLabel control={<Checkbox {...register('remember')} color="primary" />} label="Remember me" />
					<Box display="flex" flexDirection="column" alignItems="center" mt={3}>
						<Button type="submit" size="medium" variant="contained" sx={signInButtonStyle}>
							Sign in
						</Button>
						<Link style={linkStyle} to={'/signup'}>
							Don't have an account? Sign Up
						</Link>
						{alertError && (
							<Alert variant="filled" severity="error" sx={alertErrorStyle}>
								<AlertTitle sx={alertErrorTitleStyle}>Error</AlertTitle>
								<p style={alertErrorTextStyle}>User not found. Try again!</p>
							</Alert>
						)}
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

export default LoginComponent;
