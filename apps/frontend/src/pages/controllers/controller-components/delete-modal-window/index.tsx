import React, { FC } from 'react';
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { TransitionProps } from '@mui/material/transitions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteForm from './delete-form';
import { dialogTitleStyle, setIconStyle } from './delete-modal-window.styles';

export interface IDeleteModalWindow {
	id: string;
	onDataSaved: () => Promise<void>;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const DeleteModalWindow: FC<IDeleteModalWindow> = ({ id, onDataSaved }: IDeleteModalWindow) => {
	const [open, setOpen] = React.useState<boolean>(true);

	const closeHandler = () => {
		setOpen(false);
	};

	return (
		<SnackbarProvider
			variant="error"
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			maxSnack={1}
		>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={closeHandler}
				aria-describedby="alert-dialog-slide-description"
			>
				<Box border="3px solid black" m={0.2} boxSizing="border-box" borderRadius={1}>
					<DialogTitle sx={dialogTitleStyle}>
						<DeleteForeverIcon sx={setIconStyle('2.3em')} />
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-slide-description">
							Are you sure you want to delete this controller?
						</DialogContentText>
					</DialogContent>
					<DeleteForm id={id} closeHandler={closeHandler} onDataSaved={onDataSaved} />
				</Box>
			</Dialog>
		</SnackbarProvider>
	);
};

export default DeleteModalWindow;
