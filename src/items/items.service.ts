import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from '../items/schemas/item.schema/item.schema';
import { CreateItemDto } from '../items/dto/create-item.dto/create-item.dto';

@Injectable()
export class ItemsService {
    constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}
    
    async create(createItemDto: CreateItemDto) {
      const newItem = new this.itemModel(createItemDto);
      const savedItem = await newItem.save();
  
      return {
        status: HttpStatus.CREATED,
        message: 'Item created successfully',
        data: savedItem,
      };
    }
  
    async findAll() {
      const items = await this.itemModel.find().exec();
      return {
        status: HttpStatus.OK,
        message: 'Items fetched successfully',
        data: items,
      };
    }
  
    async findOne(id: string) {
      const item = await this.itemModel.findById(id).exec();
      if (!item) {
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, message: 'Item not found' },
          HttpStatus.NOT_FOUND,
        );
      }
  
      return {
        status: HttpStatus.OK,
        message: 'Item fetched successfully',
        data: item,
      };
    }
  
    async update(id: string, updateData: Partial<Item>) {
      const updatedItem = await this.itemModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  
      if (!updatedItem) {
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, message: 'Item not found' },
          HttpStatus.NOT_FOUND,
        );
      }
  
      return {
        status: HttpStatus.OK,
        message: 'Item updated successfully',
        data: updatedItem,
      };
    }
  
    async remove(id: string) {
      const deletedItem = await this.itemModel.findByIdAndDelete(id).exec();
  
      if (!deletedItem) {
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, message: 'Item not found' },
          HttpStatus.NOT_FOUND,
        );
      }
  
      return {
        status: HttpStatus.OK,
        message: 'Item deleted successfully',
        data: deletedItem,
      };
    }
  }