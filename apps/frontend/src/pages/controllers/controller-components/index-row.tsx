import React, { FC } from 'react';
import { TableRow, TableCell } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import { ControllerDto, IndexDto } from '@boilerplate/shared';
import { socketClient } from '../../../socket';

export interface Irow {
	controllerRow: any;
	indexRow: IndexDto;
	index: number;
}

const IndexRow: FC<Irow> = ({ controllerRow, indexRow, index }: Irow) => {
	const controller: ControllerDto = controllerRow as any;

	const [socketController, setSocketController] = React.useState<ControllerDto>(controller);

	React.useEffect(() => {
		socketClient.joinController(controllerRow.id!);
		socketClient.subscribeOnNewValues(controllerRow.id!, (data: ControllerDto) => {
			setSocketController(data);
		});

		return () => {
			socketClient.leftController(controllerRow.id!);
			socketClient.unsubscribeOnNewValues(controllerRow.id!);
		};
	}, []);

	let iconColor: string = '';
	let iconDirection: number = 0;
	let socketIndex: any = [];

	if (socketController.indexes) {
		socketIndex = socketController?.indexes[index];

		if (socketIndex?.lastValue && socketIndex?.previousValue) {
			iconColor = socketIndex?.lastValue >= socketIndex?.previousValue ? 'green' : 'red';
			iconDirection = socketIndex?.lastValue >= socketIndex?.previousValue ? 0 : 180;
		}
	}

	let lastValue = null;

	if (socketIndex.lastValue) {
		lastValue = socketIndex?.lastValue;
	}

	return (
		<TableRow key={indexRow.id}>
			<TableCell component="th" scope="indexRow">
				{indexRow.name}
			</TableCell>
			<TableCell>{lastValue || '-'}</TableCell>
			<TableCell>
				{lastValue && (
					<NorthIcon
						sx={{
							color: iconColor,
							transform: `rotate(${iconDirection}deg)`,
						}}
					/>
				)}
			</TableCell>
		</TableRow>
	);
};

export default IndexRow;
