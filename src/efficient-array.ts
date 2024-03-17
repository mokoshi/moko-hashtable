export class EfficientArray {
  private sorted: { key: string; value: string }[] = [];

  insert(data: { key: string; value: string }) {
    this.sorted.splice(this.findIndex(data.key), 0, data);
  }
  find(key: string) {
    const i = this.findIndex(key);
    return this.sorted[i].key === key ? this.sorted[i].value : undefined;
  }

  private findIndex(key: string) {
    let left = 0;
    let right = this.sorted.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (this.sorted[mid].key < key) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return left;
  }
}
