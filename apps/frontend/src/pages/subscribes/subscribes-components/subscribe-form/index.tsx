import React, { FC, useState, useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { purple } from '@mui/material/colors';
import { Box, Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CellTowerIcon from '@mui/icons-material/CellTower';
import HardwareCodeForm from './hardware-code-form';
import {
	dialogTitleControllerStyle,
	settingsIconButtonStyle,
	paragraphStyle,
	subParagraphStyle,
	dialogStyle,
} from './subscribe-form.styles';

export type ISubscribeForm = {
	id: string;
};

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const SubscribeForm: FC<ISubscribeForm> = ({ id }: ISubscribeForm) => {
	const [open, setOpen] = useState<boolean>(true);

	const closeHandler = () => {
		setOpen(false);
	};

	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		return () => {
			setOpen(false);
		};
	}, []);

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
				fullWidth={true}
				maxWidth="md"
				TransitionComponent={Transition}
				keepMounted
				onClose={closeHandler}
				aria-describedby="alert-dialog-slide-description"
				sx={dialogStyle}
			>
				<Box border={`3px solid ${purple[900]}`} m={0.2} boxSizing="border-box" borderRadius={1}>
					<DialogTitle sx={dialogTitleControllerStyle}>
						<CellTowerIcon sx={settingsIconButtonStyle} />
						<p style={paragraphStyle}>Subscribe</p>
						<p style={subParagraphStyle}>Get info about controller`s indexes and it`s values</p>
					</DialogTitle>
					<DialogContent>
						<HardwareCodeForm closeHandler={closeHandler} id={id} setLoading={setLoading} loading={loading} />
					</DialogContent>
				</Box>
			</Dialog>
		</SnackbarProvider>
	);
};

export default SubscribeForm;
