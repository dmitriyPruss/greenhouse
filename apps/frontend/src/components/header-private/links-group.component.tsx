import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, MenuList, MenuItem } from '@mui/material';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import HomeIcon from '@mui/icons-material/Home';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import {
	MainLinkMenuMediaScreen,
	LinksMenuMediaScreen,
	setLinksGroupLinkStyle,
	setMainIconStyle,
	settingApplicationIconStyle,
	menuItemStyle,
	linksGroupMenuStyle,
	linkGroupParagraphStyle,
} from './header-private.styles';

export interface ILinksGroupProps {
	open: boolean;
	handleDrawerOpen: () => void;
}

const LinksGroup: FC<ILinksGroupProps> = ({ open, handleDrawerOpen }: ILinksGroupProps) => {
	return (
		<MenuList sx={linksGroupMenuStyle}>
			<LinksMenuMediaScreen>
				<MenuItem sx={setMainIconStyle(open)} onClick={handleDrawerOpen}>
					<SettingsApplicationsIcon sx={settingApplicationIconStyle} />
				</MenuItem>
				<MainLinkMenuMediaScreen>
					<MenuItem sx={menuItemStyle}>
						<NavLink style={({ isActive }) => setLinksGroupLinkStyle(isActive)} to={'/main'}>
							{({ isActive }) =>
								isActive ? (
									<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
										<HomeIcon />
										<p style={linkGroupParagraphStyle}>Main</p>
									</Box>
								) : null
							}
						</NavLink>
						<NavLink style={({ isActive }) => setLinksGroupLinkStyle(isActive)} to={'/panel'}>
							{({ isActive }) =>
								isActive ? (
									<Box width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
										<SettingsInputComponentIcon />
										<p style={linkGroupParagraphStyle}>Control Panel</p>
									</Box>
								) : null
							}
						</NavLink>
					</MenuItem>
				</MainLinkMenuMediaScreen>
			</LinksMenuMediaScreen>
		</MenuList>
	);
};

export default LinksGroup;
