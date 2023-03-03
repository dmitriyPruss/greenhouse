import React, { FC, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Button, Grid, FormHelperText, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import SendIcon from '@mui/icons-material/Send';
import useMobxStoreHook from '../../../../../hooks/use-mobx-store.hook';
import { RoleDto } from '@boilerplate/shared';
import RouterSuspense from '../../../../../components/router-suspense.component';
import { controllersService } from '../../../../../data-services';
import { closeButtonStyle, sendButtonStyle, errorInputControllerStyle } from './create-key-form.styles';

export type IEnterKeyForm = {
	closeHandler: () => void;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	id: string;
	onDataSaved: () => Promise<void>;
};

const resolver = classValidatorResolver(RoleDto);

const KeyForm: FC<IEnterKeyForm> = ({ closeHandler, loading, setLoading, id, onDataSaved }: IEnterKeyForm) => {
	const methods = useForm<RoleDto>({ resolver });

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = methods;

	let {
		session: { isLoading },
	} = useMobxStoreHook();

	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		return () => {
			setLoading(false);
		};
	}, []);

	const onSubmit = async (data: { name: string }): Promise<void> => {
		isLoading = true;
		setLoading(isLoading);

		try {
			await controllersService.createKey({ id, role: data.name });

			onDataSaved();
			closeHandler();
		} catch (e: any) {
			console.log(e.message);

			enqueueSnackbar(e.message);
		} finally {
			isLoading = false;
			setLoading(isLoading);
		}
	};

	return (
		<FormProvider {...methods}>
			{loading ? (
				<Box width="100%" flex="display" justifyContent="center" position="absolute" top="5px" left="0px">
					<RouterSuspense />
				</Box>
			) : (
				''
			)}
			<form
				onSubmit={handleSubmit((data) => {
					onSubmit(data);
				})}
			>
				<Box width="100%" pt={1} pb={3}>
					<Box position="relative">
						<FormControl sx={{ width: '100%' }}>
							<InputLabel id="role-name">Role</InputLabel>
							<Select defaultValue={'ADMIN'} labelId="role-name" id="role-select" label="Role" {...register(`name`)}>
								<MenuItem value={'ADMIN'}>Admin</MenuItem>
								<MenuItem value={'READONLY'}>Readonly</MenuItem>
							</Select>
						</FormControl>
						<FormHelperText error id="component-error-text" sx={errorInputControllerStyle}>
							{errors['name']?.message}
						</FormHelperText>
					</Box>
				</Box>
				<Box width="100%" display="flex" justifyContent="space-evenly">
					<Grid container spacing={3}>
						<Grid item xs={12} sm={12} md={6}>
							<Box display="flex" justifyContent="center" alignItems="center">
								<Button variant="contained" color="error" type="submit" endIcon={<SendIcon />} sx={sendButtonStyle}>
									Send
								</Button>
							</Box>
						</Grid>
						<Grid item xs={12} sm={12} md={6}>
							<Box display="flex" justifyContent="center" alignItems="center">
								<Button
									variant="contained"
									color="error"
									endIcon={<CancelIcon />}
									sx={closeButtonStyle}
									onClick={closeHandler}
								>
									Close
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</form>
		</FormProvider>
	);
};

export default KeyForm;
