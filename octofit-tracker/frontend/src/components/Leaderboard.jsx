import { useState, useEffect } from 'react';
import { getApiEndpoint } from '../utils/apiConfig';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API endpoint: https://$CODESPACE_NAME-8000.app.github.dev/api/leaderboard
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(getApiEndpoint('/api/leaderboard'));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Handle both array and paginated responses
        const leaderboard = Array.isArray(data) ? data : (data.leaderboard || data.data || []);
        setLeaderboardData(leaderboard);
        setError(null);
      } catch (error) {
        setError(`Failed to fetch leaderboard: ${error.message}`);
        setLeaderboardData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="component-container">
      <h2>🏆 Leaderboard</h2>
      
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading leaderboard...</div>}
      
      {!loading && leaderboardData.length > 0 && (
        <div className="leaderboard-table">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <tr key={entry._id || entry.id || index}>
                  <td className="rank">#{index + 1}</td>
                  <td>{entry.name || entry.userName || 'N/A'}</td>
                  <td className="points">{entry.points || 0}</td>
                  <td>{entry.team || entry.teamName || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {!loading && leaderboardData.length === 0 && !error && (
        <p className="no-data">No leaderboard data found</p>
      )}
    </div>
  );
}