import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    // app.enableCors({
    //     origin: ['http://localhost:8080', '127.0.0.1', process.env.CLIENT_HOST],
    // });
    await app.listen(process.env.PORT || 8080);
}
bootstrap();
