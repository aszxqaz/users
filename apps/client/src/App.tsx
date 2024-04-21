import { ChakraProvider, theme } from '@chakra-ui/react';
import { ApiClientProvider } from './api';
import { Router } from './routes/Router';
import { AuthProvider } from './state/context/auth';
import { DashboardProvider } from './state/context/dashboard';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <ApiClientProvider>
                <AuthProvider>
                    <DashboardProvider>
                        <Router />
                    </DashboardProvider>
                </AuthProvider>
            </ApiClientProvider>
        </ChakraProvider>
    );
}

export default App;
