import { Controller, Inject, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MqttClient } from '@nestjs/microservices/external/mqtt-client.interface';
import { Subscribe } from 'nest-mqtt';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Subscribe({
    topic: 'home/catbert/currentWeight',
    transform: (payload) => payload.toString(),
  })
  readData() {
    console.log('test');
  }
}
