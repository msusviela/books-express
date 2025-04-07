import { Filter } from './filters';

export class Pipeline {
  filters: Filter[];

  constructor() {
    this.filters = [];
  }
  use(filter: Filter) {
    this.filters.push(filter);
  }
  run(input: string): string {
    const result = this.filters.reduce(function (total, func) {
      return func(total);
    }, input);

    return result;
  }
}

export default Pipeline;
