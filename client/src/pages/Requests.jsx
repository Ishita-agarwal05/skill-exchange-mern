import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/connections/requests",
          {
            headers: { Authorization: token }
          }
        );
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [navigate]);

  const handleAccept = async (id) => {
    const token = localStorage.getItem("token");

    await axios.post(
      `http://localhost:5000/api/connections/accept/${id}`,
      {},
      { headers: { Authorization: token } }
    );

    setRequests(prev => prev.filter(user => user._id !== id));
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem("token");

    await axios.post(
      `http://localhost:5000/api/connections/reject/${id}`,
      {},
      { headers: { Authorization: token } }
    );

    setRequests(prev => prev.filter(user => user._id !== id));
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading requests...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto" }}>
      <h2>Connection Requests</h2>

      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        requests.map(user => (
          <div
            key={user._id}
            style={{
              border: "1px solid #374151",
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "14px"
            }}
          >
            <div key={user._id} className="card">
  <h3>{user.name}</h3>

  <p><strong>Skills Have:</strong> {user.skillsHave}</p>
  <p><strong>Skills Want:</strong> {user.skillsWant}</p>

  <button
    className="primary-btn"
    onClick={() => handleAccept(user._id)}
    style={{ marginRight: "10px" }}
  >
    Accept
  </button>

  <button
    className="secondary-btn"
    onClick={() => handleReject(user._id)}
  >
    Reject
  </button>
</div>

          </div>
        ))
      )}
    </div>
  );
}

export default Requests;
