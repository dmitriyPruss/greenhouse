import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import NavigationPrivate from '../components/header-private';

const AuthorizedArea: FC = () => {
	return (
		<Box minWidth="360px">
			<NavigationPrivate />
			<Outlet />
		</Box>
	);
};

export default AuthorizedArea;
