interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getElements: () => T[] | null;
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  constructor(initialElements: T[] = []) {
    this.container = initialElements;
  }

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  clear = (): void => {
    this.container = [];
  };

  getElements(): T[] {
    return this.container;
  }

  getSize = (): number => this.container.length;
}


