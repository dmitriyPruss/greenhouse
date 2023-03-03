import React, { FC, useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import CancelIcon from '@mui/icons-material/Cancel';
import { SnackbarProvider } from 'notistack';
import ControllerForm from '../../../../components/controller-form';
import {
	dialogTitleControllerStyle,
	settingsIconButtonStyle,
	dialogActionsStyle,
	closeButtonStyle,
	paragraphStyle,
} from './common-controller-form.styles';

export type ICommonControllerForm = {
	onDataSaved: () => void;
};

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const CreateControllerForm: FC<ICommonControllerForm> = ({ onDataSaved }: ICommonControllerForm) => {
	const [open, setOpen] = useState<boolean>(true);

	const closeHandler = () => {
		setOpen(false);
	};

	useEffect(() => {
		return () => {
			setOpen(false);
		};
	}, []);

	return (
		<SnackbarProvider
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			maxSnack={1}
		>
			<Dialog
				open={open}
				fullWidth={true}
				maxWidth="lg"
				TransitionComponent={Transition}
				keepMounted
				onClose={closeHandler}
				aria-describedby="alert-dialog-slide-description"
			>
				<Box border="3px solid blue" m={0.2} boxSizing="border-box" borderRadius={1}>
					<DialogTitle sx={dialogTitleControllerStyle}>
						<SettingsInputCompositeIcon sx={settingsIconButtonStyle} />
						<p style={paragraphStyle}>Create new controller</p>
					</DialogTitle>
					<DialogContent>
						<ControllerForm closeHandler={closeHandler} onDataSaved={onDataSaved} />
					</DialogContent>
					<DialogActions sx={dialogActionsStyle}>
						<Button
							variant="contained"
							color="error"
							endIcon={<CancelIcon />}
							sx={closeButtonStyle}
							onClick={closeHandler}
						>
							Close
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</SnackbarProvider>
	);
};

export default CreateControllerForm;
