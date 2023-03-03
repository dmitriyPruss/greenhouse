import React, { FC, useState } from 'react';
import { CssBaseline, Toolbar } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import DrawerComponent from './drawer.component';
import BackgroundComponent from './background.component';
import ButtonsGroup from './buttons-group.component';
import LinksGroup from './links-group.component';
import { appBarStyle, HeaderMediaScreen, BarMediaScreen, ToolbarMediaScreen } from './header-private.styles';

export interface IAppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const NavigationPrivate: FC = () => {
	const drawerWidth = 200;

	const AppBar = styled(MuiAppBar, {
		shouldForwardProp: (prop) => prop !== 'open',
	})<IAppBarProps>(({ theme, open }) => ({
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		...(open && {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: `${drawerWidth}px`,
			transition: theme.transitions.create(['margin', 'width'], {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
		}),
	}));

	const theme = useTheme();

	const [open, setOpen] = useState<boolean>(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<HeaderMediaScreen>
			<CssBaseline />
			<BarMediaScreen>
				<AppBar open={open} sx={appBarStyle}>
					<Toolbar>
						<ToolbarMediaScreen>
							<LinksGroup open={open} handleDrawerOpen={handleDrawerOpen} />
							<ButtonsGroup />
						</ToolbarMediaScreen>
					</Toolbar>
					<BackgroundComponent />
				</AppBar>
			</BarMediaScreen>
			<DrawerComponent drawerWidth={drawerWidth} open={open} handleDrawerClose={handleDrawerClose} theme={theme} />
		</HeaderMediaScreen>
	);
};

export default NavigationPrivate;
