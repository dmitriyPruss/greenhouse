import React, { FC, useState, useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { purple } from '@mui/material/colors';
import { Box, Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import KeyIcon from '@mui/icons-material/Key';
import KeyForm from './key-form';
import {
	dialogTitleControllerStyle,
	settingsIconButtonStyle,
	paragraphStyle,
	subParagraphStyle,
	dialogStyle,
} from './create-key-form.styles';

export type roleType = 'ADMIN' | 'READONLY';

export type ICreateKeyForm = {
	id: string;
	onDataSaved: () => Promise<void>;
};

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const CreateKeyForm: FC<ICreateKeyForm> = ({ id, onDataSaved }: ICreateKeyForm) => {
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
				maxWidth="xs"
				TransitionComponent={Transition}
				keepMounted
				onClose={closeHandler}
				aria-describedby="alert-dialog-slide-description"
				sx={dialogStyle}
			>
				<Box border={`3px solid ${purple[900]}`} m={0.2} boxSizing="border-box" borderRadius={1}>
					<DialogTitle sx={dialogTitleControllerStyle}>
						<KeyIcon sx={settingsIconButtonStyle} />
						<p style={paragraphStyle}>Create Key</p>
						<p style={subParagraphStyle}>for controller</p>
					</DialogTitle>
					<DialogContent>
						<KeyForm
							onDataSaved={onDataSaved}
							closeHandler={closeHandler}
							id={id}
							setLoading={setLoading}
							loading={loading}
						/>
					</DialogContent>
				</Box>
			</Dialog>
		</SnackbarProvider>
	);
};

export default CreateKeyForm;
