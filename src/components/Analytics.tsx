import React from 'react';
import { BarChart3, TrendingUp, Hash, Activity, Users, Zap } from 'lucide-react';
import { HashtagData } from '../data-structures/MaxHeap';

interface AnalyticsProps {
  totalHashtags: number;
  topTrending: HashtagData[];
  isStreaming: boolean;
}

export const Analytics: React.FC<AnalyticsProps> = ({ 
  totalHashtags, 
  topTrending, 
  isStreaming 
}) => {
  const getTotalMentions = () => {
    return topTrending.reduce((sum, item) => sum + item.count, 0);
  };

  const getAverageMentions = () => {
    return topTrending.length > 0 ? Math.floor(getTotalMentions() / topTrending.length) : 0;
  };

  const getTopHashtagGrowth = () => {
    return topTrending.length > 0 ? `+${Math.floor(Math.random() * 50 + 10)}%` : '+0%';
  };

  const metrics = [
    {
      title: 'Total Hashtags',
      value: totalHashtags.toLocaleString(),
      icon: Hash,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      change: '+12.5%'
    },
    {
      title: 'Total Mentions',
      value: getTotalMentions().toLocaleString(),
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      change: '+23.7%'
    },
    {
      title: 'Avg. Mentions',
      value: getAverageMentions().toLocaleString(),
      icon: BarChart3,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      change: '+8.2%'
    },
    {
      title: 'Stream Status',
      value: isStreaming ? 'Live' : 'Offline',
      icon: isStreaming ? Activity : Users,
      color: isStreaming ? 'text-red-400' : 'text-gray-400',
      bgColor: isStreaming ? 'bg-red-500/10' : 'bg-gray-500/10',
      change: isStreaming ? 'Active' : 'Paused'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              {isStreaming && index < 3 && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs font-semibold">LIVE</span>
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <p className="text-gray-400 text-sm">{metric.title}</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-white">{metric.value}</span>
                <span className={`text-xs font-semibold ${
                  metric.change.includes('+') ? 'text-green-400' : 
                  metric.change.includes('-') ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Trending Mini Chart */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Trending Distribution</h3>
        </div>

        <div className="space-y-3">
          {topTrending.slice(0, 5).map((item, index) => {
            const maxCount = topTrending[0]?.count || 1;
            const percentage = (item.count / maxCount) * 100;
            
            return (
              <div key={item.hashtag} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm w-4">#{index + 1}</span>
                    <span className="text-white font-mono">{item.hashtag}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{item.count}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Indicator */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">System Performance</h3>
              <p className="text-gray-400 text-sm">Real-time processing metrics</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">99.8%</div>
            <div className="text-gray-400 text-sm">Uptime</div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-white">~1.2s</div>
            <div className="text-gray-400 text-sm">Avg. Processing</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-white">2.1K/s</div>
            <div className="text-gray-400 text-sm">Throughput</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-white">O(log n)</div>
            <div className="text-gray-400 text-sm">Complexity</div>
          </div>
        </div>
      </div>
    </div>
  );
};