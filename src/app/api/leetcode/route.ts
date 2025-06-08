import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // First try to get the CSRF token
    const csrfResponse = await fetch('https://leetcode.com', {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      }
    });

    let csrfToken = '';
    const cookies = csrfResponse.headers.get('set-cookie');
    if (cookies) {
      const csrfMatch = cookies.match(/csrftoken=([^;]+)/);
      if (csrfMatch) {
        csrfToken = csrfMatch[1];
      }
    }

    // Now make the actual GraphQL request
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': 'https://leetcode.com',
        'Referer': `https://leetcode.com/u/bhanutejamakkineni/`,
        'Cookie': `csrftoken=${csrfToken}`,
        'x-csrftoken': csrfToken
      },
      body: JSON.stringify(body),
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LeetCode API error:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: errorText
      });
      throw new Error(`Failed to fetch LeetCode data: ${response.status}`);
    }

    const data = await response.json();

    // If we don't get the expected data structure, try the alternative API
    if (!data.data?.matchedUser) {
      // Try the alternative public API endpoint
      const publicResponse = await fetch('https://leetcode-stats-api.herokuapp.com/bhanutejamakkineni', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        }
      });

      if (!publicResponse.ok) {
        throw new Error('Failed to fetch from both APIs');
      }

      const publicData = await publicResponse.json();
      
      // Transform the public API data to match our expected format
      return NextResponse.json({
        data: {
          matchedUser: {
            profile: {
              realName: 'Bhanu Teja',
              countryName: 'India',
              school: 'Malla Reddy College of Engineering & Technology',
              ranking: publicData.ranking
            },
            submitStats: {
              acSubmissionNum: [
                { difficulty: 'All', count: publicData.totalSolved, submissions: publicData.totalSubmissions },
                { difficulty: 'Easy', count: publicData.easySolved },
                { difficulty: 'Medium', count: publicData.mediumSolved },
                { difficulty: 'Hard', count: publicData.hardSolved }
              ]
            },
            activeDays: 0, // Not available in public API
            streak: 0, // Not available in public API
            languageProblemCount: [], // Not available in public API
          },
          allQuestionsCount: [
            { difficulty: 'All', count: publicData.totalQuestions },
            { difficulty: 'Easy', count: publicData.totalEasy },
            { difficulty: 'Medium', count: publicData.totalMedium },
            { difficulty: 'Hard', count: publicData.totalHard }
          ]
        }
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch LeetCode data' },
      { status: 500 }
    );
  }
} 