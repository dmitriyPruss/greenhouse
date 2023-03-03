import React, { ChangeEvent, FC, useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { searchDelay } from '../../constants';
import useDebounce from '../../hooks/use-debounce.hook';
import SubscribeSearchPanel from './subscribes-components/subscribe-search-panel';
import SubscribesTable from './subscribes-components/subscribe-table';
import { controllersService } from '../../data-services';

const SubscribesPage: FC = () => {
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(5);
	const [search, setSearch] = useState('');

	const { data, error, isLoading } = useQuery(
		['controllers', page, pageSize, search],
		async () => await controllersService.getControllers({ page: page + 1, pageSize, search }),
		{
			keepPreviousData: true,
		}
	);

	const { debounceFunc: searchDebouncer } = useDebounce(searchDelay);

	const searchHandler = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			await searchDebouncer(() => {
				setSearch(e.target.value);
			});
		},
		[searchDebouncer, setSearch]
	);

	return (
		<Box width="100%" m={0} p={0}>
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
				alignItems="center"
				m="10px auto"
				width="100%"
			>
				<SubscribeSearchPanel searchHandler={searchHandler} />
				<SubscribesTable
					data={data}
					isLoading={isLoading}
					error={error}
					page={page}
					pageSize={pageSize}
					setPage={setPage}
					setPageSize={setPageSize}
				/>
			</Box>
		</Box>
	);
};

export default SubscribesPage;
