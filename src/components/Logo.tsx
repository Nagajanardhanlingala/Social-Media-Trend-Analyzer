import React from 'react';
import { Hash, TrendingUp, Zap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`
        relative ${sizeClasses[size]} 
        bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600 
        rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
        flex items-center justify-center group cursor-pointer
        hover:scale-105 hover:rotate-3
      `}>
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
        
        {/* Main icon container */}
        <div className="relative z-10 flex items-center justify-center">
          {/* Primary Hash icon */}
          <Hash className={`${iconSizeClasses[size]} text-white absolute transform -translate-x-1 -translate-y-1`} />
          
          {/* Trending arrow overlay */}
          <TrendingUp className={`${iconSizeClasses[size]} text-white/80 absolute transform translate-x-1 translate-y-1`} />
          
          {/* Spark effect */}
          <Zap className={`${iconSizeClasses[size]} text-yellow-300 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse`} />
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`
            ${textSizeClasses[size]} font-bold 
            bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 
            bg-clip-text text-transparent
            hover:from-blue-300 hover:via-cyan-300 hover:to-purple-300
            transition-all duration-300
          `}>
            TrendScope
          </h1>
          {size !== 'sm' && (
            <p className="text-gray-400 text-xs font-medium tracking-wide">
              Real-time hashtag tracking with Trie & Heap
            </p>
          )}
        </div>
      )}
    </div>
  );
};