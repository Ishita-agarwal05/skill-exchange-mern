import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://skill-exchange-backend-buf6.onrender.com/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    // No changes to container - uses updated page-container class
    <div className="page-container">
      {/* Changed: Added a wrapper for centering the card on the page */}
      <div className="login-wrapper">
        <h2 className="page-title">Login</h2>

        {/* Changed: Card now has a class for additional styling (e.g., centering, max-width) */}
        <div className="card login-card">
          <form onSubmit={handleSubmit}>
            {/* Added: Proper labels for better accessibility and hierarchy (replaces placeholders for a more professional feel) */}
            <label htmlFor="email" className="form-label">Email</label>
            <input
              className="input"
              type="email"
              id="email" // Added id for label association
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password" className="form-label">Password</label>
            <input
              className="input"
              type="password"
              id="password" // Added id for label association
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            {/* No changes to button - uses updated primary-btn class */}
            <button type="submit" className="primary-btn login-submit-btn">
              Login
            </button>
          </form>

          {/* Changed: Styled as a button-like link for better visual hierarchy and consistency */}
          <p className="login-register-link" onClick={() => navigate("/register")}>
            Don't have an account? <span className="link-text">Create one</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;