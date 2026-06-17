import { useState, useEffect } from 'react';
import { getApiEndpoint } from '../utils/apiConfig';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(getApiEndpoint('/api/users'));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Handle both array and paginated responses
        const usersList = Array.isArray(data) ? data : (data.users || data.data || []);
        setUsers(usersList);
        setError(null);
      } catch (error) {
        setError(`Failed to fetch users: ${error.message}`);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="component-container">
      <h2>👥 Users</h2>
      
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading users...</div>}
      
      {!loading && users.length > 0 && (
        <div className="card-grid">
          {users.map((user) => (
            <div key={user._id || user.id} className="card">
              <h3>{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Points:</strong> {user.points || 0}</p>
            </div>
          ))}
        </div>
      )}
      
      {!loading && users.length === 0 && !error && (
        <p className="no-data">No users found</p>
      )}
    </div>
  );
}