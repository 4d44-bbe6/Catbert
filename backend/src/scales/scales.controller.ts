import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ScalesService } from './scales.service';

@Controller('scales')
export class ScalesController {
  constructor(private readonly scalesService: ScalesService) {}

  @Post()
  adddScale(
    @Body('name') name: string,
    @Body('location') location: string,
    @Body('description') description: string,
  ): any {
    const scaleID = this.scalesService.addScale(name, location, description);
    return {
      id: scaleID,
    };
  }

  @Get()
  getAllScales() {
    return this.scalesService.getAllScales();
  }

  @Get(':id')
  getScale(@Param('id') id: string) {
    return this.scalesService.getSingleScale(id);
  }

  @Patch(':id')
  updateScale(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('location') location: string,
    @Body('description') description: string,
  ) {
    this.scalesService.updateScale(id, name, location, description);
    return null;
  }

  @Delete(':id')
  deleteScale(@Param('id') id: string) {
    this.scalesService.deleteScale(id);
    return null;
  }
}
