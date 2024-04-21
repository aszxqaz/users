import {
    Checkbox,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { formatDate } from '../../helpers';
import { DashboardUser } from '../../state/entities/dashboard';
import styles from './Table.module.css';

type UsersTableProps = {
    users: DashboardUser[];
    getCheckedForUser: (id: DashboardUser['id']) => boolean;
    onCheckAll: (checked: boolean) => void;
    onChecked: (id: DashboardUser['id'], checked: boolean) => void;
};

export function UsersTable({
    users,
    getCheckedForUser,
    onCheckAll,
    onChecked,
}: UsersTableProps) {
    const allChecked = users.every(user => getCheckedForUser(user.id));
    const isIndeterminate =
        users.some(user => getCheckedForUser(user.id)) && !allChecked;
    const getOnChangeOne =
        (id: DashboardUser['id']) => (event: ChangeEvent<HTMLInputElement>) => {
            onChecked(id, event.target.checked);
        };
    const onChangeAll = (e: ChangeEvent<HTMLInputElement>) => {
        onCheckAll(e.target.checked);
    };
    return (
        <TableContainer>
            <Table variant="striped" colorScheme="gray" size="sm">
                <TableCaption>
                    Users data being stored in PostgreSQL database
                </TableCaption>
                <Thead>
                    <Tr>
                        <Th className={styles.thresp}>
                            <Checkbox
                                isChecked={allChecked}
                                isIndeterminate={isIndeterminate}
                                onChange={onChangeAll}
                            />
                        </Th>
                        <Th className={styles.thresp}>Id</Th>
                        <Th className={styles.thresp}>Email</Th>
                        <Th className={styles.thresp}>Name</Th>
                        <Th className={styles.thresp}>Status</Th>
                        <Th className={styles.thresp}>Signed up</Th>
                        <Th className={styles.thresp + ` ` + styles.lastlogin}>
                            Last login
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map(user => (
                        <Tr key={user.id}>
                            <Td className={styles.tdresp}>
                                <Checkbox
                                    isChecked={getCheckedForUser(user.id)}
                                    onChange={getOnChangeOne(user.id)}
                                />
                            </Td>
                            <Td className={styles.tdresp}>{user.id}</Td>
                            <Td className={styles.tdresp}>{user.email}</Td>
                            <Td className={styles.tdresp}>{user.name}</Td>
                            <Td className={styles.tdresp}>
                                {user.isBlocked ? 'blocked' : 'active'}
                            </Td>
                            <Td className={styles.tdresp}>
                                {formatDate(user.createdAt)}
                            </Td>
                            <Td
                                className={
                                    styles.tdresp + ` ` + styles.lastlogin
                                }
                            >
                                {user.loggedInAt
                                    ? formatDate(user.loggedInAt)
                                    : 'N/A'}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
