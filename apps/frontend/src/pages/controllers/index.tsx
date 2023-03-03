import React, { ChangeEvent, FC, useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useModal } from 'mui-modal-provider';
import { Box } from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';
import { searchDelay } from '../../constants';
import useDebounce from '../../hooks/use-debounce.hook';
import UpdateControllerForm from './controller-components/update-controller-form';
import ControllerPanel from './controller-components/controller-panel';
import ControllerTable from './controller-components/controller-table';
import DeleteModalWindow from './controller-components/delete-modal-window';
import { controllersService } from '../../data-services';
import { ControllerDto } from '@boilerplate/shared';
import KeysModalWindow from './controller-components/keys-modal-window';

const ControllersPage: FC = () => {
	const { showModal } = useModal();

	const { debounceFunc: searchDebouncer } = useDebounce(searchDelay);

	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(5);
	const [search, setSearch] = useState('');

	const handleEditClick = async (id: GridRowId) => {
		const data = await controllersService.getController(id as string);

		const currentController: ControllerDto = data?.data;

		showModal(UpdateControllerForm, {
			id: id as string,
			currentController,
			onDataSaved: async () => {
				await onControllerMutated();
			},
		});
	};

	const handleDeleteClick = async (id: GridRowId) => {
		showModal(DeleteModalWindow, {
			id: id as string,
			onDataSaved: async () => {
				await onControllerMutated();
			},
		});
	};

	const showKeys = async (id: GridRowId) => {
		showModal(KeysModalWindow, {
			id: id as string,
		});
	};

	const {
		data,
		error,
		isLoading,
		refetch: onControllerMutated,
	} = useQuery(
		['controllers', page, pageSize, search],
		async () => await controllersService.getControllers({ page: page + 1, pageSize, search }),
		{
			keepPreviousData: true,
		}
	);

	const searchHandler = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			await searchDebouncer(() => {
				setSearch(e.target.value);
			});
		},
		[searchDebouncer, setSearch]
	);

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="space-between"
			alignItems="center"
			m="10px auto"
			width="100%"
		>
			<ControllerPanel searchHandler={searchHandler} onControllerMutated={onControllerMutated} />
			<ControllerTable
				handleEditClick={handleEditClick}
				handleDeleteClick={handleDeleteClick}
				showKeys={showKeys}
				data={data}
				isLoading={isLoading}
				error={error}
				page={page}
				pageSize={pageSize}
				setPage={setPage}
				setPageSize={setPageSize}
			/>
		</Box>
	);
};

export default ControllersPage;
