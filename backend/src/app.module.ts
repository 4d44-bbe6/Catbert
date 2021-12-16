import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScalesModule } from './scales/scales.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [ScalesModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
