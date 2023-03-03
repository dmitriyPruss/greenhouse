import React, { FC, useState } from 'react';
import { useModal } from 'mui-modal-provider';
import { useQuery } from 'react-query';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import CancelIcon from '@mui/icons-material/Cancel';
import { GridRowId } from '@mui/x-data-grid';
import { SnackbarProvider } from 'notistack';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { ControllerDto } from '@boilerplate/shared';
import KeysTable from './keys-table';
import { controllersService } from '../../../../data-services';
import CreateKeyForm from './create-key-form';
import {
	dialogTitleControllerStyle,
	settingsIconButtonStyle,
	dialogActionsStyle,
	closeButtonStyle,
	paragraphStyle,
} from './key-modal-window.styles';

export interface IKeysModalWindow {
	id: GridRowId | null;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const KeysModalWindow: FC<IKeysModalWindow> = ({ id }: IKeysModalWindow) => {
	const { showModal } = useModal();
	const [open, setOpen] = useState<boolean>(true);

	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(4);

	const { data, error, isLoading, refetch } = useQuery(
		['keys', page, pageSize],
		async () => await controllersService.getKeys(id as string, { page: page + 1, pageSize }),
		{
			keepPreviousData: true,
		}
	);

	const closeHandler = () => {
		setOpen(false);
	};

	const openKeyForm = async (id: GridRowId) => {
		showModal(CreateKeyForm, {
			id: id as string,
			onDataSaved: async () => {
				await refetch();
			},
		});
	};

	return (
		<div>
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
					maxWidth="lg"
					fullWidth={true}
					TransitionComponent={Transition}
					keepMounted
					aria-describedby="alert-dialog-slide-description"
				>
					<Box border="3px solid grey" m={0.2} boxSizing="border-box" borderRadius={1}>
						<DialogTitle sx={dialogTitleControllerStyle}>
							<SettingsInputCompositeIcon sx={settingsIconButtonStyle} />
							<p style={paragraphStyle}>{(data?.data!.controller.name as any) || ''}</p>
						</DialogTitle>
						<DialogContent sx={{ display: 'flex', justifyContent: 'center', height: '600px', mt: 1 }}>
							<KeysTable
								id={id}
								data={data}
								error={error}
								isLoading={isLoading}
								refetch={refetch}
								page={page}
								setPage={setPage}
								pageSize={pageSize}
								setPageSize={setPageSize}
							/>
						</DialogContent>
						<DialogActions sx={dialogActionsStyle}>
							<Button
								variant="contained"
								color="success"
								onClick={() => openKeyForm(id!)}
								endIcon={<VpnKeyIcon />}
								sx={closeButtonStyle}
							>
								Set key
							</Button>
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

export default KeysModalWindow;
