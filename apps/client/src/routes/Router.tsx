import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { SignInPage, SignUpPage } from '../pages/auth';
import { SignOutPage } from '../pages/auth/SignOutPage';
import { AuthenticationRedirect } from './AuthenticationRedirect';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { RootPage } from '../pages/root/RootPage';
import { AuthorizationGuard } from './AuthorizationGuard';
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
                            <AuthenticationRedirect whenUnauthenticated="/signin">
                                <AuthorizationRedirect to="/signin">
                                    <DashboardPage />
                                </AuthorizationRedirect>
                            </AuthenticationRedirect>
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
