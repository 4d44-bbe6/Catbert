export class Metric {
  constructor(
    public id: string,
    public type: string,
    public value: any,
    public timestamp: Date,
  ) {}
}
