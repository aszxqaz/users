import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import styles from './NavBar.module.css';

type NavBarLink = {
    label: string;
    to: string;
};

type NavBarProps = {
    links?: NavBarLink[];
    children?: ReactNode;
};

export function NavBar({ links, children }: NavBarProps) {
    return (
        <Box
            bg={useColorModeValue('gray.100', 'gray.900')}
            px={4}
            boxShadow="0 2px 2px 0 rgba(0, 0, 0, 0.15)"
        >
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Heading className={styles.heading} size="sm">
                    Users App
                </Heading>
                {children}
            </Flex>
        </Box>
    );
}
