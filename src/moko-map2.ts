import { EfficientArray } from "./efficient-array";

export class MokoMap2 {
  private hashTable: EfficientArray[];
  private arrLen: number;
  private stats: { [tier: number]: number } = {};
  private tierDiv = 100000;

  constructor(arrLen = 10000019) {
    this.arrLen = arrLen;
    this.hashTable = new Array(arrLen).fill(new EfficientArray());
  }
  set(key: string, value: string) {
    const i = this.makeHash(key);
    this.hashTable[i].insert({ key, value });
    const tier = Math.floor(i / this.tierDiv);
    this.stats[tier] = (this.stats[tier] ?? 0) + 1;
  }
  get(key: string) {
    return this.hashTable[this.makeHash(key)].find(key);
  }
  getStats() {
    return { stats: this.stats, tierDiv: this.tierDiv };
  }

  makeHash(key: string) {
    let t = 1;
    for (let i = 0; i < key.length; i++) {
      t = (t * key.charCodeAt(i)) % this.arrLen;
    }
    return t;
  }
}
