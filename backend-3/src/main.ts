import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const microserviceMqqt = app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://192.168.178.10:1883',
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();