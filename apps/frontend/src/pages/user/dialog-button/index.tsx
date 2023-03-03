import React, { FC } from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	Tooltip,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import ForestIcon from '@mui/icons-material/Forest';
import ParkIcon from '@mui/icons-material/Park';
import LogoutIcon from '@mui/icons-material/Logout';
import {
	buttonStyle,
	dialogTitleStyle,
	setIconStyle,
	dialogActionStyle,
	dialogButtonStyle,
	logoutIconStyle,
} from './dialog-button.styles';

export interface IDialogButton {
	logOut: () => Promise<void>;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const DialogButton: FC<IDialogButton> = ({ logOut }: IDialogButton) => {
	const [open, setOpen] = React.useState<boolean>(false);

	const closeHandler = () => {
		setOpen(false);
	};

	const openHandler = () => {
		setOpen(true);
	};

	const logOutHandler = async () => {
		closeHandler();
		await logOut();
	};

	return (
		<div>
			<Tooltip title="Logout" arrow>
				<Button size="small" variant="contained" color="error" sx={buttonStyle} onClick={openHandler}>
					<LogoutIcon sx={logoutIconStyle} />
				</Button>
			</Tooltip>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={closeHandler}
				aria-describedby="alert-dialog-slide-description"
			>
				<Box border="3px solid darkgreen" m={0.2} boxSizing="border-box" borderRadius={1}>
					<DialogTitle sx={dialogTitleStyle}>
						{' '}
						<ParkIcon sx={setIconStyle('1.7em')} />
						<ForestIcon sx={setIconStyle('2em')} />
						<HouseSidingIcon sx={setIconStyle('2.3em')} />
						<ForestIcon sx={setIconStyle('2em')} />
						<ParkIcon sx={setIconStyle('1.7em')} />
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-slide-description">Are you sure you want to exit?</DialogContentText>
					</DialogContent>
					<DialogActions sx={dialogActionStyle}>
						<Button variant="contained" color="success" onClick={closeHandler} sx={dialogButtonStyle}>
							Disagree
						</Button>
						<Button variant="contained" color="success" onClick={logOutHandler} sx={dialogButtonStyle}>
							Agree
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</div>
	);
};

export default DialogButton;
