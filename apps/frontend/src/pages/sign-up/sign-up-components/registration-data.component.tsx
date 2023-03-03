import { FC, MouseEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
	Box,
	FormHelperText,
	FormControl,
	IconButton,
	InputLabel,
	InputAdornment,
	OutlinedInput,
	Grid,
	TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { setHelperTextStyle, passwordErrorStyle } from './sign-up.styles';

const RegistrationData: FC = () => {
	const [showPassword, setShow] = useState<boolean | null>(null);

	const handleClickShowPassword = () => {
		setShow(!showPassword);
	};

	const handleMouseDownPassword = (event: MouseEvent) => {
		event.preventDefault();
	};

	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6}>
				<Box position="relative" m="0 0 30px">
					<TextField
						autoComplete="given-name"
						required
						fullWidth
						id="firstName"
						label="First Name"
						autoFocus
						{...register('name')}
					/>
					<FormHelperText error id="component-error-text" sx={setHelperTextStyle(53)}>
						{errors['name']?.message}
					</FormHelperText>
				</Box>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Box position="relative" m="0 0 30px">
					<TextField
						required
						fullWidth
						id="lastName"
						label="Last Name"
						autoComplete="family-name"
						{...register('lastName')}
					/>
					<FormHelperText error id="component-error-text" sx={setHelperTextStyle(53)}>
						{errors['lastName']?.message}
					</FormHelperText>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box position="relative" m="0 0 30px">
					<TextField required fullWidth id="email" label="Email Address" autoComplete="email" {...register('email')} />
					<FormHelperText error id="component-error-text" sx={setHelperTextStyle(55)}>
						{errors['email']?.message}
					</FormHelperText>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<FormControl error={!!errors['password']} fullWidth sx={passwordErrorStyle} variant="outlined">
					<InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
					<OutlinedInput
						id="outlined-adornment-password"
						required
						fullWidth
						label="Password"
						type={showPassword ? 'text' : 'password'}
						autoComplete="new-password"
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
					<FormHelperText error id="component-error-password" sx={{ m: '3px 5px', ...setHelperTextStyle(55) }}>
						{errors['password']?.message}
					</FormHelperText>
				</FormControl>
				<Box position="relative">
					<TextField
						required
						fullWidth
						label="Password again"
						type="password"
						id="checkPassword"
						autoComplete="check-password"
						{...register('checkPassword')}
					/>
					<FormHelperText error id="component-error-checkPassword" sx={{ m: '3px 5px', ...setHelperTextStyle(55) }}>
						{errors['checkPassword']?.message}
					</FormHelperText>
				</Box>
			</Grid>
		</Grid>
	);
};

export default RegistrationData;
