export class StatTableArtifact {
  constructor(values) {
    this.values = values;
  }

  getValue(level) {
    if (level < this.values.length) {
      return this.values[level];
    }

    return 0;
  }
}
