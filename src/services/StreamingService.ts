import { Trie } from '../data-structures/Trie';
import { MaxHeap, HashtagData } from '../data-structures/MaxHeap';

interface StreamingPost {
  id: string;
  content: string;
  hashtags: string[];
  timestamp: number;
  platform: 'twitter' | 'instagram' | 'tiktok' | 'facebook';
}

export class StreamingService {
  private trie: Trie;
  private heap: MaxHeap;
  private isStreaming = false;
  private streamInterval: NodeJS.Timeout | null = null;
  private onUpdateCallback?: (data: {
    totalHashtags: number;
    topTrending: HashtagData[];
    recentPosts: StreamingPost[];
    searchResults: Array<{ hashtag: string; count: number }>;
  }) => void;

  private recentPosts: StreamingPost[] = [];
  private currentSearchQuery = '';

  // Sample hashtags for simulation
  private sampleHashtags = [
    '#javascript', '#react', '#typescript', '#webdev', '#coding',
    '#programming', '#tech', '#ai', '#machinelearning', '#nodejs',
    '#python', '#css', '#html', '#frontend', '#backend',
    '#mobile', '#app', '#startup', '#innovation', '#design',
    '#ux', '#ui', '#development', '#software', '#cloud',
    '#aws', '#docker', '#kubernetes', '#api', '#database',
    '#security', '#blockchain', '#crypto', '#data', '#analytics',
    '#visualization', '#opensource', '#github', '#vscode', '#productivity',
    '#tutorial', '#learning', '#career', '#remote', '#work',
    '#trends', '#viral', '#popular', '#trending', '#hot'
  ];

  private platforms: Array<'twitter' | 'instagram' | 'tiktok' | 'facebook'> = 
    ['twitter', 'instagram', 'tiktok', 'facebook'];

  constructor() {
    this.trie = new Trie();
    this.heap = new MaxHeap();
  }

  setUpdateCallback(callback: (data: {
    totalHashtags: number;
    topTrending: HashtagData[];
    recentPosts: StreamingPost[];
    searchResults: Array<{ hashtag: string; count: number }>;
  }) => void): void {
    this.onUpdateCallback = callback;
  }

  private generateRandomPost(): StreamingPost {
    const numHashtags = Math.floor(Math.random() * 4) + 1;
    const selectedHashtags = this.getRandomHashtags(numHashtags);
    
    const post: StreamingPost = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content: this.generatePostContent(selectedHashtags),
      hashtags: selectedHashtags,
      timestamp: Date.now(),
      platform: this.platforms[Math.floor(Math.random() * this.platforms.length)]
    };

    return post;
  }

  private getRandomHashtags(count: number): string[] {
    const shuffled = [...this.sampleHashtags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  private generatePostContent(hashtags: string[]): string {
    const contents = [
      `Just discovered something amazing! ${hashtags.join(' ')}`,
      `Working on a new project with ${hashtags.join(' ')}`,
      `Loving the new features! ${hashtags.join(' ')}`,
      `Check out this cool stuff ${hashtags.join(' ')}`,
      `Amazing progress today ${hashtags.join(' ')}`,
      `Can't believe how good this is ${hashtags.join(' ')}`,
      `New update is fire! ${hashtags.join(' ')}`,
      `This is the future ${hashtags.join(' ')}`,
    ];
    
    return contents[Math.floor(Math.random() * contents.length)];
  }

  private processPost(post: StreamingPost): void {
    // Add to recent posts
    this.recentPosts.unshift(post);
    if (this.recentPosts.length > 20) {
      this.recentPosts = this.recentPosts.slice(0, 20);
    }

    // Process hashtags
    post.hashtags.forEach(hashtag => {
      this.trie.insert(hashtag);
      
      const count = this.trie.getHashtagCount(hashtag);
      const hashtagData: HashtagData = {
        hashtag,
        count,
        timestamp: post.timestamp
      };
      
      this.heap.insert(hashtagData);
    });

    // Trigger update
    this.triggerUpdate();
  }

  private triggerUpdate(): void {
    if (this.onUpdateCallback) {
      const searchResults = this.currentSearchQuery 
        ? this.trie.searchByPrefix(this.currentSearchQuery)
        : [];

      this.onUpdateCallback({
        totalHashtags: this.trie.getAllHashtags().length,
        topTrending: this.heap.getTop(10),
        recentPosts: this.recentPosts,
        searchResults
      });
    }
  }

  startStreaming(): void {
    if (this.isStreaming) return;

    this.isStreaming = true;
    
    // Generate initial burst of data
    for (let i = 0; i < 50; i++) {
      const post = this.generateRandomPost();
      this.processPost(post);
    }

    // Start continuous streaming
    this.streamInterval = setInterval(() => {
      const post = this.generateRandomPost();
      this.processPost(post);
    }, 1000 + Math.random() * 2000); // Random interval between 1-3 seconds
  }

  stopStreaming(): void {
    if (!this.isStreaming) return;

    this.isStreaming = false;
    if (this.streamInterval) {
      clearInterval(this.streamInterval);
      this.streamInterval = null;
    }
  }

  search(query: string): Array<{ hashtag: string; count: number }> {
    this.currentSearchQuery = query;
    const results = this.trie.searchByPrefix(query);
    this.triggerUpdate();
    return results;
  }

  getAllHashtags(): Array<{ hashtag: string; count: number }> {
    return this.trie.getAllHashtags();
  }

  getTopTrending(limit: number = 10): HashtagData[] {
    return this.heap.getTop(limit);
  }

  getTotalHashtagCount(): number {
    return this.heap.size();
  }

  isCurrentlyStreaming(): boolean {
    return this.isStreaming;
  }
}