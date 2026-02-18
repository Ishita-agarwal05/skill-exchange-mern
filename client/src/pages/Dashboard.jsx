import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    // Added: page-container for consistent layout and spacing
    <div className="page-container">
      {/* Added: Wrapper for centering and structure */}
      <div className="dashboard-wrapper">
        <h2 className="page-title">Welcome to Your Dashboard</h2>

        {/* Added: Hero section for welcome message */}
        <div className="dashboard-hero">
          <p className="dashboard-welcome-text">
            You are logged in successfully. Ready to connect and exchange skills?
          </p>
        </div>

        {/* Added: Actions section with cards for quick navigation */}
        <div className="dashboard-actions">
          <div className="card dashboard-card">
            <h3 className="dashboard-card-title">Find Study Partners</h3>
            <p className="dashboard-card-text">
              Discover matches based on your skills and start learning together.
            </p>

            <button
              className="dashboard-btn"
              onClick={() => navigate("/matches")}
            >
              Find Study Partners
            </button>
          </div>

          {/* Added: Additional action cards for common tasks */}
          <div className="card dashboard-card">
            <h3 className="dashboard-card-title">View Connections</h3>
            <p className="dashboard-card-text">
              See your connected users and manage your network.
            </p>
            <button
              className="dashboard-btn"
              onClick={() => navigate("/connections")}
            >
              View Connections
            </button>
          </div>

          <div className="card dashboard-card">
            <h3 className="dashboard-card-title">My Sessions</h3>
            <p className="dashboard-card-text">
              Check your upcoming skill exchange sessions.
            </p>
            <button
              className="dashboard-btn"
              onClick={() => navigate("/sessions")}
            >
              My Sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;