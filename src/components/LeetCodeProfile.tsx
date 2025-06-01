
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Trophy, Calendar, Code, CheckCircle, Clock, Target } from 'lucide-react';

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions: number;
  easyTotal: number;
  mediumTotal: number;
  hardTotal: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

const LeetCodeProfile = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data since we can't fetch from LeetCode directly due to CORS
  useEffect(() => {
    const mockStats: LeetCodeStats = {
      totalSolved: 347,
      easySolved: 156,
      mediumSolved: 162,
      hardSolved: 29,
      totalQuestions: 3200,
      easyTotal: 800,
      mediumTotal: 1650,
      hardTotal: 750,
      acceptanceRate: 62.4,
      ranking: 89234,
      contributionPoints: 2156,
      reputation: 0
    };

    setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, []);

  const getPercentage = (solved: number, total: number) => {
    return ((solved / total) * 100).toFixed(1);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-400 to-green-600';
      case 'medium': return 'from-yellow-400 to-orange-500';
      case 'hard': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Unable to load LeetCode profile data</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg border-white/10">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-white">bhanutejamakkineni</CardTitle>
          <div className="flex justify-center gap-4 mt-4">
            <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-400/30">
              <Trophy className="w-4 h-4 mr-1" />
              Rank {stats.ranking.toLocaleString()}
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-400/30">
              <Target className="w-4 h-4 mr-1" />
              {stats.contributionPoints} Points
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-lg border-green-400/20 hover:border-green-400/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{stats.totalSolved}</div>
            <div className="text-green-300 text-sm">Problems Solved</div>
            <div className="text-gray-400 text-xs mt-1">
              {getPercentage(stats.totalSolved, stats.totalQuestions)}% of total
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-lg border-blue-400/20 hover:border-blue-400/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{stats.acceptanceRate}%</div>
            <div className="text-blue-300 text-sm">Acceptance Rate</div>
            <div className="text-gray-400 text-xs mt-1">
              Solutions accepted
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-lg border-purple-400/20 hover:border-purple-400/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{stats.ranking.toLocaleString()}</div>
            <div className="text-purple-300 text-sm">Global Ranking</div>
            <div className="text-gray-400 text-xs mt-1">
              Out of millions
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-lg border-orange-400/20 hover:border-orange-400/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">{stats.contributionPoints}</div>
            <div className="text-orange-300 text-sm">Contribution Points</div>
            <div className="text-gray-400 text-xs mt-1">
              Community contributions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Problem Difficulty Breakdown */}
      <Card className="bg-slate-800/50 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-purple-400" />
            Problems Solved by Difficulty
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Easy */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-green-400 font-semibold">Easy</span>
              <span className="text-white">
                {stats.easySolved} / {stats.easyTotal}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(stats.easySolved / stats.easyTotal) * 100}%` }}
              />
            </div>
            <div className="text-right text-sm text-gray-400">
              {getPercentage(stats.easySolved, stats.easyTotal)}%
            </div>
          </div>

          {/* Medium */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-yellow-400 font-semibold">Medium</span>
              <span className="text-white">
                {stats.mediumSolved} / {stats.mediumTotal}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(stats.mediumSolved / stats.mediumTotal) * 100}%` }}
              />
            </div>
            <div className="text-right text-sm text-gray-400">
              {getPercentage(stats.mediumSolved, stats.mediumTotal)}%
            </div>
          </div>

          {/* Hard */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-red-400 font-semibold">Hard</span>
              <span className="text-white">
                {stats.hardSolved} / {stats.hardTotal}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(stats.hardSolved / stats.hardTotal) * 100}%` }}
              />
            </div>
            <div className="text-right text-sm text-gray-400">
              {getPercentage(stats.hardSolved, stats.hardTotal)}%
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-slate-800/50 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { problem: "Two Sum", difficulty: "Easy", status: "Solved", date: "2 days ago" },
              { problem: "Longest Substring Without Repeating Characters", difficulty: "Medium", status: "Solved", date: "3 days ago" },
              { problem: "Median of Two Sorted Arrays", difficulty: "Hard", status: "Attempted", date: "5 days ago" },
              { problem: "Add Two Numbers", difficulty: "Medium", status: "Solved", date: "1 week ago" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'Solved' ? 'bg-green-400' : 'bg-yellow-400'
                  }`}></div>
                  <div>
                    <div className="text-white font-medium">{activity.problem}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className={`text-xs ${
                        activity.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300 border-green-400/30' :
                        activity.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30' :
                        'bg-red-500/20 text-red-300 border-red-400/30'
                      }`}>
                        {activity.difficulty}
                      </Badge>
                      <span className="text-gray-400 text-xs">{activity.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {activity.status === 'Solved' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-400" />
                  )}
                  <span className={`text-sm ${
                    activity.status === 'Solved' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Link */}
      <div className="text-center">
        <a 
          href="https://leetcode.com/u/bhanutejamakkineni/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          View Full Profile on LeetCode
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default LeetCodeProfile;
