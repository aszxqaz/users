import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { SignInPage } from './pages/auth/SignInPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { AppContextProvider } from './state/appState';
import { RootPage } from './pages/root/RootPage';
import { ApiClientProvider } from './api';
import { AuthRedirect } from './pages/common/AuthRedirect';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { SignOutPage } from './pages/auth/SignOutPage';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <ApiClientProvider>
                <AppContextProvider>
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
                                        <AuthRedirect
                                            whenAuthenticated="/dashboard"
                                            whenUnauthenticated="/signin"
                                        />
                                    }
                                />
                                <Route
                                    path="/signin"
                                    element={
                                        <AuthRedirect whenAuthenticated="/dashboard">
                                            <SignInPage />
                                        </AuthRedirect>
                                    }
                                />
                                <Route
                                    path="/signup"
                                    element={
                                        <AuthRedirect whenAuthenticated="/dashboard">
                                            <SignUpPage />
                                        </AuthRedirect>
                                    }
                                />
                                <Route
                                    path="/signout"
                                    element={
                                        <AuthRedirect whenUnauthenticated="/signin">
                                            <SignOutPage />
                                        </AuthRedirect>
                                    }
                                />
                                <Route
                                    index
                                    path="/dashboard"
                                    element={
                                        <AuthRedirect whenUnauthenticated="/signin">
                                            <DashboardPage />
                                        </AuthRedirect>
                                    }
                                />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </AppContextProvider>
            </ApiClientProvider>
        </ChakraProvider>
    );
}

export default App;
