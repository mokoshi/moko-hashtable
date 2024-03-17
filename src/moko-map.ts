// key-value(string-string) を取り扱える Map
export class MokoMap {
  private hashTable: { key: string; value: string }[][];
  private arrLen: number;

  // 配列の長さは素数にしておいたほうが良さそう。キーの衝突が減りそう
  constructor(arrLen = 10000019) {
    this.arrLen = arrLen;
    this.hashTable = new Array(arrLen).fill([]);
  }
  set(key: string, value: string) {
    // 同じインデックスのデータは配列に追加していく形で作ってみる
    this.hashTable[this.makeHash(key)].push({ key, value });
  }
  get(key: string) {
    // インデックスの衝突が増えるとここが遅くなっていきそう
    return this.hashTable[this.makeHash(key)].find((i) => i.key === key)?.value;
  }

  // キーからインデックスを計算するハッシュ関数
  makeHash(key: string) {
    let t = 1;
    for (let i = 0; i < key.length; i++) {
      t = (t * key.charCodeAt(i)) % this.arrLen;
    }
    return t;
  }
}
