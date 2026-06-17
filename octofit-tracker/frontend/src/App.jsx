import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>🏋️ OctoFit Tracker</h1>
          <ul className="nav-links">
            <li><Link to="/">Users</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/activities">Activities</Link></li>
            <li><Link to="/workouts">Workouts</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;