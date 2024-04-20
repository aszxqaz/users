import { Box, Flex, HStack, Link, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

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
                <HStack spacing={8} alignItems={'center'}>
                    <HStack
                        as={'nav'}
                        spacing={4}
                        display={{ base: 'none', md: 'flex' }}
                    >
                        {links?.map(link => (
                            <Link
                                as={NavLink}
                                to={link.to}
                                key={link.to}
                                px={2}
                                py={1}
                                rounded={'md'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: useColorModeValue(
                                        'gray.200',
                                        'gray.700'
                                    ),
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </HStack>
                </HStack>
                {children}
            </Flex>
        </Box>
    );
}
