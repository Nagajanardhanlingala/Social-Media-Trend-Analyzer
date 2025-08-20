import React from 'react';
import { MessageCircle, Heart, Share, Hash, Clock } from 'lucide-react';

interface StreamingPost {
  id: string;
  content: string;
  hashtags: string[];
  timestamp: number;
  platform: 'twitter' | 'instagram' | 'tiktok' | 'facebook';
}

interface RecentPostsProps {
  posts: StreamingPost[];
}

export const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'bg-blue-500';
      case 'instagram': return 'bg-pink-500';
      case 'tiktok': return 'bg-red-500';
      case 'facebook': return 'bg-blue-600';
      default: return 'bg-gray-500';
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  };

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
      {posts.map((post, index) => (
        <div 
          key={post.id}
          className={`
            bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
            rounded-xl p-4 hover:bg-gray-800/70 transition-all duration-300
            ${index < 3 ? 'animate-slideIn' : ''}
          `}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getPlatformColor(post.platform)}`}></div>
              <span className="text-gray-400 text-sm capitalize">{post.platform}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Clock className="w-3 h-3" />
              <span>{formatTimeAgo(post.timestamp)}</span>
            </div>
          </div>

          {/* Content */}
          <p className="text-gray-200 text-sm mb-3 line-clamp-2">
            {post.content}
          </p>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {post.hashtags.map((hashtag, idx) => (
              <span 
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-md"
              >
                <Hash className="w-3 h-3" />
                {hashtag.replace('#', '')}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 text-gray-500">
            <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-xs">{Math.floor(Math.random() * 100)}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{Math.floor(Math.random() * 50)}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-green-400 transition-colors">
              <Share className="w-4 h-4" />
              <span className="text-xs">{Math.floor(Math.random() * 25)}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};