import React, { FC } from 'react';
import { Box, Card, CardContent, CardActions, Paper, Typography } from '@mui/material';
import useMobxStoreHook from '../../hooks/use-mobx-store.hook';
import DialogButton from './dialog-button';
import {
	UserCardMediaScreen,
	userCardStyle,
	cardContentStyle,
	contentStyle,
	contentHeaderStyle,
	contentFontStyle,
	emailDataStyle,
	emailStyle,
	nameStyle,
	nameDataStyle,
} from './user.styles';

const UserPage: FC = () => {
	const {
		session: { user, logOut },
	} = useMobxStoreHook();

	return (
		<Box width="100%" display="flex" justifyContent="center" alignItems="center">
			<UserCardMediaScreen>
				<Card sx={userCardStyle}>
					<CardContent sx={cardContentStyle}>
						<Paper elevation={3} sx={contentStyle}>
							<Typography variant="h4" component="h2" sx={contentHeaderStyle}>
								User info
							</Typography>
							<Typography component="div" sx={nameStyle} color="text.secondary" gutterBottom>
								<Typography component="p" sx={contentFontStyle}>
									Name
								</Typography>
								<Typography component="p" sx={nameDataStyle}>
									{user?.name}
								</Typography>
							</Typography>
							{user?.lastName ? (
								<Typography component="div" sx={nameStyle} color="text.secondary" gutterBottom>
									<Typography component="p" sx={contentFontStyle}>
										Last name
									</Typography>
									<Typography component="p" sx={nameDataStyle}>
										{user?.lastName}
									</Typography>
								</Typography>
							) : (
								''
							)}
							<Typography component="div" sx={emailStyle} color="text.secondary" gutterBottom>
								<Typography component="p" sx={contentFontStyle}>
									Email
								</Typography>
								<Typography component="p" sx={emailDataStyle}>
									{user?.email}
								</Typography>
							</Typography>
						</Paper>
					</CardContent>

					<CardActions>
						<DialogButton logOut={logOut} />
					</CardActions>
				</Card>
			</UserCardMediaScreen>
		</Box>
	);
};

export default UserPage;
