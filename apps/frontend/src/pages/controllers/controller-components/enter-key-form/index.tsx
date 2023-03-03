import React, { FC, useState, useEffect } from 'react';
import { RefetchOptions, RefetchQueryFilters, QueryObserverResult } from 'react-query';
import { AxiosResponse } from 'axios';
import { SnackbarProvider } from 'notistack';
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
} from './enter-key-form.styles';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="down" ref={ref} {...props} />;
});

export type IEnterKeyForm = {
	onControllerMutated: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
};

const EnterKeyForm: FC<IEnterKeyForm> = ({ onControllerMutated }: IEnterKeyForm) => {
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
				<Box border="3px solid black" m={0.2} boxSizing="border-box" borderRadius={1}>
					<DialogTitle sx={dialogTitleControllerStyle}>
						<KeyIcon sx={settingsIconButtonStyle} />
						<p style={paragraphStyle}>Enter a key</p>
						<p style={subParagraphStyle}>Get access to controller</p>
					</DialogTitle>
					<DialogContent>
						<KeyForm
							closeHandler={closeHandler}
							onControllerMutated={onControllerMutated}
							setLoading={setLoading}
							loading={loading}
						/>
					</DialogContent>
				</Box>
			</Dialog>
		</SnackbarProvider>
	);
};

export default EnterKeyForm;
