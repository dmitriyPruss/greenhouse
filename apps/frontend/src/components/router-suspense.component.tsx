import { FC } from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const RouterSuspense: FC = () => (
	<Box sx={{ display: 'flex', justifyContent: 'center' }}>
		<CircularProgress color="success" size={32} sx={{ mt: 3, mb: 3, ml: 2, mr: 2 }} />
		<CircularProgress color="success" size={32} sx={{ mt: 3, mb: 3, ml: 2, mr: 2 }} />
		<CircularProgress color="success" size={32} sx={{ mt: 3, mb: 3, ml: 2, mr: 2 }} />
	</Box>
);

export default RouterSuspense;
