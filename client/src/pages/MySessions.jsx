import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MySessions() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("http://localhost:5000/api/sessions/my", {
        headers: { Authorization: token }
      })
      .then(res => setSessions(res.data));
  }, [navigate]);

  const acceptSession = async (id) => {
    const token = localStorage.getItem("token");

    await axios.post(
      `http://localhost:5000/api/sessions/accept/${id}`,
      {},
      {
        headers: { Authorization: token }
      }
    );

    setSessions(prev =>
      prev.map(s =>
        s._id === id ? { ...s, status: "accepted" } : s
      )
    );
  };

  return (
    // No changes to container - uses updated page-container class
    <div className="page-container">
      <h2 className="page-title">My Skill Sessions</h2>

      {sessions.length === 0 ? (
        // Changed: Enhanced empty state with class for styling
        <p className="sessions-empty">No sessions yet. Propose or accept sessions to get started!</p>
      ) : (
        // Added: Grid wrapper for layout
        <div className="sessions-grid">
          {sessions.map(session => (
            // Changed: Enhanced card structure with sections for hierarchy
            <div key={session._id} className="card session-card">
              {/* Participants Section */}
              <div className="session-section">
                <h3 className="session-section-title">Participants</h3>
                <p className="session-detail">
                  <strong>Teacher:</strong> {session.teacher.name}
                </p>
                <p className="session-detail">
                  <strong>Learner:</strong> {session.learner.name}
                </p>
              </div>

              {/* Skills Section */}
              <div className="session-section">
                <h3 className="session-section-title">Skills Exchange</h3>
                <p className="session-detail">
                  <strong>Teaching:</strong> {session.skillOffered}
                </p>
                <p className="session-detail">
                  <strong>Learning:</strong> {session.skillRequested}
                </p>
              </div>

              {/* Details Section */}
              <div className="session-section">
                <h3 className="session-section-title">Session Details</h3>
                <p className="session-detail">
                  <strong>Date & Time:</strong> {session.date} at {session.time}
                </p>
                <p className="session-detail">
                  <strong>Medium:</strong> {session.medium}
                </p>
              </div>

              {/* Status and Actions Section */}
              <div className="session-status-actions">
                <p className={`session-status ${session.status.toLowerCase()}`}>
                  <strong>Status:</strong> {session.status}
                </p>

                {/* No changes to button logic - uses global primary-btn class */}
                {session.status === "pending" &&
                  session.learner._id ===
                    JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id && (
                  <button
                    className="primary-btn session-accept-btn"
                    onClick={() => acceptSession(session._id)}
                  >
                    Accept Session
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MySessions;