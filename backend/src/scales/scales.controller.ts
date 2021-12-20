import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Scale } from './scale.model';

import { ScalesService } from './scales.service';

@Controller('scales')
export class ScalesController {
  constructor(private readonly scalesService: ScalesService) {}

  @Post()
  async addScale(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('location') location: string,
  ): Promise<{ id: string }> {
    const generatedId = await this.scalesService.addScale(
      name,
      description,
      location,
    );
    return {
      id: generatedId,
    };
  }

  @Get()
  async getScales() {
    const scales = await this.scalesService.getScales();
    return scales;
  }

  @Get(':id')
  async getScale(@Param() id: string): Promise<Scale> {
    const scale = await this.scalesService.getScale(id);
    return scale;
  }

  @Patch(':id')
  async updateScale(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('location') location: string,
    @Body('description') description: string,
  ): Promise<Scale> {
    const result = await this.scalesService.updateScale(
      id,
      name,
      location,
      description,
    );
    return result;
  }

  @Delete(':id')
  deleteScale(@Param('id') id: string): Promise<{ id: string }> {
    const result = this.scalesService.deleteScale(id);
    return result;
  }
}
