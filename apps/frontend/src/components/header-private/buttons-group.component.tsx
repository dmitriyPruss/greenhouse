import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Button, Avatar, Badge, Tooltip } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { controllersService } from '../../data-services';
import {
	ButtonsGroupMediaScreen,
	buttonsGroupButtonStyle,
	setButtonsGroupLinkStyle,
	accountIconStyle,
	notificationIconStyle,
	avatarIconStyle,
	badgeStyle,
} from './header-private.styles';

const ButtonsGroup: FC = () => {
	const { data, error, isLoading, refetch } = useQuery(
		['controllers'],
		async () => await controllersService.getControllers(),
		{
			keepPreviousData: true,
		}
	);

	const subscribeCount = data?.data?.total || null;

	return (
		<ButtonsGroupMediaScreen>
			<Tooltip title="User" arrow>
				<Button sx={buttonsGroupButtonStyle}>
					<NavLink style={({ isActive }) => setButtonsGroupLinkStyle(isActive)} to={'/user'}>
						<Avatar sx={avatarIconStyle}>
							<AccountCircleRoundedIcon sx={accountIconStyle} />
						</Avatar>
					</NavLink>
				</Button>
			</Tooltip>

			<Tooltip title="Notifications" arrow>
				<Button sx={buttonsGroupButtonStyle}>
					<NavLink style={({ isActive }) => setButtonsGroupLinkStyle(isActive)} to={'/subscribes'}>
						<Badge badgeContent={subscribeCount} color="success" sx={badgeStyle}>
							<NotificationsIcon sx={notificationIconStyle} />
						</Badge>
					</NavLink>
				</Button>
			</Tooltip>
		</ButtonsGroupMediaScreen>
	);
};

export default ButtonsGroup;
