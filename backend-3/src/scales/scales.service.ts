import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Scale } from './scale.model';

@Injectable()
export class ScalesService {
  constructor(
    @InjectModel('Scale') private readonly scaleModel: Model<Scale>,
  ) {}

  async addScale(
    name: string,
    description: string,
    location: string,
  ): Promise<string> {
    const newScale = new this.scaleModel({
      name,
      description,
      location,
    });
    const result = await newScale.save();
    return result.id as string;
  }

  async getScales(): Promise<
    {
      id: string;
      name: string;
      description: string;
      location: string;
    }[]
  > {
    const scales = await this.scaleModel.find().exec();
    return scales.map((scale) => ({
      id: scale.id,
      name: scale.name,
      description: scale.description,
      location: scale.location,
    }));
  }

  async getScale(id: string): Promise<Scale> {
    return await this.findScale(id);
  }

  async updateScale(
    id: string,
    name: string,
    description: string,
    location: string,
  ): Promise<Scale> {
    const scale = await this.findScale(id);
    if (name) scale.name = name;
    if (description) scale.description = description;
    if (location) scale.location = location;
    return scale.save();
  }

  async deleteScale(id: string): Promise<{ id: string }> {
    const result = await this.scaleModel
      .deleteOne({
        _id: id,
      })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('No scale found');
    }
    return {
      id,
    };
  }

  private async findScale(id: string): Promise<Scale> {
    const scale = await this.scaleModel
      .findById(new mongoose.Types.ObjectId(id))
      .exec();
    if (!scale) {
      throw new NotFoundException('No scale found.');
    }
    return scale;
  }
}
