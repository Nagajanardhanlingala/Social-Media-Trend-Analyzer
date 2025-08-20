import React from 'react';
import { Hash, TrendingUp, Search } from 'lucide-react';

interface SearchResultsProps {
  results: Array<{ hashtag: string; count: number }>;
  query: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, query }) => {
  if (!query) return null;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
          <Search className="w-5 h-5 text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">
          Search Results for "{query}"
        </h3>
        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
          {results.length} found
        </span>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-8">
          <div className="p-4 bg-gray-700/30 rounded-full w-16 h-16 mx-auto mb-4">
            <Hash className="w-8 h-8 text-gray-500 mx-auto" />
          </div>
          <p className="text-gray-400 text-lg mb-2">No hashtags found</p>
          <p className="text-gray-500 text-sm">
            Try searching for a different term or check the spelling
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((result, index) => (
            <div 
              key={result.hashtag}
              className="bg-gray-700/30 border border-gray-600/30 rounded-lg p-4 hover:bg-gray-700/50 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-1 bg-purple-500/20 rounded">
                  <Hash className="w-4 h-4 text-purple-400" />
                </div>
                <span className="font-mono text-white font-semibold">
                  {result.hashtag}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <TrendingUp className="w-3 h-3" />
                  <span>Mentions</span>
                </div>
                <span className="font-bold text-lg text-white">
                  {result.count.toLocaleString()}
                </span>
              </div>
              
              {/* Mini progress bar */}
              <div className="w-full bg-gray-600 rounded-full h-1 mt-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full"
                  style={{ width: `${Math.min((result.count / results[0]?.count || 1) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};