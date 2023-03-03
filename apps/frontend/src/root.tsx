import React, { FC, Suspense } from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import NotFoundPage from './pages/not-found';
import AuthorisedPage from './pages/authorised-page';
import RequireAuth from './components/require-auth.component';
import RequireUnauthorized from './components/require-unauthorized.component';
import RouterSuspense from './components/router-suspense.component';
import HomePage from './pages/home';

const AuthorizedArea = React.lazy(async () => import('./areas/authorized-area.component'));
const UnauthorizedArea = React.lazy(async () => import('./areas/unauthorized-area.component'));
const LoginPage = React.lazy(async () => import('./pages/login'));
const SignUpPage = React.lazy(async () => import('./pages/sign-up'));
const MainPage = React.lazy(async () => import('./pages/main'));
const UserPage = React.lazy(async () => import('./pages/user'));
const ControllersPage = React.lazy(async () => import('./pages/controllers'));
const ControllerPage = React.lazy(async () => import('./pages/controller'));
const SubscribesPage = React.lazy(async () => import('./pages/subscribes'));

const Root: FC = observer(() => {
	const routes = useRoutes([
		{
			path: '/',
			element: (
				<RequireAuth>
					<AuthorizedArea />
				</RequireAuth>
			),
			children: [
				{ index: true, element: <AuthorisedPage /> },
				{ path: '/user', element: <UserPage /> },
				{ path: '/panel', element: <ControllersPage /> },
				{ path: '/subscribes', element: <SubscribesPage /> },
				{ path: '/subscribes/:id', element: <ControllerPage /> },
				{ path: '/main', element: <MainPage /> },
			],
		},
		{
			element: (
				<RequireUnauthorized>
					<UnauthorizedArea />
				</RequireUnauthorized>
			),
			children: [
				{ path: '/login', element: <LoginPage /> },
				{ path: '/signup', element: <SignUpPage /> },
			],
		},
		{ path: '*', element: <NotFoundPage /> },
	]);

	return (
		<Routes>
			<Route path="/home" element={<HomePage />} />
			<Route path="*" element={<Suspense fallback={<RouterSuspense />}>{routes}</Suspense>} />
		</Routes>
	);
});

export default Root;
