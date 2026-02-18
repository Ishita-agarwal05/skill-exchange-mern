import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    // Changed: Wrapped in a div with a CSS class for styling (replaces inline styles)
    // Added: Better structure for responsiveness (flex layout)
    <div className="navbar">
      {/* Changed: Logo with improved typography class for hierarchy */}
      <h3 className="navbar-logo" onClick={() => navigate("/dashboard")}>
        SkillExchange
      </h3>

      {/* Changed: Nav items in a container with flex for spacing and responsiveness */}
      <div className="navbar-links">
        {/* No changes to logic or onClick; just added classes for styling */}
        <button className="navbar-btn" onClick={() => navigate("/my-profile")}>
          My Profile
        </button>
        <button className="navbar-btn" onClick={() => navigate("/matches")}>
          Matches
        </button>
        <button className="navbar-btn" onClick={() => navigate("/connections")}>
          Connections
        </button>
        <button className="navbar-btn" onClick={() => navigate("/sessions")}>
          My Sessions
        </button>
        <button className="navbar-btn" onClick={() => navigate("/requests")}>
          Requests
        </button>
        {/* Changed: Added a class for the "coming soon" button to style it differently (e.g., muted) */}
        <button className="navbar-btn navbar-btn-coming-soon" onClick={() => navigate("/chat")}>
          Chat (Coming Soon)
        </button>
        <button className="navbar-btn navbar-btn-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;