export class ArrayDto<Model, SerializedModel> {
  constructor(
    private type: new (value: Model) => { toJSON(): SerializedModel },
    private values: Model[],
  ) {}

  toJSON() {
    return this.values.map((value) => new this.type(value).toJSON());
  }
}
