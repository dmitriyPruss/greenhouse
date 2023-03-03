import React, { FC, ChangeEvent } from 'react';
import { Box, Grid, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import { inputControllerPanelStyle } from './subscribes.styles';

export interface IControllerPanel {
	searchHandler: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const SubscribeSearchPanel: FC<IControllerPanel> = ({ searchHandler }: IControllerPanel) => {
	return (
		<Box minWidth={'360px'} width="90%" display="flex" alignItems="center" justifyContent="space-between">
			<Grid container spacing={5}>
				<Grid item xs={12} sm={12} md={12}>
					<Box
						display="flex"
						height="100%"
						justifyContent="center"
						alignItems="center"
						borderRadius={2}
						bgcolor={grey[300]}
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
			</Grid>
		</Box>
	);
};

export default SubscribeSearchPanel;
