import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';


@Module({
  imports: [ItemsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-crud'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
