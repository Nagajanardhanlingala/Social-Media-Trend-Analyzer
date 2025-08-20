import React, { useState } from 'react';
import { Search, Hash, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search hashtags..." 
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <div className={`
        relative flex items-center bg-gray-800/50 backdrop-blur-sm border-2 
        rounded-xl transition-all duration-300
        ${isFocused ? 'border-cyan-500/50 bg-gray-800/70' : 'border-gray-700/50'}
      `}>
        {/* Search Icon */}
        <div className="absolute left-4 flex items-center">
          <Search className={`
            w-5 h-5 transition-colors duration-300
            ${isFocused ? 'text-cyan-400' : 'text-gray-400'}
          `} />
        </div>

        {/* Hash Icon */}
        <div className="absolute left-12 flex items-center">
          <Hash className="w-4 h-4 text-gray-500" />
        </div>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            w-full pl-20 pr-12 py-4 bg-transparent text-white 
            placeholder-gray-500 focus:outline-none text-lg
          "
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="
              absolute right-4 p-1 rounded-full bg-gray-700 
              hover:bg-gray-600 transition-colors duration-200
            "
          >
            <X className="w-4 h-4 text-gray-300" />
          </button>
        )}
      </div>

      {/* Search Button */}
      <button
        type="submit"
        disabled={!query.trim()}
        className="
          absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 
          bg-gradient-to-r from-blue-500 to-cyan-500 
          text-white rounded-lg font-semibold
          hover:from-blue-600 hover:to-cyan-600 
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
        "
      >
        Search
      </button>
    </form>
  );
};