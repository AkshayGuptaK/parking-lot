import autoBind from 'auto-bind';

/**
 * Heap data structure with simple add and remove capabilities.
 * Uses the provided comparator function to determine heap order.
 * @typeparam T - the type of items the heap contains.
 */
export default class Heap<T> {
  private items: [null, T?];
  private size = 0;

  /**
   * @param comparator - Function which takes two items of type T and returns true if the first item should be ordered first, and false otherwise.
   * @remarks The items are stored as an array, with a dummy null item at the beginning. This keeps the math for determining parent and children indexes simple.
   */
  constructor(private comparator: (item1: T, item2: T) => boolean) {
    this.items = [null];
    autoBind(this);
  }

  /**
   * Adds an item to the heap.
   * @remarks Places the new item in the last position and then promotes it up to its correct place.
   * @param item - item to be added.
   */
  add(item: T): void {
    this.items.push(item);
    this.size++;
    if (this.size > 1) this.promote(this.size);
  }

  /**
   * @returns whether the heap contains any items or not.
   */
  hasItem(): boolean {
    return this.size > 0;
  }

  /**
   * Removes and returns the first item.
   * @returns the item in the heap determined as most prior by the comparator fn.
   * @remarks Restructures the heap post removal by placing the last item at the first position and then demoting it down to its correct place.
   */
  removeItem(): T | null {
    if (!this.hasItem()) return null;
    const smallest = this.items[1] as T;
    const last = this.items.pop() as T;
    this.size--;
    if (smallest !== last) {
      this.items[1] = last;
      this.demote(1);
    }
    return smallest;
  }

  /**
   * Recursively promotes an item by comparing it to its parent and swapping if required.
   * @param childIndex - index of the item to be considered for promotion.
   */
  private promote(childIndex: number): void {
    if (childIndex <= 1) return;
    const parentIndex = Math.floor(childIndex / 2);
    this.compareAndSwap(parentIndex, childIndex) && this.promote(parentIndex);
  }

  /**
   * Recursively demotes an item by comparing it to its children and swapping with the smaller child.
   * @param parentIndex - index of the item to be considered for demotion.
   */
  private demote(parentIndex: number): void {
    const leftChildIndex = parentIndex * 2;
    if (leftChildIndex > this.size) return;
    const rightChildIndex = parentIndex * 2 + 1;
    if (rightChildIndex > this.size) {
      this.compareAndSwap(parentIndex, leftChildIndex);
      return;
    }
    if (
      this.comparator(
        this.items[leftChildIndex] as T,
        this.items[rightChildIndex] as T
      )
    ) {
      this.compareAndSwap(parentIndex, leftChildIndex) &&
        this.demote(leftChildIndex);
      return;
    }
    this.compareAndSwap(parentIndex, rightChildIndex) &&
      this.demote(rightChildIndex);
  }

  /**
   * Compares a parent with one of its children and swaps them if the child should be ordered before the parent
   * @param parentIndex - index of parent item being compared
   * @param childIndex - index of child item being compared
   * @returns whether a swap was made
   */
  private compareAndSwap(parentIndex: number, childIndex: number): boolean {
    const childItem = this.items[childIndex] as T;
    const parentItem = this.items[parentIndex] as T;
    if (this.comparator(parentItem, childItem)) {
      return false;
    }
    this.items[parentIndex] = childItem;
    this.items[childIndex] = parentItem;
    return true;
  }
}
