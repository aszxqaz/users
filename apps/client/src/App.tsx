import { ChakraProvider, theme } from '@chakra-ui/react';
import { ApiClientProvider } from './api';
import { Router } from './routes/Router';
import { AppContextProvider } from './state/appState';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <ApiClientProvider>
                <AppContextProvider>
                    <Router />
                </AppContextProvider>
            </ApiClientProvider>
        </ChakraProvider>
    );
}

export default App;
