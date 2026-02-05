import React, { Component } from "react";

class ClassWelcome extends Component {
  render() {
    return (
      <div style={{ padding: "10px", background: "#e3f2fd", borderRadius: "8px" }}>
        <h3>👋 Welcome, Student!</h3>
        <p>This message is rendered using a Class Component.</p>
      </div>
    );
  }
}

export default ClassWelcome;
