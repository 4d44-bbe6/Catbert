import { Body, Controller, Post, Get } from '@nestjs/common';
import { LocationsService } from './locations.service';

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
  getAllLocations() {
    return this.locationsService.getAllLocations();
  }
}
