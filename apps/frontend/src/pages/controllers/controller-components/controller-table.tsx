import React, { FC } from 'react';
import { AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';
import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import {
	Box,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	TableFooter,
	Paper,
} from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';
import TuneIcon from '@mui/icons-material/Tune';
import DescriptionIcon from '@mui/icons-material/Description';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import WifiIcon from '@mui/icons-material/Wifi';
import { ControllerDto, ListWithTotals } from '@boilerplate/shared';
import ControllerRow from './controller-row';
import { tableStyle } from './controllers.styles';

export interface IControllersTable {
	handleEditClick: (id: GridRowId) => Promise<void>;
	handleDeleteClick: (id: GridRowId) => Promise<void>;
	showKeys: (id: GridRowId) => Promise<void>;
	data: AxiosResponse<ListWithTotals<ControllerDto[]>, any> | undefined;
	isLoading: boolean;
	error: unknown;
	page: number;
	pageSize: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

export interface TablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
}

export type controllerType = ControllerDto | undefined;

const ControllerTable: FC<IControllersTable> = ({
	handleEditClick,
	handleDeleteClick,
	showKeys,
	data,
	isLoading,
	error,
	page,
	pageSize,
	setPage,
	setPageSize,
}: IControllersTable) => {
	const { enqueueSnackbar } = useSnackbar();

	if (error) {
		const message = 'ERROR!';
		enqueueSnackbar(message);
	}

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const rows: any = data?.data.list || [];

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setPageSize(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Box height="700px" width="95%" mt={2}>
			<TableContainer component={Paper} sx={{ height: '700px', border: '7px double #333', p: 1 }}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow
							sx={{
								background: `linear-gradient( #222, ${grey[800]}, #222,  #111)`,
								fontWeight: 'bold',
								fontSize: '1.3em',
								borderRadius: 2,
							}}
						>
							<TableCell />
							<TableCell sx={{ color: '#fff' }}>
								<Box display={'flex'}>
									<pre style={{ margin: '0' }}>Controller </pre>
									<TuneIcon />
								</Box>
							</TableCell>
							<TableCell sx={{ color: '#fff' }}>
								<Box display={'flex'}>
									<pre style={{ margin: '0' }}>Description </pre>
									<DescriptionIcon />
								</Box>
							</TableCell>
							<TableCell sx={{ color: '#fff' }}>
								<Box display={'flex'} justifyContent={'center'}>
									<pre style={{ margin: '0' }}>Actions </pre>
									<WifiProtectedSetupIcon />
								</Box>
							</TableCell>
							<TableCell sx={{ color: '#fff' }}>
								<Box display={'flex'} justifyContent={'center'}>
									<pre style={{ margin: '0' }}>Keys </pre>
									<VpnKeyIcon />
								</Box>
							</TableCell>
							<TableCell sx={{ color: '#fff' }}>
								<Box display={'flex'} justifyContent={'center'}>
									<pre style={{ margin: '0' }}>Subscribes </pre>
									<WifiIcon />
								</Box>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody sx={{ width: '100%' }}>
						{rows.map((row: any) => (
							<ControllerRow
								key={row.name}
								row={row}
								handleEditClick={handleEditClick}
								handleDeleteClick={handleDeleteClick}
								showKeys={showKeys}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TableContainer component={Box} sx={{ height: '100px', mt: 1 }}>
				<Table aria-label="collapsible table">
					<TableFooter
						sx={{
							background: `linear-gradient(#444, ${grey[600]}, #444, #111)`,
							fontWeight: 'bold',
							fontSize: '1.3em',
							borderRadius: 2,
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							p: 1,
						}}
					>
						<TableRow>
							<TablePagination
								colSpan={3}
								count={data?.data?.total || 0}
								rowsPerPage={pageSize}
								page={page}
								onPageChange={handleChangePage}
								rowsPerPageOptions={[5, 10, 25]}
								onRowsPerPageChange={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
								sx={tableStyle}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default ControllerTable;
