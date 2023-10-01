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
import { PasswordService } from './utils/password/password.service';
import { ProfileModule } from './profile/profile.module';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';

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
    ProfileModule,
    CategoryModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService, PasswordService],
})
export class AppModule {}
