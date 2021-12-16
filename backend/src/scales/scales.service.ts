import { Injectable, NotFoundException } from '@nestjs/common';
import { Scale } from './scale.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ScalesService {
  private scales: Scale[] = [
    {
      id: '50974fc0-131d-490d-917a-c222c79d5b8e',
      name: 'scale #1',
      location: 'Woonkamer',
      description: 'Omschrijving volgt',
      status: 'new',
      allowedPets: [],
    },
    {
      id: '3282f224-5e86-4864-a522-c99f2e104e9e',
      name: 'scale #2',
      location: 'Bijkeuken',
      description: 'Omschrijving volgt',
      status: 'new',
      allowedPets: [],
    },
    {
      id: '32e0af52-bf76-41c0-ac03-a3d33e266273',
      name: 'scale #2',
      location: 'Woonkamer',
      description: 'Omschrijving volgt',
      status: 'used',
      allowedPets: [],
    },
  ];

  addScale(name: string, location: string, description: string): string {
    const id = uuidv4();
    const newScale = new Scale(id, name, location, description, 'new', []);
    this.scales.push(newScale);
    return id;
  }

  getAllScales() {
    return [...this.scales];
  }

  getSingleScale(id: string) {
    const scale = this.findScale(id)[0];
    return { ...scale };
  }

  updateScale(id: string, name: string, location: string, description: string) {
    const [scale, index] = this.findScale(id);
    const updatedScale = { ...scale };
    if (name) {
      updatedScale.name = name;
    }
    if (location) {
      updatedScale.location = location;
    }
    if (description) {
      updatedScale.description = description;
    }
    this.scales[index] = updatedScale;
  }

  deleteScale(id: string) {
    const index = this.findScale(id)[1];
    this.scales.splice(index, 1);
  }

  private findScale(id: string): [Scale, number] {
    const scaleIdx = this.scales.findIndex((scale) => scale.id === id);
    const scale = this.scales[scaleIdx];
    if (!scale) {
      throw new NotFoundException('Er kan geen product worden gevonden.');
    }
    return [scale, scaleIdx];
  }
}
