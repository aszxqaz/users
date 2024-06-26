import { Type } from 'class-transformer';

export class DashboardUserDto {
    id!: number;
    email!: string;
    name!: string;
    isBlocked!: boolean;

    @Type(() => Date)
    createdAt!: Date;

    @Type(() => Date)
    loggedInAt?: Date;
}
export class DashboardUser {
    constructor(
        public readonly id: number,
        public readonly email: string,
        public readonly name: string,
        public readonly isBlocked: boolean,
        public readonly createdAt: Date,
        public readonly loggedInAt?: Date
    ) {}

    blocked(action: 'block' | 'unblock'): DashboardUser {
        return new DashboardUser(
            this.id,
            this.email,
            this.name,
            action == 'block' ? true : false,
            this.createdAt,
            this.loggedInAt
        );
    }

    static fromDto(dto: DashboardUserDto): DashboardUser {
        return new DashboardUser(
            dto.id,
            dto.email,
            dto.name,
            dto.isBlocked,
            dto.createdAt,
            dto.loggedInAt
        );
    }
}
