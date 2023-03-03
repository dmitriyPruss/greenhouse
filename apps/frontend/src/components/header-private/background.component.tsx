import React, { FC } from 'react';
import { Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import YardIcon from '@mui/icons-material/Yard';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import { green } from '@mui/material/colors';
import { iconStyle, iconLessMdHiddenStyle, iconLessSmHiddenStyle } from './header-private.styles';

const BackgroundComponent: FC = () => (
	<Box
		position="absolute"
		zIndex={2}
		width="100%"
		height="100%"
		display="flex"
		justifyContent="space-evenly"
		alignItems="center"
		bgcolor={green[400]}
		p="0 10px"
	>
		<HomeIcon sx={iconLessMdHiddenStyle} />
		<YardIcon sx={iconLessSmHiddenStyle} />
		<DisplaySettingsIcon sx={iconStyle} />
		<ChangeCircleIcon sx={iconLessSmHiddenStyle} />
		<AppSettingsAltIcon sx={iconStyle} />
		<YardIcon sx={iconLessSmHiddenStyle} />
		<HomeIcon sx={iconLessMdHiddenStyle} />
	</Box>
);

export default BackgroundComponent;
