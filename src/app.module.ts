import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/User';
import { ProfileEntity } from './entities/Profile';
import { CategoryEntity } from './entities/Category';
import { ItemEntity } from './entities/Item';
import { CartEntity } from './entities/CartEntity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'pc_store',
      entities: [
        UserEntity,
        ProfileEntity,
        CategoryEntity,
        ItemEntity,
        CartEntity,
      ],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
