import { useState, useEffect } from 'react';
import { getApiEndpoint } from '../utils/apiConfig';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API endpoint: https://$CODESPACE_NAME-8000.app.github.dev/api/workouts
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(getApiEndpoint('/api/workouts'));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Handle both array and paginated responses
        const workoutsList = Array.isArray(data) ? data : (data.workouts || data.data || []);
        setWorkouts(workoutsList);
        setError(null);
      } catch (error) {
        setError(`Failed to fetch workouts: ${error.message}`);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="component-container">
      <h2>💪 Workouts</h2>
      
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading workouts...</div>}
      
      {!loading && workouts.length > 0 && (
        <div className="card-grid">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id} className="card">
              <h3>Workout</h3>
              <p><strong>Duration:</strong> {workout.duration} minutes</p>
              <p><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</p>
              {workout.userId && <p><strong>User ID:</strong> {workout.userId}</p>}
              {workout.activityId && <p><strong>Activity ID:</strong> {workout.activityId}</p>}
            </div>
          ))}
        </div>
      )}
      
      {!loading && workouts.length === 0 && !error && (
        <p className="no-data">No workouts found</p>
      )}
    </div>
  );
}