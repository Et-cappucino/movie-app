import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            database: configService.getOrThrow('MYSQL_DATABASE'),
            host: configService.getOrThrow('MYSQL_HOST'),
            port: configService.getOrThrow('MYSQL_PORT'),
            username: configService.getOrThrow('MYSQL_USERNAME'),
            password: configService.getOrThrow('MYSQL_PASSWORD'),
            entities: ['dist/**/*.entity.js'],
            synchronize: true,
        }),
        inject: [ConfigService],
    })],
})
export class DatabaseModule {}
