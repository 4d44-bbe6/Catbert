class Metric {
  private id: string;
  private type: string;
  private value: string;

  constructor(id: string, type: string, value: string) {
    this.id = id;
    this.type = type;
    this.value = value;
  }
}

export default Metric;
