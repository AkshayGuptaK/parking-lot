import Heap from './heap';

function compareNumbers(firstNumber: number, secondNumber: number) {
  return firstNumber <= secondNumber;
}

describe('Heap', () => {
  it('should return null when empty and requested for next item', () => {
    const heap = new Heap<number>(compareNumbers);
    expect(heap.removeItem()).toBeNull();
  });

  it('should return false when empty and asked if contains items', () => {
    const heap = new Heap<number>(compareNumbers);
    expect(heap.hasItem()).toBe(false);
  });

  it('should return added item when only one item is contained', () => {
    const heap = new Heap<number>(compareNumbers);
    heap.add(5);
    expect(heap.removeItem()).toBe(5);
  });

  it('should remove added item when only one item is contained', () => {
    const heap = new Heap<number>(compareNumbers);
    heap.add(3);
    heap.removeItem();
    expect(heap.removeItem()).toBeNull();
    expect(heap.hasItem()).toBe(false);
  });

  it('should return smallest item when multiple items are contained', () => {
    const heap = new Heap<number>(compareNumbers);
    heap.add(4);
    heap.add(2);
    heap.add(6);
    expect(heap.removeItem()).toBe(2);
  });

  it('should return smallest items in order when multiple items are contained', () => {
    const heap = new Heap<number>(compareNumbers);
    heap.add(5);
    heap.add(3);
    heap.add(7);
    heap.add(1);
    heap.add(5);
    expect(heap.removeItem()).toBe(1);
    expect(heap.removeItem()).toBe(3);
    expect(heap.removeItem()).toBe(5);
    expect(heap.removeItem()).toBe(5);
    expect(heap.removeItem()).toBe(7);
    expect(heap.hasItem()).toBe(false);
  });
});
