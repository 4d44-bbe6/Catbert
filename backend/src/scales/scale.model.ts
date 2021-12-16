export class Scale {
  constructor(
    public id: string,
    public name: string,
    public location: string,
    public description: string,
    public status: string,
    public allowedPets: Array<string>,
  ) {}
}
