// deno-lint-ignore-file

export default class Delegate<T extends any[]> {
  private _insideFuncts: ((...params: T) => void)[] = [];

  constructor() {}

  add(...functs: ((...params: T) => void)[]): void {
    this._insideFuncts.push(...functs);
  }

  invoke(...params: T): void {
    this._insideFuncts.forEach(funct => funct(...params));
  }
}
