import React, { FC } from 'react';
import { blue, green, grey, purple, red } from '@mui/material/colors';
import { Box, Collapse, IconButton, Tooltip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import WifiIcon from '@mui/icons-material/Wifi';
import { useNavigate } from 'react-router-dom';
import { IndexDto } from '@boilerplate/shared';
import IndexRow from './index-row';

export function createData(
	id: string,
	name: string,
	description: string,
	indexes: IndexDto[],
	role: 'ADMIN' | 'READONLY'
) {
	return {
		id,
		name,
		description,
		role,
		indexes,
	};
}

interface IControllerRow {
	row: ReturnType<typeof createData>;
	handleEditClick: (id: GridRowId) => Promise<void>;
	handleDeleteClick: (id: GridRowId) => Promise<void>;
	showKeys: (id: GridRowId) => Promise<void>;
}

function ControllerRow({ row, handleEditClick, handleDeleteClick, showKeys }: IControllerRow) {
	const [open, setOpen] = React.useState(false);

	const navigate = useNavigate();

	return (
		<React.Fragment>
			<TableRow
				sx={{
					'& > *': { borderBottom: 'unset' },
					bgcolor: grey[800],
					color: '#fff',
					cursor: 'pointer',
					width: '100%',
					borderRadius: 1,
					mb: 1,
				}}
			>
				<TableCell>
					<IconButton aria-label="expand row" size="small" sx={{ color: '#fff' }} onClick={() => setOpen(!open)}>
						{open ? <KeyboardDoubleArrowUpIcon /> : <KeyboardDoubleArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell sx={{ color: '#fff' }}>{row.name}</TableCell>
				<TableCell sx={{ color: '#fff' }}>{row.description}</TableCell>
				<TableCell>
					{row.role === 'ADMIN' ? (
						<Box width={'100%'} display={'flex'} justifyContent="space-evenly">
							<Tooltip title="update Controller" arrow>
								<Box
									display={'flex'}
									justifyContent={'center'}
									width={'42px'}
									height={'36px'}
									bgcolor={blue[500]}
									border={'2px solid #fff'}
									borderRadius={1}
									p={0.5}
									onClick={async () => {
										await handleEditClick(row.id);
									}}
								>
									{' '}
									<EditIcon />
								</Box>
							</Tooltip>

							<Tooltip title="delete Controller" arrow>
								<Box
									display={'flex'}
									justifyContent={'center'}
									width={'42px'}
									height={'36px'}
									bgcolor={red[500]}
									border={'2px solid #fff'}
									borderRadius={1}
									p={0.5}
									onClick={async () => {
										await handleDeleteClick(row.id);
									}}
								>
									<DeleteIcon />
								</Box>
							</Tooltip>
						</Box>
					) : (
						<Box></Box>
					)}
				</TableCell>
				<TableCell>
					{row.role === 'ADMIN' ? (
						<Box display="flex" justifyContent="center">
							<Tooltip title="keys for Controller" arrow>
								<Box
									display={'flex'}
									justifyContent={'center'}
									width={'42px'}
									height={'36px'}
									bgcolor={green[500]}
									border={'2px solid #fff'}
									borderRadius={1}
									p={0.5}
									onClick={async () => {
										await showKeys(row.id);
									}}
								>
									<LockOpenIcon />
								</Box>
							</Tooltip>
						</Box>
					) : (
						<Box></Box>
					)}
				</TableCell>
				<TableCell>
					<Box display="flex" justifyContent={'center'}>
						<Tooltip title="Subscribe" arrow>
							<Box
								display={'flex'}
								justifyContent={'center'}
								width={'42px'}
								height={'36px'}
								bgcolor={purple[700]}
								border={'2px solid #fff'}
								borderRadius={1}
								p={0.5}
								onClick={() => {
									navigate(`/subscribes/${row.id}`, { replace: true });
								}}
							>
								<WifiIcon />
							</Box>
						</Tooltip>
					</Box>
				</TableCell>
			</TableRow>
			<TableRow sx={{ bgcolor: grey[400] }}>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box display="flex" justifyContent="center" width="100%" m={'10px'}>
							<Box width={'70%'} p={1} border={`3px solid ${grey[700]}`} borderRadius={1} bgcolor={grey[50]}>
								<Box display={'flex'} justifyContent="center" bgcolor={grey[700]} color={grey[50]} p={1}>
									<pre style={{ color: '#fff', margin: 0 }}>Indices </pre>
									<AccountTreeIcon />
								</Box>
								<Table size="small" aria-label="purchases">
									<TableHead>
										<TableRow>
											<TableCell>Name</TableCell>
											<TableCell>Last Value</TableCell>
											<TableCell>Up/Down</TableCell>
										</TableRow>
									</TableHead>

									{open && (
										<TableBody>
											{row.indexes.map((indexRow, index) => (
												<IndexRow key={indexRow.id} controllerRow={row} indexRow={indexRow} index={index} />
											))}
										</TableBody>
									)}
								</Table>
							</Box>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

export default ControllerRow;
