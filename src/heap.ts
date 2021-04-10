import autoBind from 'auto-bind';

export default class Heap<T> {
  constructor(private comparator: (item1: T, item2: T) => T) {
    autoBind(this);
  }

  add(item: T): void {
    return;
  }

  removeItem(): T | null {
    return null;
  }

  hasItem(): boolean {
    return false;
  }
}
