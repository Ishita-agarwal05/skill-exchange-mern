import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("https://skill-exchange-backend-buf6.onrender.com/api/users/me", {
        headers: { Authorization: token }
      })
      .then(res => setUser(res.data))
      .catch(err => {
        console.error(err);
        alert("Failed to load profile");
      });
  }, [navigate]);

  if (!user) return <p className="loading-text">Loading profile...</p>;

  const haveSkills = user.skillsHave?.split(",") || [];
  const wantSkills = user.skillsWant?.split(",") || [];

  return (
    <div className="page-container">
      <h2 className="page-title">My Profile</h2>

      <div className="card profile-card">
        {/* NAME */}
        <h3 className="profile-name">{user.name}</h3>

        {/* BIO */}
        <div className="profile-section">
          <div className="profile-section-title">Bio</div>
          <p className="profile-text">
            {user.bio || "No bio added yet."}
          </p>
        </div>

        {/* SKILLS HAVE */}
        <div className="profile-section">
          <div className="profile-section-title">Skills You Have</div>
          <div className="skills-chips">
            {haveSkills.map((skill, i) => (
              <span key={i} className="skill-chip">
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* SKILLS WANT */}
        <div className="profile-section">
          <div className="profile-section-title">Skills You Want</div>
          <div className="skills-chips">
            {wantSkills.map((skill, i) => (
              <span key={i} className="skill-chip">
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* ACTION */}
        <button
          className="dashboard-btn profile-edit-btn"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
