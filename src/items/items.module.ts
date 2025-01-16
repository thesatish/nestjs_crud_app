import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from '../items/schemas/item.schema/item.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }])],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}
