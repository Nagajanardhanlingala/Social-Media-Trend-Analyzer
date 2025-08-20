import React from 'react';
import { TrendingUp, Hash, Clock } from 'lucide-react';
import { HashtagData } from '../data-structures/MaxHeap';

interface TrendingCardProps {
  data: HashtagData;
  rank: number;
  isAnimated?: boolean;
}

export const TrendingCard: React.FC<TrendingCardProps> = ({ 
  data, 
  rank, 
  isAnimated = false 
}) => {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    if (rank === 2) return 'text-gray-300 bg-gray-300/10 border-gray-300/20';
    if (rank === 3) return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className={`
      group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
      rounded-xl p-6 hover:bg-gray-800/70 hover:border-gray-600/50 
      transition-all duration-300 hover:scale-105 hover:shadow-xl
      ${isAnimated ? 'animate-pulse' : ''}
    `}>
      {/* Rank Badge */}
      <div className={`
        absolute -top-3 -right-3 w-8 h-8 rounded-full border-2 
        flex items-center justify-center font-bold text-sm
        ${getRankColor(rank)}
      `}>
        {rank}
      </div>

      {/* Trending Icon */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-gray-400" />
            <span className="font-mono text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
              {data.hashtag}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Mentions</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-bold text-xl text-white">
              {data.count.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <Clock className="w-3 h-3" />
            <span>Last seen</span>
          </div>
          <span className="text-gray-300 text-sm">
            {formatTimeAgo(data.timestamp)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((data.count / 100) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};