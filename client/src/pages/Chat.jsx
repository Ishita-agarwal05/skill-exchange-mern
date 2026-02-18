function Chat() {
  return (
    // No changes to container - uses updated page-container class
    <div className="page-container">
      {/* Added: Wrapper for centering, like other pages */}
      <div className="chat-wrapper">
        <h2 className="page-title">Chat</h2>

        {/* Changed: Enhanced card with sections for hierarchy and teaser feel */}
        <div className="card chat-card">
          {/* Header Section */}
          <div className="chat-header">
            <h3 className="chat-title">💬 Chat Feature</h3>
            <p className="chat-subtitle">
              Real-time chat between connected users is <strong>coming soon</strong>.
            </p>
          </div>

          {/* Description Section */}
          <div className="chat-description">
            <p className="chat-text">
              Currently, you can connect, share contact details, and schedule skill exchange sessions.
            </p>
            <p className="chat-text chat-teaser">
              Stay tuned for seamless messaging to enhance your learning partnerships!
            </p>
          </div>

          {/* Footer Section */}
          <div className="chat-footer">
            <p className="chat-status">🚧 Under development</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;