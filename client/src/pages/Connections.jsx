import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Connections() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConnections = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/connections/list",
          {
            headers: { Authorization: token }
          }
        );
        setConnections(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, [navigate]);

  if (loading) return <p className="loading-text">Loading connections...</p>; // Added class for styling

  return (
    // No changes to container - uses updated page-container class
    <div className="page-container">
      <h2 className="page-title">Your Connections</h2>

      {connections.length === 0 ? (
        // Changed: Enhanced empty state with class for styling
        <p className="connections-empty">You have no connections yet. Start matching to connect with others!</p>
      ) : (
        // Added: Wrapper for grid layout
        <div className="connections-grid">
          {connections.map(user => (
            // Changed: Enhanced card structure with sections for hierarchy
            <div key={user._id} className="card connection-card">
              {/* Header Section */}
              <div className="connection-header">
                <h3 className="connection-name">{user.name}</h3>
              </div>

              {/* Skills Section */}
              <div className="connection-skills">
                <p className="connection-skill-item">
                  <strong>Skills Have:</strong> {user.skillsHave}
                </p>
                <p className="connection-skill-item">
                  <strong>Skills Want:</strong> {user.skillsWant}
                </p>
              </div>

              {/* Actions Section */}
              <div className="connection-actions">
                {/* No changes to buttons - uses existing classes */}
                <button
                  className="primary-btn connection-btn"
                  onClick={() => navigate(`/profile/${user._id}`)}
                >
                  View Profile
                </button>
                <button
                  className="secondary-btn connection-btn"
                  onClick={() => navigate(`/propose-session/${user._id}`)}
                >
                  Propose Session
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Connections;
