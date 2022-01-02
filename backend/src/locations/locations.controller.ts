import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './location.model';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  addLocation(
    @Body('name') name: string,
    @Body('description') description: string,
  ): any {
    const locationId = this.locationsService.addLocation(name, description);
    return {
      id: locationId,
    };
  }

  @Get()
  getLocations() {
    return this.locationsService.getLocations();
  }

  @Get(':id')
  async getLocation(@Param() id: string) {
    const result = await this.locationsService.getLocation(id);
    return result;
  }

  @Patch('id')
  async updateLocation(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string,
  ): Promise<Location> {
    const result = await this.locationsService.updateLocation(
      id,
      name,
      description,
    );
    return result;
  }

  @Delete('id')
  deleteScale(@Param('id') id: string): Promise<{ id: string }> {
    const result = this.locationsService.deleteLocation(id);
    return result;
  }
}
