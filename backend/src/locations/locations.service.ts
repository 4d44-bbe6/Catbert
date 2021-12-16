import { Injectable, NotFoundException } from '@nestjs/common';
import { Location } from './location.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LocationsService {
  private locations: Location[] = [
    {
      id: '50974fc0-131d-490d-917a-c222c79d5b8e',
      name: 'Woonkamer',
      description: 'Omschrijving',
    },
    {
      id: '6e78d364-5b72-4734-8e7f-98d5ddfaf429',
      name: 'Bijkeuken',
      description: 'Omschrijving',
    },
  ];

  addLocation(name: string, description: string) {
    const id = uuidv4();
    const newLocation = new Location(id, name, description);
    this.locations.push(newLocation);
    return this.locations;
  }

  getAllLocations() {
    return [...this.locations];
  }

  getSingleLocation(id: string) {
    const location = this.findLocation(id)[0];
    return { ...location };
  }

  updateLocation(id: string, name: string, description: string) {
    const [location, index] = this.findLocation(id);
    const updatedLocation = { ...location };
    if (name) {
      updatedLocation.name = name;
    }
    if (description) {
      updatedLocation.description = description;
    }
    this.locations[index] = updatedLocation;
  }

  deleteLocation(id: string) {
    const index = this.findLocation(id)[1];
    this.locations.splice(index, 1);
  }

  private findLocation(id: string): [Location, number] {
    const locationIdx = this.locations.findIndex(
      (location) => location.id === id,
    );
    const location = this.locations[locationIdx];
    if (!location) {
      throw new NotFoundException('Er kan geen locatie worden gevonden.');
    }
    return [location, locationIdx];
  }
}
