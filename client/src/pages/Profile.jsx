import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      const res = await axios.get(
        `https://skill-exchange-backend-buf6.onrender.com/api/users/${id}`,
        { headers: { Authorization: token } }
      );
      setUser(res.data);
    };

    const fetchCurrentUser = async () => {
      const res = await axios.get(
        "https://skill-exchange-backend-buf6.onrender.com/api/users/me",
        { headers: { Authorization: token } }
      );
      setCurrentUserId(res.data._id);
    };

    fetchProfile();
    fetchCurrentUser();
  }, [id, navigate]);

  if (!user) return <p className="loading-text">Loading profile...</p>;

  const haveSkills = user.skillsHave?.split(",") || [];
  const wantSkills = user.skillsWant?.split(",") || [];

  return (
    <div className="page-container">
      {/* NAME */}
      <h2 className="profile-name">{user.name}</h2>

      <div className="card profile-card">
        {/* BIO */}
        <div className="profile-section">
          <div className="profile-section-title">Bio</div>
          <p className="profile-text">
            {user.bio || "No bio added yet."}
          </p>
        </div>

        {/* SKILLS HAVE AND WANT */}
        <div className="profile-section">
  <div className="profile-section-title">
    {currentUserId === user._id
      ? "Skills You Have"
      : `Skills ${user.name} Has`}
  </div>

  <div className="skills-chips">
    {haveSkills.map((skill, i) => (
      <span key={i} className="skill-chip">
        {skill.trim()}
      </span>
    ))}
  </div>
</div>

<div className="profile-section">
  <div className="profile-section-title">
    {currentUserId === user._id
      ? "Skills You Want"
      : `Skills ${user.name} Wants`}
  </div>

  <div className="skills-chips">
    {wantSkills.map((skill, i) => (
      <span key={i} className="skill-chip">
        {skill.trim()}
      </span>
    ))}
  </div>
</div>


        {/* CONTACT — ONLY IF CONNECTED */}
        {user.isConnected && (
          <>
            <div className="profile-divider"></div>

            <div className="profile-section">
              <div className="profile-section-title">Contact Details</div>

              {user.linkedin && (
                <p className="profile-contact">
                  <strong>LinkedIn:</strong>{" "}
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="profile-link"
                  >
                    View Profile
                  </a>
                </p>
              )}

              {user.contact && (
                <p className="profile-contact">
                  <strong>Contact:</strong> {user.contact}
                </p>
              )}

              <button className="secondary-btn profile-btn">
                Chat (Coming Soon)
              </button>
            </div>
          </>
        )}

        {/* EDIT PROFILE — ONLY SELF */}
        {currentUserId === user._id && (
          <button
            className="primary-btn profile-edit-btn"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
        )}
      </div>

      <button
        className="secondary-btn profile-back-btn"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
}

export default Profile;
