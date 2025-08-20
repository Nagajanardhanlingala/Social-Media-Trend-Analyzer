export interface HashtagData {
  hashtag: string;
  count: number;
  timestamp: number;
}

export class MaxHeap {
  private heap: HashtagData[] = [];
  private hashtagMap: Map<string, number> = new Map(); // hashtag -> index

  private parent(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  private leftChild(i: number): number {
    return 2 * i + 1;
  }

  private rightChild(i: number): number {
    return 2 * i + 2;
  }

  private swap(i: number, j: number): void {
    // Update map indices
    this.hashtagMap.set(this.heap[i].hashtag, j);
    this.hashtagMap.set(this.heap[j].hashtag, i);
    
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private heapifyUp(index: number): void {
    while (index > 0) {
      const parentIndex = this.parent(index);
      if (this.heap[index].count <= this.heap[parentIndex].count) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  private heapifyDown(index: number): void {
    while (this.leftChild(index) < this.heap.length) {
      let maxChildIndex = this.leftChild(index);
      
      if (this.rightChild(index) < this.heap.length &&
          this.heap[this.rightChild(index)].count > this.heap[maxChildIndex].count) {
        maxChildIndex = this.rightChild(index);
      }

      if (this.heap[index].count >= this.heap[maxChildIndex].count) {
        break;
      }

      this.swap(index, maxChildIndex);
      index = maxChildIndex;
    }
  }

  insert(hashtagData: HashtagData): void {
    const existingIndex = this.hashtagMap.get(hashtagData.hashtag);
    
    if (existingIndex !== undefined) {
      // Update existing hashtag
      this.heap[existingIndex] = hashtagData;
      this.heapifyUp(existingIndex);
      this.heapifyDown(existingIndex);
    } else {
      // Insert new hashtag
      this.heap.push(hashtagData);
      this.hashtagMap.set(hashtagData.hashtag, this.heap.length - 1);
      this.heapifyUp(this.heap.length - 1);
    }
  }

  getTop(n: number): HashtagData[] {
    return this.heap.slice(0, Math.min(n, this.heap.length))
      .sort((a, b) => b.count - a.count);
  }

  size(): number {
    return this.heap.length;
  }

  peek(): HashtagData | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  getAllSorted(): HashtagData[] {
    return [...this.heap].sort((a, b) => b.count - a.count);
  }
}