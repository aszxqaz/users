import { HStack, Text } from '@chakra-ui/react';
import { CiDatabase } from 'react-icons/ci';

export function NoUsers() {
    return (
        <HStack>
            <CiDatabase fontSize="4rem" />
            <Text fontSize="1.2rem" align="center">
                There are no users <br />
                in the database
            </Text>
        </HStack>
    );
}
