import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    bio: "",
    skillsHave: "",
    skillsWant: "",
    linkedin: "",
    contact: ""
  });

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      const res = await axios.get(
        "https://skill-exchange-backend-buf6.onrender.com/api/users/me",
        {
          headers: { Authorization: token }
        }
      );

      setForm({
        bio: res.data.bio || "",
        skillsHave: res.data.skillsHave || "",
        skillsWant: res.data.skillsWant || "",
        linkedin: res.data.linkedin || "",
        contact: res.data.contact || ""
      });
    };

    loadProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await axios.put(
      "https://skill-exchange-backend-buf6.onrender.com/api/users/me",
      form,
      {
        headers: { Authorization: token }
      }
    );

    navigate("/dashboard");
  };

  return (
    // No changes to container - uses updated page-container class
    <div className="page-container">
      {/* Added: Wrapper for centering, like other pages */}
      <div className="edit-profile-wrapper">
        <h2 className="page-title">Edit Profile</h2>

        {/* Changed: Enhanced card with max-width and sections for hierarchy */}
        <div className="card edit-profile-card">
          <form onSubmit={handleSubmit}>
            {/* Personal Info Section */}
            <div className="form-section">
              <h3 className="form-section-title">Personal Information</h3>

              {/* Changed: Added form-label class for consistency */}
              <label className="form-label">Bio</label>
              <textarea
                className="input edit-textarea" // Added class for textarea styling
                rows="4"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Write something about yourself..."
              />
            </div>

            {/* Skills Section */}
            <div className="form-section">
              <h3 className="form-section-title">Skills</h3>

              <label className="form-label">Skills You Have</label>
              <input
                className="input"
                type="text"
                name="skillsHave"
                value={form.skillsHave}
                onChange={handleChange}
                placeholder="e.g. MERN, Python, AI"
              />

              <label className="form-label">Skills You Want</label>
              <input
                className="input"
                type="text"
                name="skillsWant"
                value={form.skillsWant}
                onChange={handleChange}
                placeholder="e.g. Communication, System Design"
              />
            </div>

            {/* Contact Section */}
            <div className="form-section">
              <h3 className="form-section-title">Contact Information</h3>

              <label className="form-label">LinkedIn Profile</label>
              <input
                className="input"
                type="text"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
              />

              <label className="form-label">Contact (WhatsApp / Discord / Email)</label>
              <input
                className="input"
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="WhatsApp number or Discord ID"
              />
            </div>

            {/* Changed: Button uses primary-btn class, added edit-submit-btn for spacing */}
            <button type="submit" className="primary-btn edit-submit-btn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;