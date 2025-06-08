import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Trophy, Calendar, Code, CheckCircle, Clock, Target, MapPin, GraduationCap } from 'lucide-react';

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
  activeDays: number;
  maxStreak: number;
  languages: {
    python3: number;
    java: number;
  };
}

const LeetCodeProfile = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Since we can't directly fetch from LeetCode GraphQL due to CORS,
    // we'll use updated mock data based on your profile
    // In a real implementation, you'd need a backend proxy to fetch this data
    const updatedStats: LeetCodeStats = {
      totalSolved: 636,
      easySolved: 359,
      mediumSolved: 247,
      hardSolved: 30,
      totalQuestions: 3431,
      easyTotal: 852,
      mediumTotal: 1787,
      hardTotal: 792,
      acceptanceRate: 62.4,
      ranking: 80713,
      activeDays: 211,
      maxStreak: 127,
      languages: {
        python3: 633,
        java: 81
      }
    };

    setTimeout(() => {
      setStats(updatedStats);
      setLoading(false);
    }, 1000);
  }, []);

  const getPercentage = (solved: number, total: number) => {
    return ((solved / total) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
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
            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="/profile_image.jpg" 
                alt="Bhanu Teja Makkineni"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <CardTitle className="text-3xl text-white mb-2">Bhanu Teja</CardTitle>
          <div className="flex justify-center gap-4 mb-4">
            <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-400/30">
              <Trophy className="w-4 h-4 mr-1" />
              Rank {stats.ranking.toLocaleString()}
            </Badge>
          </div>
          <div className="flex justify-center items-center gap-4 text-gray-300">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>India</span>
            </div>
            <div className="flex items-center gap-1">
              <GraduationCap className="w-4 h-4" />
              <span>Malla Reddy College of Engineering & Technology</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-lg border-green-400/20 hover:border-green-400/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">{stats.totalSolved}</div>
            <div className="text-green-300 text-lg font-semibold">Solved</div>
            <div className="text-gray-400 text-sm mt-1">
              {stats.totalSolved} / {stats.totalQuestions}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-lg border-blue-400/20 hover:border-blue-400/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">{stats.activeDays}</div>
            <div className="text-blue-300 text-lg font-semibold">Total active days</div>
            <div className="text-gray-400 text-sm mt-1">
              Consistent practice
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-lg border-purple-400/20 hover:border-purple-400/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">{stats.maxStreak}</div>
            <div className="text-purple-300 text-lg font-semibold">Max streak</div>
            <div className="text-gray-400 text-sm mt-1">
              Days in a row
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-lg border-orange-400/20 hover:border-orange-400/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">{stats.ranking.toLocaleString()}</div>
            <div className="text-orange-300 text-lg font-semibold">Global Ranking</div>
            <div className="text-gray-400 text-sm mt-1">
              Out of millions
            </div>
          </CardContent>
        </Card>
      </div> */}

      {/* Languages */}
      <Card className="bg-slate-800/50 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-cyan-400" />
            Languages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">Python3</div>
              {/* <div className="text-4xl font-bold text-white mb-2">{stats.languages.python3}</div> */}
              {/* <div className="text-gray-400">problems solved</div> */}
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-2">Java</div>
              {/* <div className="text-4xl font-bold text-white mb-2">{stats.languages.java}</div> */}
              {/* <div className="text-gray-400">problems solved</div> */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problem Difficulty Breakdown */}
      {/* <Card className="bg-slate-800/50 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            Problems Solved by Difficulty
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-green-400 font-bold text-lg">Easy</span>
              <span className="text-white text-lg font-semibold">
                {stats.easySolved}/{stats.easyTotal}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(stats.easySolved / stats.easyTotal) * 100}%` }}
              />
            </div>
            <div className="text-right text-sm text-gray-400">
              {getPercentage(stats.easySolved, stats.easyTotal)}%
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-yellow-400 font-bold text-lg">Medium</span>
              <span className="text-white text-lg font-semibold">
                {stats.mediumSolved}/{stats.mediumTotal}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(stats.mediumSolved / stats.mediumTotal) * 100}%` }}
              />
            </div>
            <div className="text-right text-sm text-gray-400">
              {getPercentage(stats.mediumSolved, stats.mediumTotal)}%
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-red-400 font-bold text-lg">Hard</span>
              <span className="text-white text-lg font-semibold">
                {stats.hardSolved}/{stats.hardTotal}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
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
      </Card> */}

      {/* Badges Section */}
      {/* <Card className="bg-slate-800/50 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-cyan-400" />
            Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-2xl mb-2">🥇</div>
              <div className="text-sm text-gray-300">Problem Solver</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-2xl mb-2">🔥</div>
              <div className="text-sm text-gray-300">Streak Master</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm text-gray-300">Fast Solver</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm text-gray-300">Consistent</div>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Profile Link */}
      <div className="text-center">
        <a 
          href="https://leetcode.com/u/bhanutejamakkineni/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
        >
          View Full Profile on LeetCode
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default LeetCodeProfile;
