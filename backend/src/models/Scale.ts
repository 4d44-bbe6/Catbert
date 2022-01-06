class Scale {
  private id: string;
  public name: string;
  public description: string;
  public location: string;

  constructor(id: string, name: string, description: string, location: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.location = location;
  }
}

export default Scale;
