import React, { FC, ChangeEvent } from 'react';
import { AxiosResponse } from 'axios';
import { useModal } from 'mui-modal-provider';
import { RefetchOptions, RefetchQueryFilters, QueryObserverResult } from 'react-query';
import { Box, Button, Grid, TextField, Tooltip } from '@mui/material';
import { green } from '@mui/material/colors';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import CreateControllerForm from './create-controller-form';
import EnterKeyForm from './enter-key-form';
import { ControllerDto, ListWithTotals } from '@boilerplate/shared';
import {
	inputControllerPanelStyle,
	callControllerButtonStyle,
	settingsIconStyle,
	callButtonParagraphStyle,
	accessButtonParagraphStyle,
} from './controllers.styles';

export interface IControllerPanel {
	searchHandler: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
	onControllerMutated: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<AxiosResponse<ListWithTotals<ControllerDto[]>, any>, unknown>>;
}

const ControllerPanel: FC<IControllerPanel> = ({ onControllerMutated, searchHandler }: IControllerPanel) => {
	const { showModal } = useModal();

	const openHandler = () => {
		const modal = showModal(CreateControllerForm, {
			onDataSaved: async () => {
				modal.destroy();
				await onControllerMutated();
			},
		});
	};

	const openEnterKeyForm = () => {
		showModal(EnterKeyForm, { onControllerMutated });
	};

	return (
		<Box minWidth={'360px'} width="95%" display="flex" alignItems="center" justifyContent="space-between">
			<Grid container spacing={5}>
				<Grid item xs={12} sm={12} md={6} lg={7}>
					<Box
						display="flex"
						height="100%"
						justifyContent="center"
						alignItems="center"
						borderRadius={2}
						bgcolor={green[100]}
						p={1}
					>
						<TextField
							id="outlined-basic"
							label="Enter controller name..."
							variant="outlined"
							sx={inputControllerPanelStyle}
							onChange={searchHandler}
						/>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} md={3} lg={2.5}>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						borderRadius={2}
						bgcolor={green[100]}
						p={1}
						m={0}
					>
						<Button size="small" variant="contained" color="error" sx={callControllerButtonStyle} onClick={openHandler}>
							<SettingsInputCompositeIcon sx={settingsIconStyle} />
							<p style={callButtonParagraphStyle}>Add Controller</p>
						</Button>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} md={3} lg={2.5}>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						borderRadius={2}
						bgcolor={green[100]}
						p={1}
						m={0}
					>
						<Button
							size="small"
							variant="contained"
							color="error"
							sx={callControllerButtonStyle}
							onClick={openEnterKeyForm}
						>
							<SettingsInputAntennaIcon sx={settingsIconStyle} />
							<p style={accessButtonParagraphStyle}>Get access to controller</p>
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default ControllerPanel;
