import React, { useState, useEffect } from 'react';
import { Play, Pause, BarChart3, Search, Hash, Activity, Zap } from 'lucide-react';
import { StreamingService } from './services/StreamingService';
import { HashtagData } from './data-structures/MaxHeap';
import { Logo } from './components/Logo';
import { TrendingCard } from './components/TrendingCard';
import { SearchBar } from './components/SearchBar';
import { RecentPosts } from './components/RecentPosts';
import { Analytics } from './components/Analytics';
import { SearchResults } from './components/SearchResults';

interface StreamingPost {
  id: string;
  content: string;
  hashtags: string[];
  timestamp: number;
  platform: 'twitter' | 'instagram' | 'tiktok' | 'facebook';
}

function App() {
  const [streamingService] = useState(() => new StreamingService());
  const [isStreaming, setIsStreaming] = useState(false);
  const [totalHashtags, setTotalHashtags] = useState(0);
  const [topTrending, setTopTrending] = useState<HashtagData[]>([]);
  const [recentPosts, setRecentPosts] = useState<StreamingPost[]>([]);
  const [searchResults, setSearchResults] = useState<Array<{ hashtag: string; count: number }>>([]);
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'trending' | 'analytics' | 'search'>('trending');

  useEffect(() => {
    streamingService.setUpdateCallback((data) => {
      setTotalHashtags(data.totalHashtags);
      setTopTrending(data.topTrending);
      setRecentPosts(data.recentPosts);
      setSearchResults(data.searchResults);
    });

    // Start streaming automatically
    streamingService.startStreaming();
    setIsStreaming(true);

    return () => {
      streamingService.stopStreaming();
    };
  }, [streamingService]);

  const toggleStreaming = () => {
    if (isStreaming) {
      streamingService.stopStreaming();
      setIsStreaming(false);
    } else {
      streamingService.startStreaming();
      setIsStreaming(true);
    }
  };

  const handleSearch = (query: string) => {
    setCurrentSearchQuery(query);
    streamingService.search(query);
    if (query) {
      setActiveTab('search');
    }
  };

  const tabs = [
    { id: 'trending', label: 'Trending', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'search', label: 'Search', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Logo size="lg" />
              </div>

              <div className="flex items-center gap-4">
                {/* Stream Status */}
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                  <span className="text-sm font-medium text-gray-300">
                    {isStreaming ? 'Live Stream' : 'Stream Offline'}
                  </span>
                </div>

                {/* Stream Control */}
                <button
                  onClick={toggleStreaming}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
                    ${isStreaming 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                    }
                  `}
                >
                  {isStreaming ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Stop Stream
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Start Stream
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-6 flex justify-center">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Navigation Tabs */}
            <div className="mt-6 flex justify-center">
              <div className="flex bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 border border-gray-700/50">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`
                        flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
                        ${activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {activeTab === 'trending' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg">
                        <Zap className="w-6 h-6 text-yellow-400" />
                      </div>
                      Top Trending Hashtags
                    </h2>
                    <div className="text-gray-400 text-sm">
                      Updated: {new Date().toLocaleTimeString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {topTrending.map((item, index) => (
                      <TrendingCard
                        key={item.hashtag}
                        data={item}
                        rank={index + 1}
                        isAnimated={index < 3}
                      />
                    ))}
                  </div>

                  {topTrending.length === 0 && (
                    <div className="text-center py-12">
                      <div className="p-6 bg-gray-800/30 rounded-full w-24 h-24 mx-auto mb-6">
                        <Hash className="w-12 h-12 text-gray-500 mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-300 mb-2">
                        No trending hashtags yet
                      </h3>
                      <p className="text-gray-500">
                        Start the stream to begin tracking hashtags in real-time
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'analytics' && (
                <Analytics
                  totalHashtags={totalHashtags}
                  topTrending={topTrending}
                  isStreaming={isStreaming}
                />
              )}

              {activeTab === 'search' && (
                <SearchResults
                  results={searchResults}
                  query={currentSearchQuery}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-32">
                {/* Recent Posts */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-cyan-400" />
                      Live Feed
                    </h3>
                    {isStreaming && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-xs font-semibold">LIVE</span>
                      </div>
                    )}
                  </div>
                  <RecentPosts posts={recentPosts} />
                </div>

                {/* Quick Stats */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Unique Hashtags</span>
                      <span className="font-bold text-white">{totalHashtags}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Total Posts</span>
                      <span className="font-bold text-white">{recentPosts.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Top Hashtag</span>
                      <span className="font-bold text-cyan-400 font-mono">
                        {topTrending[0]?.hashtag || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Stream Status</span>
                      <span className={`font-bold ${isStreaming ? 'text-green-400' : 'text-red-400'}`}>
                        {isStreaming ? 'Active' : 'Paused'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;