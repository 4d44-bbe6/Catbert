import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScalesModule } from './scales/scales.module';
import { LocationsModule } from './locations/locations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MqttModule } from 'nest-mqtt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LocationsModule,
    ScalesModule,
    MqttModule.forRoot({
      host: '192.168.178.10',
      queue: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_ATLAS_USER}:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.kk4in.mongodb.net/Catbert?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
