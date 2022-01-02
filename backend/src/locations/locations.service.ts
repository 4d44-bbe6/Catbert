import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Location } from './location.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel('Scale') private readonly locationModel: Model<Location>,
  ) {}

  async addLocation(name: string, description: string): Promise<string> {
    const newLocation = new this.locationModel({
      name,
      description,
    });
    const result = await newLocation.save();
    return result.id as string;
  }

  async getLocations(): Promise<
    {
      id: string;
      name: string;
      description: string;
    }[]
  > {
    const locations = await this.locationModel.find().exec();
    return locations.map((location) => ({
      id: location.id,
      name: location.name,
      description: location.description,
    }));
  }

  getLocation(id: string) {
    const location = this.findLocation(id)[0];
    return { ...location };
  }

  async updateLocation(id: string, name: string, description: string) {
    const location = await this.findLocation(id);
    if (name) location.name = name;
    if (description) location.description = description;
  }

  async deleteLocation(id: string): Promise<{ id: string }> {
    const result = await this.locationModel
      .deleteOne({
        _id: id,
      })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('No location found');
    }
    return {
      id,
    };
  }

  private async findLocation(id: string) {
    const location = await this.locationModel
      .findById(new mongoose.Types.ObjectId(id))
      .exec();
    if (!location) {
      throw new NotFoundException('No location found');
    }
    return location;
  }
}
