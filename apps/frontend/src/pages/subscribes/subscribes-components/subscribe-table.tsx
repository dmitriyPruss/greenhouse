import React, { FC } from 'react';
import { AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';
import { useModal } from 'mui-modal-provider';
import { Box, Tooltip, Pagination } from '@mui/material';
import {
	DataGrid,
	GridColumns,
	GridRowSpacingParams,
	GridActionsCellItem,
	GridRowId,
	gridPageCountSelector,
	gridPageSelector,
	useGridApiContext,
	useGridSelector,
} from '@mui/x-data-grid';
import { purple } from '@mui/material/colors';
import TuneIcon from '@mui/icons-material/Tune';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import WifiIcon from '@mui/icons-material/Wifi';
import SubscribeForm from './subscribe-form';
import { ControllerDto, ListWithTotals } from '@boilerplate/shared';
import { gridTableStyle } from './subscribes.styles';

export interface IControllersTable {
	data: AxiosResponse<ListWithTotals<ControllerDto[]>, any> | undefined;
	isLoading: boolean;
	error: unknown;
	page: number;
	pageSize: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

const SubscribesTable: FC<IControllersTable> = ({
	data,
	isLoading,
	error,
	page,
	pageSize,
	setPage,
	setPageSize,
}: IControllersTable) => {
	const { enqueueSnackbar } = useSnackbar();
	const { showModal } = useModal();

	const openSubscribeForm = (id: GridRowId) => {
		showModal(SubscribeForm, {
			id: id as string,
		});
	};

	const columns: GridColumns = [
		{
			field: 'name',
			headerName: 'Controller name',
			flex: 2,
			minWidth: 230,
			sortable: false,
			renderHeader: () => (
				<>
					<pre>Controller </pre>
					<TuneIcon />
				</>
			),
		},
		{
			field: 'details',
			type: 'actions',
			headerName: 'Details',
			flex: 1,
			minWidth: 100,
			cellClassName: 'actions',
			renderHeader: () => (
				<>
					<pre>Details </pre>
					<SettingsSuggestIcon />
				</>
			),
			getActions: ({ id, row }) => [
				<GridActionsCellItem
					icon={
						<Tooltip title="Subscribe!" arrow>
							<Box display={'flex'} bgcolor={purple[900]} borderRadius={2} p={1}>
								<Box
									display="flex"
									flexDirection="column"
									bgcolor={purple[500]}
									p={0.5}
									borderRadius={2}
									alignItems="center"
									justifyContent="center"
								>
									<WifiIcon sx={{ color: '#eee' }} />
								</Box>
							</Box>
						</Tooltip>
					}
					label="Edit"
					className="textPrimary"
					color="inherit"
					onClick={async () => {
						await openSubscribeForm(id);
					}}
				/>,
			],
		},
	];

	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange = (id: GridRowId) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? (id as string) : false);
	};

	const getRowSpacing = React.useCallback((params: GridRowSpacingParams) => {
		return {
			top: params.isFirstVisible ? 32 : 28,
			bottom: params.isLastVisible ? 0 : 5,
		};
	}, []);

	if (error) {
		const message = 'ERROR!';
		enqueueSnackbar(message);
	}

	function CustomPagination() {
		const apiRef = useGridApiContext();
		const page = useGridSelector(apiRef, gridPageSelector);
		const pageCount = useGridSelector(apiRef, gridPageCountSelector);

		return (
			<Pagination
				shape="rounded"
				color="secondary"
				count={pageCount}
				page={page + 1}
				onChange={(event, value) => apiRef.current.setPage(value - 1)}
			/>
		);
	}

	return (
		<Box height="700px" width="90%">
			<DataGrid
				columns={columns}
				rows={data?.data?.list || []}
				page={page}
				pageSize={pageSize}
				onPageChange={setPage}
				onPageSizeChange={setPageSize}
				rowsPerPageOptions={[5]}
				disableSelectionOnClick
				getRowSpacing={getRowSpacing}
				sx={gridTableStyle}
				loading={isLoading}
				rowCount={data?.data?.total || 0}
				paginationMode="server"
				disableColumnMenu
				getRowHeight={() => 'auto'}
				components={{
					Pagination: CustomPagination,
				}}
			/>
		</Box>
	);
};

export default SubscribesTable;
