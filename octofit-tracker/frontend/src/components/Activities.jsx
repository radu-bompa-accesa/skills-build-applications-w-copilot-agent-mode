import { useState, useEffect } from 'react';
import { getApiEndpoint } from '../utils/apiConfig';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API endpoint: https://$CODESPACE_NAME-8000.app.github.dev/api/activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(getApiEndpoint('/api/activities'));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Handle both array and paginated responses
        const activitiesList = Array.isArray(data) ? data : (data.activities || data.data || []);
        setActivities(activitiesList);
        setError(null);
      } catch (error) {
        setError(`Failed to fetch activities: ${error.message}`);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="component-container">
      <h2>🏃 Activities</h2>
      
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading activities...</div>}
      
      {!loading && activities.length > 0 && (
        <div className="card-grid">
          {activities.map((activity) => (
            <div key={activity._id || activity.id} className="card">
              <h3>{activity.name}</h3>
              <p><strong>Type:</strong> {activity.type}</p>
              <p><strong>Calories:</strong> {activity.calories}</p>
            </div>
          ))}
        </div>
      )}
      
      {!loading && activities.length === 0 && !error && (
        <p className="no-data">No activities found</p>
      )}
    </div>
  );
}