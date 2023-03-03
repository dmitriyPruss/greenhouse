import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import ModalProvider from 'mui-modal-provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';
import { RootThemeProvider } from './RootThemeProvider';
import Root from './root';
import { GlobalStoreContextProvider } from './contexts';
import { GlobalStore } from './stores';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 2,
		},
	},
});

ReactDOM.render(
	<StrictMode>
		<GlobalStoreContextProvider value={GlobalStore}>
			<RootThemeProvider>
				<BrowserRouter>
					<QueryClientProvider client={queryClient}>
						<ModalProvider>
							<SnackbarProvider
								variant="error"
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
								maxSnack={1}
							>
								<CssBaseline />
								<Root />
							</SnackbarProvider>
						</ModalProvider>
					</QueryClientProvider>
				</BrowserRouter>
			</RootThemeProvider>
		</GlobalStoreContextProvider>
	</StrictMode>,
	document.getElementById('root')
);
