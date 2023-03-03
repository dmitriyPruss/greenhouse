import { FC } from 'react';
import { Alert, Box, Grid, Paper } from '@mui/material';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import ForestIcon from '@mui/icons-material/Forest';
import ParkIcon from '@mui/icons-material/Park';
import { alertInfo, alertStyle, iconStyle, iconsBackgroundStyle, homeCommonInfoStyle } from './home.styles-and-data';

const HomeComponent: FC = () => (
	<Grid container>
		<Box display="flex" flexDirection="column" alignItems="center">
			<Grid item xs={12} sm={12} md={10} lg={9}>
				<Paper elevation={5} sx={iconsBackgroundStyle}>
					{' '}
					<ParkIcon sx={iconStyle} />
					<ForestIcon sx={iconStyle} />
					<HouseSidingIcon sx={iconStyle} />
					<ForestIcon sx={iconStyle} />
					<ParkIcon sx={iconStyle} />
					<div>We will help you make your greenhouse truly smart!</div>
				</Paper>
			</Grid>
			<Grid item xs={12} sm={12} md={10} lg={9}>
				<Paper elevation={5} sx={homeCommonInfoStyle}>
					{alertInfo.map((i, index) => (
						<Alert key={index} variant="outlined" severity="success" sx={alertStyle}>
							{i}
						</Alert>
					))}
				</Paper>
			</Grid>
		</Box>
	</Grid>
);

export default HomeComponent;
