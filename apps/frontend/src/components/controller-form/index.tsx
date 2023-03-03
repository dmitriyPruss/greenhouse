import React, { FC, useState, useEffect } from 'react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';
import { Box, Button, TextField, FormHelperText, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { GridRowId } from '@mui/x-data-grid';
import useMobxStoreHook from '../../hooks/use-mobx-store.hook';
import { ControllerDto } from '@boilerplate/shared';
import IndexForm from './index-form';
import RouterSuspense from '../router-suspense.component';
import { controllersService } from '../../data-services';
import { inputControllerStyle, errorInputControllerStyle, sendButtonStyle } from './common-controller-form.styles';

const resolver = classValidatorResolver(ControllerDto);

export interface IControllerForm {
	id?: GridRowId | string;
	closeHandler: () => void;
	onDataSaved: () => void;
	currentController?: ControllerDto;
}

const ControllerForm: FC<IControllerForm> = ({ id, closeHandler, onDataSaved, currentController }: IControllerForm) => {
	let methods: UseFormReturn<ControllerDto, object>;
	let defaultValues: any = null;

	if (currentController) {
		defaultValues = currentController;

		methods = useForm<ControllerDto>({ defaultValues, resolver });
	} else {
		methods = useForm<ControllerDto>({ resolver });
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = methods;

	let {
		session: { isLoading },
	} = useMobxStoreHook();

	const { enqueueSnackbar } = useSnackbar();

	const [loading, setLoading] = useState<boolean>(false);

	const [clicked, setClicked] = useState<boolean>(false);

	const { mutateAsync: createController } = useMutation(
		async (data: ControllerDto) => await controllersService.createController(data),
		{
			onError: (error: Error) => {
				enqueueSnackbar(error.message, { variant: 'error' });
			},
			onSuccess: () => {
				enqueueSnackbar('Controller succesfully created', { variant: 'info' });
			},
		}
	);

	const { mutateAsync: updateController } = useMutation(
		async (data: any) => await controllersService.updateController(data.id, data.data),
		{
			onError: (error: Error) => {
				enqueueSnackbar(error.message, { variant: 'error' });
			},
			onSuccess: () => {
				enqueueSnackbar('Controller succesfully updated', { variant: 'success' });
			},
		}
	);

	useEffect(() => {
		return () => {
			setLoading(false);
		};
	}, []);

	const onSubmit = async (data: ControllerDto): Promise<void> => {
		isLoading = true;
		setLoading(isLoading);

		try {
			if (id) {
				await updateController({ id, data });
			} else {
				await createController(data);
			}

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
					<Grid container spacing={5}>
						<Grid item xs={12} sm={9} md={6}>
							<Box position="relative">
								<TextField id="name" label="Name" sx={inputControllerStyle} {...register('name')} />
								<FormHelperText error id="component-error-text" sx={errorInputControllerStyle}>
									{errors['name']?.message}
								</FormHelperText>
							</Box>
						</Grid>
						<Grid item xs={12} sm={9} md={6}>
							<Box position="relative">
								<TextField
									id="description"
									label="Description"
									sx={inputControllerStyle}
									{...register('description')}
								/>
								<FormHelperText error id="component-error-text" sx={errorInputControllerStyle}>
									{errors['description']?.message}
								</FormHelperText>
							</Box>
						</Grid>
					</Grid>
				</Box>
				{defaultValues ? <IndexForm {...{ defaultValues, clicked }} /> : <IndexForm clicked={clicked} />}
				<Box width="100%" display="flex" justifyContent="center">
					<Button
						variant="contained"
						type="submit"
						endIcon={<SendIcon />}
						sx={sendButtonStyle}
						onClick={() => {
							setClicked(true);
						}}
					>
						Send
					</Button>
				</Box>
			</form>
		</FormProvider>
	);
};

export default ControllerForm;
