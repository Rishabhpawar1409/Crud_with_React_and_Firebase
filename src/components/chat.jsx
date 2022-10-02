import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";

function Chat() {
  const [input, setInput] = useState("");
  const [channelId, setChannelId] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSend = () => {
    setInput("");
  };
  return (
    <div className="App">
      <Link to="/home">
        <button>Go back</button>
      </Link>

      <input
        type="text"
        value={input}
        placeholder="write your message here"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button
        onClick={() => {
          handleSend();
        }}
      >
        send
      </button>
    </div>
  );
}
export default Chat;
