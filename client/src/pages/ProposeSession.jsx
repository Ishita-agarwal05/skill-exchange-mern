import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ProposeSession() {
  const { id } = useParams(); // other user ID
  const navigate = useNavigate();

  const [form, setForm] = useState({
    skillOffered: "",
    skillRequested: "",
    date: "",
    time: "",
    medium: "Google Meet"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://skill-exchange-backend-buf6.onrender.com/api/sessions/create",
        {
          otherUserId: id,
          ...form
        },
        {
          headers: { Authorization: token }
        }
      );

      alert("Session proposed successfully");
      navigate("/sessions");
    } catch (err) {
      alert("Failed to create session");
    }
  };

  return (
    // No changes to container - uses updated page-container class
    <div className="page-container">
      {/* Added: Wrapper for centering, like other pages */}
      <div className="propose-session-wrapper">
        <h2 className="page-title">Propose Skill Session</h2>

        {/* Changed: Enhanced card with max-width and sections for hierarchy */}
        <div className="card propose-session-card">
          <form onSubmit={handleSubmit}>
            {/* Skills Section */}
            <div className="form-section">
              <h3 className="form-section-title">Skills Exchange</h3>

              {/* Changed: Added form-label class for consistency */}
              <label className="form-label">Skill You Will Teach</label>
              <input
                className="input"
                name="skillOffered"
                value={form.skillOffered}
                onChange={handleChange}
                required
              />

              <label className="form-label">Skill You Want to Learn</label>
              <input
                className="input"
                name="skillRequested"
                value={form.skillRequested}
                onChange={handleChange}
                required
              />
            </div>

            {/* Scheduling Section */}
            <div className="form-section">
              <h3 className="form-section-title">Scheduling Details</h3>

              <label className="form-label">Date</label>
              <input
                className="input"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />

              <label className="form-label">Time</label>
              <input
                className="input"
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              />

              <label className="form-label">Medium</label>
              <select
                className="input propose-session-select" // Added class for select styling
                name="medium"
                value={form.medium}
                onChange={handleChange}
              >
                <option>Google Meet</option>
                <option>Zoom</option>
                <option>Offline</option>
              </select>
            </div>

            {/* Changed: Button uses primary-btn class, added propose-submit-btn for spacing */}
            <button className="primary-btn propose-submit-btn" type="submit">
              Propose Session
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProposeSession;