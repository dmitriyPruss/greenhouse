import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useQuery } from 'react-query';
import { grey } from '@mui/material/colors';
import { Box, Typography, List, ListItem } from '@mui/material';
import { controllersService } from '../../data-services';
import Index from './index/index';
import { ControllerDto } from '@boilerplate/shared';
import { socketClient } from '../../socket';
import {
	controllerHeaderStyle,
	indicesHeaderStyle,
	indicesListStyle,
	indexListItemStyle,
} from './controller-data.styles';

export type controllerType = ControllerDto | undefined;

const Controller: FC = () => {
	const { id } = useParams();
	const { enqueueSnackbar } = useSnackbar();

	const { data, error, isLoading } = useQuery(
		['controller', id],
		async () => await controllersService.getControllerWithValues(id!)
	);

	const controller: controllerType = data?.data;

	const [socketController, setSocketController] = useState<controllerType>(controller);

	useEffect(() => {
		socketClient.joinController(id!);

		socketClient.subscribeOnNewValues(id!, (data) => {
			setSocketController(data);
		});

		return () => {
			socketClient.leftController(id!);
			socketClient.unsubscribeOnNewValues(id!);
		};
	}, []);

	if (error) {
		enqueueSnackbar('Error');
	}

	return (
		<Box width="100%">
			<Typography variant="h2" component="h1" sx={controllerHeaderStyle}>
				{controller?.name}
			</Typography>

			<Box width={'99%'} bgcolor={grey[600]} m="0 auto" borderRadius={1}>
				<Typography variant="h2" component="h3" sx={indicesHeaderStyle}>
					Current indices
				</Typography>

				<List sx={indicesListStyle}>
					{controller?.indexes.map((i) => {
						const socketIndex = socketController?.indexes.find((item) => i.id === item.id);

						return (
							<ListItem key={i.id} sx={indexListItemStyle}>
								<Index index={i} socketIndex={socketIndex} isLoading={isLoading} />
							</ListItem>
						);
					})}
				</List>
			</Box>
		</Box>
	);
};
export default Controller;
