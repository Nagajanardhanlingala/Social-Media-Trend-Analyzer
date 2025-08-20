export interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  count: number;
  hashtag: string;
}

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = {
      children: new Map(),
      isEndOfWord: false,
      count: 0,
      hashtag: ''
    };
  }

  insert(hashtag: string): void {
    const word = hashtag.toLowerCase().replace('#', '');
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, {
          children: new Map(),
          isEndOfWord: false,
          count: 0,
          hashtag: ''
        });
      }
      current = current.children.get(char)!;
    }

    current.isEndOfWord = true;
    current.count += 1;
    current.hashtag = hashtag;
  }

  search(hashtag: string): TrieNode | null {
    const word = hashtag.toLowerCase().replace('#', '');
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        return null;
      }
      current = current.children.get(char)!;
    }

    return current.isEndOfWord ? current : null;
  }

  getHashtagCount(hashtag: string): number {
    const node = this.search(hashtag);
    return node ? node.count : 0;
  }

  getAllHashtags(): Array<{ hashtag: string; count: number }> {
    const result: Array<{ hashtag: string; count: number }> = [];
    
    const dfs = (node: TrieNode) => {
      if (node.isEndOfWord && node.hashtag) {
        result.push({ hashtag: node.hashtag, count: node.count });
      }
      
      for (const child of node.children.values()) {
        dfs(child);
      }
    };

    dfs(this.root);
    return result;
  }

  searchByPrefix(prefix: string): Array<{ hashtag: string; count: number }> {
    const word = prefix.toLowerCase().replace('#', '');
    let current = this.root;

    // Navigate to the prefix
    for (const char of word) {
      if (!current.children.has(char)) {
        return [];
      }
      current = current.children.get(char)!;
    }

    // Collect all hashtags with this prefix
    const result: Array<{ hashtag: string; count: number }> = [];
    
    const dfs = (node: TrieNode) => {
      if (node.isEndOfWord && node.hashtag) {
        result.push({ hashtag: node.hashtag, count: node.count });
      }
      
      for (const child of node.children.values()) {
        dfs(child);
      }
    };

    dfs(current);
    return result.sort((a, b) => b.count - a.count);
  }
}