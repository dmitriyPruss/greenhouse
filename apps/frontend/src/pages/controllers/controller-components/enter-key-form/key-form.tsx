import React, { FC, useEffect } from 'react';
import { RefetchOptions, RefetchQueryFilters, QueryObserverResult } from 'react-query';
import { AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Button, TextField, FormHelperText, Grid } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import SendIcon from '@mui/icons-material/Send';
import useMobxStoreHook from '../../../../hooks/use-mobx-store.hook';
import { KeyDto } from '@boilerplate/shared';
import RouterSuspense from '../../../../components/router-suspense.component';
import { accessesService } from '../../../../data-services';
import {
	closeButtonStyle,
	inputControllerStyle,
	errorInputControllerStyle,
	sendButtonStyle,
} from './enter-key-form.styles';

const resolver = classValidatorResolver(KeyDto);

export type IKeyForm = {
	closeHandler: () => void;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	onControllerMutated: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
};

const KeyForm: FC<IKeyForm> = ({ closeHandler, loading, setLoading, onControllerMutated }: IKeyForm) => {
	const methods = useForm<KeyDto>({ resolver });

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
			await accessesService.setAccess(data.key);

			closeHandler();
			await onControllerMutated();
		} catch (e: any) {
			console.log(e.message);

			enqueueSnackbar('Wrong key. Try again...');
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
						<TextField id="key" label="Key" sx={inputControllerStyle} {...register('key')} />
						<FormHelperText error id="component-error-text" sx={errorInputControllerStyle}>
							{errors['key']?.message}
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
