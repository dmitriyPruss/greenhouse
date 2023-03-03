import React, { FC, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Button, TextField, Grid, FormHelperText } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import SendIcon from '@mui/icons-material/Send';
import useMobxStoreHook from '../../../../hooks/use-mobx-store.hook';
import { HardwareCodeDto } from '@boilerplate/shared';
import RouterSuspense from '../../../../components/router-suspense.component';
import { controllersService } from '../../../../data-services';
import {
	closeButtonStyle,
	inputControllerStyle,
	sendButtonStyle,
	errorInputControllerStyle,
} from './subscribe-form.styles';

export type IEnterKeyForm = {
	closeHandler: () => void;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	id: string;
};

const resolver = classValidatorResolver(HardwareCodeDto);

const HardwareCodeForm: FC<IEnterKeyForm> = ({ closeHandler, loading, setLoading, id }: IEnterKeyForm) => {
	const methods = useForm<HardwareCodeDto>({ resolver });

	const navigate = useNavigate();

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

	const onSubmit = async (data: any): Promise<void> => {
		isLoading = true;
		setLoading(isLoading);

		try {
			const subscriptionData = await controllersService.setSubscription(id, data.hardwareCode);

			const res = subscriptionData?.data;

			res ? navigate(`/subscribes/${id}`, { replace: true }) : enqueueSnackbar('Wrong hardware code. Try again...');

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
						<TextField
							id="hardwareCode"
							label="Enter hardware code"
							sx={inputControllerStyle}
							{...register('hardwareCode')}
						/>
						<FormHelperText error id="component-error-text" sx={errorInputControllerStyle}>
							{errors['hardwareCode']?.message}
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

export default HardwareCodeForm;
