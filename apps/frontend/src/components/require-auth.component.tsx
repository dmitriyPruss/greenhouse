import React, { ReactElement, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import useMobxStoreHook from '../hooks/use-mobx-store.hook';
import { socketClient } from './../socket';

const RequireAuth = observer(({ children }: { children: JSX.Element }): ReactElement => {
	const {
		session: { isAuthenticated, currentAccessToken },
	} = useMobxStoreHook();

	useEffect(() => {
		if (currentAccessToken) {
			socketClient.connect(currentAccessToken);
		}

		return () => {
			socketClient.disconnect();
		};
	}, [currentAccessToken]);

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return children;
});

export default RequireAuth;
