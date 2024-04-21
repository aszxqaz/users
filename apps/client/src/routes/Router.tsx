import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { SignInPage, SignUpPage } from '../pages/auth';
import { SignOutPage } from '../pages/auth/SignOutPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { RootPage } from '../pages/root/RootPage';
import { AuthenticationRedirect } from './AuthenticationRedirect';
import { AuthorizationRedirect } from './AuthorizationRedirect';

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RootPage>
                            <Outlet />
                        </RootPage>
                    }
                >
                    <Route
                        index
                        element={
                            // <AuthorizationRedirect to="/signin">
                            <AuthenticationRedirect
                                whenAuthenticated="/dashboard"
                                whenUnauthenticated="/signin"
                            />
                        }
                    />
                    <Route
                        index
                        path="/dashboard"
                        element={
                            <AuthorizationRedirect to="/signin">
                                <DashboardPage />
                            </AuthorizationRedirect>
                        }
                    />
                    <Route
                        path="/signin"
                        element={
                            <AuthenticationRedirect whenAuthenticated="/dashboard">
                                <SignInPage />
                            </AuthenticationRedirect>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <AuthenticationRedirect whenAuthenticated="/dashboard">
                                <SignUpPage />
                            </AuthenticationRedirect>
                        }
                    />
                    <Route
                        path="/signout"
                        element={
                            <AuthenticationRedirect whenUnauthenticated="/signin">
                                <SignOutPage />
                            </AuthenticationRedirect>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
