import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    skillsHave: "",
    skillsWant: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Register clicked", form);

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      alert("Registration failed. Email may already exist.");
      console.error(error);
    }
  };

  return (
    // Added: page-container for consistent layout and spacing
    <div className="page-container">
      {/* Changed: Added a wrapper for centering, like the login page */}
      <div className="register-wrapper">
        <h2 className="page-title">Register</h2>

        {/* Added: Card wrapper for professional, contained form layout */}
        <div className="card register-card">
          <form onSubmit={handleSubmit}>
            {/* Added: Proper labels for better accessibility and hierarchy */}
            <label htmlFor="name" className="form-label">Name</label>
            <input
              className="input"
              id="name" // Added id for label association
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email" className="form-label">Email</label>
            <input
              className="input"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password" className="form-label">Password</label>
            <input
              className="input"
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <label htmlFor="skillsHave" className="form-label">Skills You Have</label>
            <input
              className="input"
              id="skillsHave"
              name="skillsHave"
              value={form.skillsHave}
              onChange={handleChange}
            />

            <label htmlFor="skillsWant" className="form-label">Skills You Want</label>
            <input
              className="input"
              id="skillsWant"
              name="skillsWant"
              onChange={handleChange}
            />

            {/* Changed: Applied primary-btn class for consistent styling */}
            <button type="submit" className="primary-btn register-submit-btn">
              Register
            </button>
          </form>

          {/* Changed: Styled as a button-like link for visual hierarchy, matching login page */}
          <p className="register-login-link" onClick={() => navigate("/")}>
            Already have an account? <span className="link-text">Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;