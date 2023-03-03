import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

const AuthorizedPage: FC = () => <Navigate to="/main" replace />;
export default AuthorizedPage;
