import { Heading, VStack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { CiDatabase } from 'react-icons/ci';
import { RiErrorWarningLine } from 'react-icons/ri';
import { CenteredSpinner } from '../../components/CenterSpinner';
import { NoContentPlaceholder } from '../../components/NoContentPlaceholder';
import { FetchingStatus } from '../../state/features';
import { useDashboardQuery } from '../../state/hooks';
import { Dashboard } from './Dashboard';

export function DashboardPage() {
    const { dashboardState } = useDashboardQuery();

    switch (dashboardState.inner.status) {
        case FetchingStatus.Initial:
        case FetchingStatus.Fetching:
            return <CenteredSpinner />;

        case FetchingStatus.Error:
            return <ServerError>{dashboardState.inner.message}</ServerError>;

        case FetchingStatus.Ready:
            const users = dashboardState.inner.users;
            return (
                <VStack mt="5rem">
                    <Heading mb="4rem">Users</Heading>
                    {users.length > 0 ? (
                        <Dashboard users={users} />
                    ) : (
                        <DatabaseEmpty />
                    )}
                </VStack>
            );
    }
}

function DatabaseEmpty() {
    return (
        <NoContentPlaceholder icon={CiDatabase}>
            There are no users
            <br />
            in the database
        </NoContentPlaceholder>
    );
}

function ServerError({ children }: PropsWithChildren) {
    return (
        <NoContentPlaceholder icon={RiErrorWarningLine}>
            {children}
        </NoContentPlaceholder>
    );
}
