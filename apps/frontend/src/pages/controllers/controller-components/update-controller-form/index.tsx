import React, { FC, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import CancelIcon from '@mui/icons-material/Cancel';
import { GridRowId } from '@mui/x-data-grid';
import { ControllerDto } from '@boilerplate/shared';
import { SnackbarProvider } from 'notistack';
import ControllerForm from '../../../../components/controller-form';
import {
	dialogTitleControllerStyle,
	settingsIconButtonStyle,
	dialogActionsStyle,
	closeButtonStyle,
	paragraphStyle,
} from './common-controller-form.styles';

export interface IUpdateController {
	id: GridRowId | null;
	currentController: ControllerDto;
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

const UpdateControllerForm: FC<IUpdateController> = ({ id, onDataSaved, currentController }: IUpdateController) => {
	const [open, setOpen] = useState<boolean>(true);

	const closeHandler = () => {
		setOpen(false);
	};

	return (
		<div>
			<SnackbarProvider
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				maxSnack={1}
			>
				<Dialog
					open={open}
					maxWidth="lg"
					fullWidth={true}
					TransitionComponent={Transition}
					keepMounted
					aria-describedby="alert-dialog-slide-description"
				>
					<Box border="3px solid grey" m={0.2} boxSizing="border-box" borderRadius={1}>
						<DialogTitle sx={dialogTitleControllerStyle}>
							<SettingsInputCompositeIcon sx={settingsIconButtonStyle} />
							<p style={paragraphStyle}>Update controller</p>
						</DialogTitle>
						<DialogContent>
							<ControllerForm
								id={id as any}
								currentController={currentController}
								closeHandler={closeHandler}
								onDataSaved={onDataSaved}
							/>
						</DialogContent>
						<DialogActions sx={dialogActionsStyle}>
							<Button
								variant="contained"
								color="error"
								onClick={closeHandler}
								endIcon={<CancelIcon />}
								sx={closeButtonStyle}
							>
								Close
							</Button>
						</DialogActions>
					</Box>
				</Dialog>
			</SnackbarProvider>
		</div>
	);
};

export default UpdateControllerForm;
