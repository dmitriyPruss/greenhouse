import { styled } from '@mui/material/styles';
import { green, teal, purple, grey } from '@mui/material/colors';
import { SxProps, Theme } from '@mui/material';

export interface ICssStyle {
	[propName: string]: string | number;
}

export const appBarStyle: SxProps = {
	position: 'relative',
};
export const drawerHeaderStyle: SxProps = { p: 0 };

export const LinksMenuMediaScreen = styled('div')(({ theme }) => ({
	width: '55%',
	display: 'flex',
	justifyContent: 'flex-start',

	[theme.breakpoints.down(1000)]: {
		width: '67%',
	},
	[theme.breakpoints.down(900)]: {
		width: '95%',
		justifyContent: 'center',
	},
	[theme.breakpoints.down(730)]: {
		width: '97%',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export const MainLinkMenuMediaScreen = styled('div')(({ theme }) => ({
	width: '42%',

	[theme.breakpoints.down(1100)]: {
		width: '50%',
	},
	[theme.breakpoints.down(800)]: {
		width: '30%',
	},
	[theme.breakpoints.down(730)]: {
		width: '80%',
	},
}));

export const AboutLinkMenuMediaScreen = styled('div')(({ theme }) => ({
	width: '35%',

	[theme.breakpoints.down(800)]: {
		width: '25%',
	},
	[theme.breakpoints.down(730)]: {
		width: '70%',
	},
}));

export interface IIcon {
	fontSize: string | number;
	color: string;
}

export interface IIconStyle<T> extends IIcon {
	display?: T;
}

export const iconStyle: IIcon = { fontSize: '4em', color: green[500] };

export const iconLessMdHiddenStyle: IIconStyle<{ xs: 'none'; md: 'block' }> = {
	...iconStyle,
	display: { xs: 'none', md: 'block' },
};

export const iconLessSmHiddenStyle: IIconStyle<{ xs: 'none'; sm: 'block' }> = {
	...iconStyle,
	display: { xs: 'none', sm: 'block' },
};

export const ButtonsGroupMediaScreen = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-evenly',
	width: '35%',
	zIndex: 3,

	[theme.breakpoints.down(900)]: {
		width: '45%',
	},
	[theme.breakpoints.down(800)]: {
		width: '70%',
	},
}));

export const DrawerMediaScreen = styled('div')(({ theme }) => ({
	backgroundColor: '#43A047',
	width: '100%',
	height: '90px',
	display: 'flex',
	justifyContent: 'center',
	boxShadow: '0px 1px 5px grey',

	[theme.breakpoints.down(800)]: {
		height: '180px',
	},
	[theme.breakpoints.down(730)]: {
		height: '280px',
	},
}));

export const HeaderMediaScreen = styled('div')(({ theme }) => ({
	display: 'flex',

	[theme.breakpoints.down(800)]: {
		flexDirection: 'column',
	},
	[theme.breakpoints.down(730)]: {
		alignItems: 'center',
	},
}));

export const BarMediaScreen = styled('div')(({ theme }) => ({
	display: 'flex',
	width: '100%',
	height: '90px',

	[theme.breakpoints.down(800)]: {
		height: '180px',
		mb: 3,
	},
	[theme.breakpoints.down(730)]: {
		height: '280px',
	},
}));

export const ToolbarMediaScreen = styled('div')(({ theme }) => ({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',

	[theme.breakpoints.down(800)]: {
		flexDirection: 'column',
	},
}));

export function setLinksGroupLinkStyle(isActive: boolean): ICssStyle {
	return {
		display: 'none',
		...(isActive
			? {
					height: '100%',
					width: '100%',
					padding: '1px',
					fontWeight: 'bold',
					textShadow: `0px 1px 0px ${teal[50]}`,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					color: grey[900],
					fontSize: '1.2em',
					textDecoration: 'none',
			  }
			: {}),
	};
}

export function setButtonsGroupLinkStyle(isActive: boolean): ICssStyle {
	return {
		height: '95%',
		borderRadius: 5,
		width: '97%',
		padding: '1px',
		textDecoration: 'none',
		fontSize: '1.1em',
		fontWeight: 'bold',
		color: '#111',
		textShadow: `0px 1px 0px ${teal[50]}`,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '',
		...(isActive ? { fontSize: '1.2em', backgroundColor: purple[200] } : {}),
	};
}

export function setControllerLinkStyle(isActive: boolean): ICssStyle {
	return {
		height: '95%',
		borderRadius: 5,
		width: '97%',
		padding: '1px',
		textDecoration: 'none',
		fontSize: '1.1em',
		fontWeight: 'bold',
		color: '#111',
		textShadow: `0px 1px 0px ${teal[50]}`,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '',
		...(isActive ? { fontSize: '1.2em', backgroundColor: purple[500] } : {}),
	};
}

export const buttonsGroupButtonStyle: SxProps = {
	m: 1.2,
	p: 0,
	border: `3px solid ${green[700]}`,
	bgcolor: green[100],
	fontWeight: 'bold',
	borderRadius: 2,
	width: '64px',
	display: 'flex',
	justifyContent: 'center',
	'&:hover': {
		bgcolor: '#fff',
		border: `3px solid ${green[800]}`,
		boxSizing: 'border-box',
		transform: 'scale(1.1)',
	},
};

export const avatarIconStyle: SxProps = { m: 0.2, bgcolor: 'text.primary' };

export const accountIconStyle: SxProps = { p: 0, fontSize: '2em' };

export const notificationIconStyle: SxProps = { color: '#111', p: 0, fontSize: '1.7em' };

export const badgeStyle: SxProps = { m: 0.5 };

export function setMainIconStyle(open: boolean): SxProps {
	return {
		mr: 1,
		width: '21%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		...(open && { display: 'none' }),
		'&:hover': {
			bgcolor: green[600],
		},
		'@media screen and (max-width: 730px)': {
			width: '70%',
		},
	};
}

export const settingApplicationIconStyle: SxProps = {
	m: 2,
	fontSize: '3em',
	padding: '1px',
	bgcolor: green[100],
	color: '#111',
	borderRadius: '10px',
};

export const menuItemStyle: SxProps = {
	width: '100%',
	height: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: 0,
	cursor: 'default',
};

export const linksGroupMenuStyle: SxProps = {
	width: '100%',
	display: 'flex',
	zIndex: 3,
};

export const linkGroupParagraphStyle: ICssStyle = {
	margin: '5px 0',
};

// Drawer
export function setDrawerHeaderTheme(theme: Theme) {
	return {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	};
}

export function setDrawerStyle(drawerWidth: number): SxProps {
	return {
		width: drawerWidth,
		position: 'absolute',
		flexShrink: 0,
		'& .MuiDrawer-paper': {
			width: drawerWidth,
			boxSizing: 'border-box',
		},
	};
}

export function setDrawerLinkStyle(isActive: boolean): ICssStyle {
	return {
		height: '100%',
		width: '100%',
		padding: '3px',
		fontSize: '1.1em',
		fontWeight: 'bold',
		color: '#111',
		textShadow: `0px 1px 0px ${teal[50]}`,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textDecoration: 'none',
		background: '',
		...(isActive ? { fontSize: '1.2em', background: purple[100] } : {}),
	};
}

export const listItemButtonStyle: SxProps = { p: 0, m: '2px 0' };

export const iconButtonDrawerStyle: SxProps = { display: 'flex', width: '100%', height: '99%', m: 0 };

export const appSettingsIconStyle: ICssStyle = { fontSize: '0.7em', margin: '2px 0' };
