export type SignInDto = {
    email: string;
    password: string;
};

export type SignUpDto = SignInDto & {
    name: string;
};

export type UsersTableAction = 'block' | 'unblock' | 'delete';
