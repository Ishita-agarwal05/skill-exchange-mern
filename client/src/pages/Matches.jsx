import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Removed: import "./Matches.css"; - Moving styles to index.css

function Matches() {
  const [matches, setMatches] = useState([]);
  const [sendingId, setSendingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 🔹 SEND CONNECTION REQUEST
  const sendRequest = async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setSendingId(userId);

    try {
      await axios.post(
        `https://skill-exchange-backend-buf6.onrender.com/api/connections/send/${userId}`,
        {},
        {
          headers: { Authorization: token }
        }
      );

      // ✅ UPDATE UI STATE → Pending
      setMatches((prev) =>
        prev.map((item) =>
          item.user._id === userId
            ? { ...item, status: "pending" }
            : item
        )
      );
    } catch (err) {
      alert("Request already sent or error occurred");
    } finally {
      setSendingId(null);
    }
  };

  // 🔹 FETCH MATCHES
  useEffect(() => {
    const fetchMatches = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await axios.get(
          "https://skill-exchange-backend-buf6.onrender.com/api/match",
          {
            headers: { Authorization: token }
          }
        );
        setMatches(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [navigate]);

  const filteredMatches = matches.filter((item) =>
    item.user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="loading-text">Loading matches...</p>; // Added class for styling
  }

  return (
    // Changed: Use page-container for consistency
    <div className="page-container">
      <h2 className="page-title">Your Study Partner Matches</h2>

      {/* Changed: Search bar with global input class and wrapper for styling */}
      <div className="matches-search-wrapper">
        <input
          type="text"
          placeholder="Search by name..."
          className="input matches-search-input" // Uses global input class
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredMatches.length === 0 ? (
        // Changed: Enhanced empty state with class
        <p className="matches-empty">No matches found. Try adjusting your search!</p>
      ) : (
        // Added: Grid wrapper for layout
        <div className="matches-grid">
          {filteredMatches.map((item, index) => {
            const haveSkills = item.user.skillsHave?.split(",") || [];
            const wantSkills = item.user.skillsWant?.split(",") || [];

            return (
              // Changed: Use global card class with custom match-card class
              <div key={index} className="card match-card">
                {/* Header Section */}
                <div className="match-header">
                  <h3 className="match-name">{item.user.name}</h3>
                  <div className="match-score">Match Score: {item.score}</div>
                </div>

                {/* Skills Sections */}
                <div className="skills-section">
                  <strong>Skills Have:</strong>
                  <div className="skills-chips">
                    {haveSkills.map((skill, i) => (
                      <span key={i} className="skill-chip">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="skills-section">
                  <strong>Skills Want:</strong>
                  <div className="skills-chips">
                    {wantSkills.map((skill, i) => (
                      <span key={i} className="skill-chip">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Section */}
                <div className="match-actions">
                  {/* No changes to buttons - uses global classes */}
                  <button
                    className="secondary-btn match-btn"
                    onClick={() => navigate(`/profile/${item.user._id}`)}
                  >
                    View Profile
                  </button>

                  <button
                    className={`primary-btn match-btn match-connect-btn ${
                      item.status === "connected" ? "connected" :
                      item.status === "pending" ? "pending" : ""
                    }`}
                    disabled={
                      item.status === "pending" ||
                      item.status === "connected" ||
                      sendingId === item.user._id
                    }
                    onClick={() => sendRequest(item.user._id)}
                  >
                    {item.status === "connected"
                      ? "Connected"
                      : item.status === "pending"
                      ? "Pending"
                      : sendingId === item.user._id
                      ? "Sending..."
                      : "Connect"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Matches;