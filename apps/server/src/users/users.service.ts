import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Public } from '../common/decorators';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    @Public()
    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        for (const user of users) {
            delete user.password;
        }
        return users;
    }

    async deleteOne(id: number) {
        const user = await this.prisma.user.delete({
            where: { id },
        });
        return { id };
    }

    async deleteMany(ids: number[]) {
        return this.prisma.user.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }

    async setBlockedMany(ids: number[], isBlocked: boolean) {
        console.log(isBlocked);
        return this.prisma.user.updateMany({
            where: {
                id: {
                    in: ids,
                },
            },
            data: {
                isBlocked,
            },
        });
    }

    async seed(count: number) {
        const users = [];

        for (let i = 0; i < count; i++) {
            const email = faker.internet.email();
            const name = faker.person.firstName();
            const user = {
                email,
                name,
                password: 'password',
            };
            users.push(user);
        }

        return this.prisma.user.createMany({
            data: users,
        });
    }
}
