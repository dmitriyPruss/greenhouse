import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Theme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HomeIcon from '@mui/icons-material/Home';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import {
	DrawerMediaScreen,
	drawerHeaderStyle,
	setDrawerStyle,
	setDrawerLinkStyle,
	setDrawerHeaderTheme,
	listItemButtonStyle,
	iconButtonDrawerStyle,
	appSettingsIconStyle,
} from './header-private.styles';

export interface IDrawerProps {
	drawerWidth: number;
	open: boolean;
	handleDrawerClose: () => void;
	theme: Theme;
}

const DrawerComponent: FC<IDrawerProps> = ({ drawerWidth, open, handleDrawerClose, theme }: IDrawerProps) => {
	const DrawerHeader = styled('div')(({ theme }) => setDrawerHeaderTheme(theme));

	return (
		<Drawer sx={setDrawerStyle(drawerWidth)} variant="persistent" anchor="left" open={open}>
			<DrawerHeader sx={drawerHeaderStyle}>
				<DrawerMediaScreen>
					<IconButton sx={iconButtonDrawerStyle} onClick={handleDrawerClose}>
						<Box display="flex" flexDirection="column" alignItems="center">
							<AppSettingsAltIcon />
							<p style={appSettingsIconStyle}>IoT Dashboard</p>
						</Box>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</DrawerMediaScreen>
			</DrawerHeader>
			<Divider />
			<List>
				{[
					{ header: 'Main', content: 'control panel' },
					{ header: 'Controllers', content: 'list of available controllers' },
				].map((text, index) => (
					<ListItem key={text.header} disablePadding>
						<ListItemButton sx={listItemButtonStyle}>
							<NavLink style={({ isActive }) => setDrawerLinkStyle(isActive)} to={index % 2 === 0 ? '/main' : '/panel'}>
								<ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <AccountTreeIcon />}</ListItemIcon>
								<ListItemText primary={text.header} secondary={text.content} />
							</NavLink>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
		</Drawer>
	);
};

export default DrawerComponent;
