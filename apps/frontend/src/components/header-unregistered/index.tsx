import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, MenuList, MenuItem, ListItemText } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockSharpIcon from '@mui/icons-material/LockSharp';
import {
	HeaderMediaScreen,
	ButtonGroupMediaScreen,
	ContainerMediaScreen,
	avatarInfoStyle,
	menuListStyle,
	menuItemInfoStyle,
	avatarSecondaryStyle,
	menuItemSecondaryStyle,
	linkStyle,
} from './header.styles';

const Header: FC = () => (
	<MenuList sx={menuListStyle}>
		<ContainerMediaScreen>
			<HeaderMediaScreen>Greenhouses</HeaderMediaScreen>
			<ButtonGroupMediaScreen>
				<Box display="flex" justifyContent="space-evenly">
					<Link to="/login" style={linkStyle}>
						<MenuItem sx={menuItemInfoStyle}>
							<Avatar sx={avatarInfoStyle}>
								<LockSharpIcon />
							</Avatar>
							<ListItemText>Sign In</ListItemText>
						</MenuItem>
					</Link>
					<Link to="/signup" style={linkStyle}>
						<MenuItem sx={menuItemSecondaryStyle}>
							<Avatar sx={avatarSecondaryStyle}>
								<LockOutlinedIcon />
							</Avatar>
							<ListItemText>Sign Up</ListItemText>
						</MenuItem>
					</Link>
				</Box>
			</ButtonGroupMediaScreen>
		</ContainerMediaScreen>
	</MenuList>
);

export default Header;
