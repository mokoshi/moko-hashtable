import { EfficientArray } from "./efficient-array";

export class MokoMap2 {
  private hashTable: EfficientArray[];
  private arrLen: number;

  constructor(arrLen = 10000019) {
    this.arrLen = arrLen;
    this.hashTable = new Array(arrLen).fill(new EfficientArray());
  }
  set(key: string, value: string) {
    this.hashTable[this.makeHash(key)].insert({ key, value });
  }
  get(key: string) {
    return this.hashTable[this.makeHash(key)].find(key);
  }

  makeHash(key: string) {
    let t = 1;
    for (let i = 0; i < key.length; i++) {
      t = (t * key.charCodeAt(i)) % this.arrLen;
    }
    return t;
  }
}
