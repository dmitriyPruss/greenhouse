import React, { FC } from 'react';
import { Box } from '@mui/material';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { DataGrid, GridRowSpacingParams, GridColDef } from '@mui/x-data-grid';
import { ValueDto } from '@boilerplate/shared';
import { gridTableStyle } from './index.styles';

export interface IValuesTable {
	rows: ValueDto[];
	isLoading: boolean;
}

const ValuesTable: FC<IValuesTable> = ({ rows, isLoading }: IValuesTable) => {
	const columns: GridColDef[] = [
		{
			field: 'createdAt',
			headerName: 'Created At',
			flex: 1,
			minWidth: 190,
			sortable: false,
			type: 'date',
			renderHeader: () => (
				<>
					<span>Date of creation </span>
					<HistoryToggleOffIcon />
				</>
			),
		},
		{
			field: 'value',
			headerName: 'Value',
			flex: 1,
			minWidth: 170,
			sortable: false,
			renderHeader: () => (
				<>
					<span>Value </span>
					<EqualizerIcon />
				</>
			),
		},
	];

	const getRowSpacing = React.useCallback((params: GridRowSpacingParams) => {
		return {
			top: params.isFirstVisible ? 10 : 3,
			bottom: params.isLastVisible ? 0 : 5,
		};
	}, []);

	return (
		<Box height="450px" width="100%" display={'flex'} justifyContent="center" alignItems={'center'}>
			<Box width="65%" height={'100%'}>
				<DataGrid
					columns={columns}
					rows={rows || []}
					pageSize={5}
					rowsPerPageOptions={[5]}
					disableSelectionOnClick
					getRowSpacing={getRowSpacing}
					sx={gridTableStyle}
					loading={isLoading}
					disableColumnMenu
				/>
			</Box>
		</Box>
	);
};
export default ValuesTable;
