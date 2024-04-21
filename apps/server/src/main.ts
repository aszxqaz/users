import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthenticationGuard, AuthorizationGuard } from './common/guards';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: ['http://localhost:4200'],
    });
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
