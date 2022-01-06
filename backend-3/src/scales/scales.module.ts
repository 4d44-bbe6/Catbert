import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScalesController } from './scales.controller';
import { ScalesService } from './scales.service';
import { ScaleSchema } from './scale.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Scale',
        schema: ScaleSchema,
      },
    ]),
  ],
  controllers: [ScalesController],
  providers: [ScalesService],
})
export class ScalesModule {}
