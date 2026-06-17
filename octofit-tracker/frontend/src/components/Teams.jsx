import { useState, useEffect } from 'react';
import { getApiEndpoint } from '../utils/apiConfig';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(getApiEndpoint('/api/teams'));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Handle both array and paginated responses
        const teamsList = Array.isArray(data) ? data : (data.teams || data.data || []);
        setTeams(teamsList);
        setError(null);
      } catch (error) {
        setError(`Failed to fetch teams: ${error.message}`);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="component-container">
      <h2>🤝 Teams</h2>
      
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading teams...</div>}
      
      {!loading && teams.length > 0 && (
        <div className="card-grid">
          {teams.map((team) => (
            <div key={team._id || team.id} className="card">
              <h3>{team.name}</h3>
              <p><strong>Description:</strong> {team.description}</p>
              <p><strong>Members:</strong> {Array.isArray(team.members) ? team.members.length : 0}</p>
            </div>
          ))}
        </div>
      )}
      
      {!loading && teams.length === 0 && !error && (
        <p className="no-data">No teams found</p>
      )}
    </div>
  );
}