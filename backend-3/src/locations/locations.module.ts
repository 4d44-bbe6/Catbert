import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { LocationSchema } from './location.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Location',
        schema: LocationSchema,
      },
    ]),
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
