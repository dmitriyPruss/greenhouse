import React, { FC } from 'react';
import { RefetchOptions, RefetchQueryFilters, QueryObserverResult } from 'react-query';
import { useSnackbar } from 'notistack';
import { AxiosResponse } from 'axios';
import { Box, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridColumns, GridRowSpacingParams, GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { blue, teal, grey } from '@mui/material/colors';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import KeyIcon from '@mui/icons-material/Key';
import { controllersService } from '../../../../data-services';
import { ControllerDto, KeyDto } from '@boilerplate/shared';
import { gridTableStyle, subHeaderStyle } from './key-modal-window.styles';

interface IKeys {
	id: GridRowId | null;
	error: unknown;
	data: any;
	isLoading: boolean;
	page: number;
	pageSize: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	setPageSize: React.Dispatch<React.SetStateAction<number>>;
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<AxiosResponse<ControllerDto, any>, unknown>>;
}

class Keys extends KeyDto {
	roleName?: 'ADMIN' | 'READONLY';
}

const KeysTable: FC<IKeys> = ({ id, data, error, isLoading, refetch, page, pageSize, setPage, setPageSize }: IKeys) => {
	const { enqueueSnackbar } = useSnackbar();

	if (error) {
		const message = 'Error: something went wrong in admin table';
		enqueueSnackbar(message);
	}

	let currentKeys: Keys[] = [];

	if (data) {
		currentKeys = data.data.list.map((key: any) => {
			let newKey: Keys = key;

			newKey.roleName = key.role?.name;

			return newKey;
		});
	}

	const adminColumns: GridColumns = [
		{
			field: 'key',
			headerName: 'Key',
			flex: 1,
			minWidth: 150,
			sortable: false,
			renderHeader: () => (
				<>
					<pre>Key </pre>
					<KeyIcon />
				</>
			),
		},
		{
			field: 'roleName',
			headerName: 'Role',
			flex: 1,
			minWidth: 150,
			sortable: false,
			renderHeader: () => (
				<>
					<pre>Role </pre>
					<AccountBoxIcon />
				</>
			),
		},
		{
			field: 'deactivate',
			type: 'actions',
			headerName: 'Deactivate key',
			flex: 1,
			minWidth: 250,
			cellClassName: 'deactivate',
			renderHeader: () => (
				<>
					<pre>Deactivate </pre>
					<KeyOffIcon />
				</>
			),
			getActions: ({ id, row }) => [
				<GridActionsCellItem
					icon={
						<Box bgcolor={blue[50]} color={teal[50]} p={0.8} borderRadius={2}>
							{row.isDeactivated ? (
								<Typography component={'div'} color={grey[700]} fontSize={'1em'}>
									Deactivated
								</Typography>
							) : (
								<Tooltip title="Deactivate key" arrow>
									<Box bgcolor={blue[700]} p={0.5} borderRadius={1}>
										<KeyOffIcon />
									</Box>
								</Tooltip>
							)}
						</Box>
					}
					label="Deactivate key"
					disabled={row.isDeactivated ? true : false}
					onClick={async () => {
						const deactivated = true;
						await controllersService.deactivateKey(id as string, deactivated);
						await refetch();
					}}
					color="inherit"
				/>,
			],
		},
	];

	const getRowSpacing = React.useCallback((params: GridRowSpacingParams) => {
		return {
			top: params.isFirstVisible ? 10 : 5,
			bottom: params.isLastVisible ? 0 : 5,
		};
	}, []);

	return (
		<Box height="450px" width="90%">
			<Typography variant="h5" component="h3" sx={subHeaderStyle}>
				Keys
			</Typography>
			<DataGrid
				columns={adminColumns}
				rows={currentKeys}
				page={page}
				pageSize={pageSize}
				onPageChange={setPage}
				onPageSizeChange={setPageSize}
				rowsPerPageOptions={[4]}
				disableSelectionOnClick
				getRowSpacing={getRowSpacing}
				sx={gridTableStyle}
				loading={isLoading}
				rowCount={data?.data?.total || 0}
				paginationMode="server"
				disableColumnMenu
			/>
		</Box>
	);
};

export default KeysTable;
