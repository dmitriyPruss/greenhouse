import React, { FC } from 'react';
import { Button, DialogActions } from '@mui/material';
import { useSnackbar } from 'notistack';
import { controllersService } from '../../../../data-services';
import { useMutation } from 'react-query';
import { dialogActionStyle, dialogButtonStyle } from './delete-modal-window.styles';

export interface IDeleteForm {
	id: string;
	closeHandler: () => void;
	onDataSaved: () => Promise<void>;
}

const DeleteForm: FC<IDeleteForm> = ({ id, closeHandler, onDataSaved }: IDeleteForm) => {
	const { enqueueSnackbar } = useSnackbar();

	const { mutateAsync: deleteController } = useMutation(
		async (id: string) => await controllersService.deleteController(id),
		{
			onError: (error: Error) => {
				enqueueSnackbar(error.message, { variant: 'error' });
			},
			onSuccess: () => {
				enqueueSnackbar('Controller succesfully deleted', { variant: 'success' });
			},
		}
	);

	const deleteHandler = async () => {
		await deleteController(id);
		onDataSaved();
		closeHandler();
	};

	return (
		<DialogActions sx={dialogActionStyle}>
			<Button variant="contained" color="info" onClick={deleteHandler} sx={dialogButtonStyle}>
				Yes
			</Button>
			<Button variant="contained" color="success" onClick={closeHandler} sx={dialogButtonStyle}>
				No
			</Button>
		</DialogActions>
	);
};

export default DeleteForm;
