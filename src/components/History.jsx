import { useEffect, useState } from "react";
import axios from "axios";

const STOP_WORDS = [
  "i","me","my","you","your","we","they","is","are","was","were","to","the",
  "a","an","and","or","but","if","then","this","that","these","those",
  "what","how","why","can","could","should","would","do","did","does",
  "tell","explain","please","help","about"
];

function makeTitle(text) {
  if (!text) return "New Chat";

  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(" ")
    .filter(w => w.length > 2 && !STOP_WORDS.includes(w));

  if (words.length === 0) {
    return text.length > 25 ? text.slice(0, 25) + "…" : text;
  }

  return words
    .slice(0, 4)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function History({ onSelect, onNew }) {
  const [sessions, setSessions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?._id;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/user/sessions/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => setSessions(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <div
      style={{
        width: 240,
        height: "100%",
        background: "#020617",
        borderRight: "1px solid #1e293b",
        padding: 12,
        overflowY: "auto",
        overflowX: "hidden"
      }}
    >
      <button
        onClick={onNew}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 12,
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 8,
          fontWeight: 600
        }}
      >
        + New Chat
      </button>

      {sessions.map(s => (
        <div
          key={s._id}
          onClick={() => onSelect(s._id)}
          style={{
            padding: "10px 12px",
            marginBottom: 10,
            border: "1px solid #1e293b",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 14,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {makeTitle(s.last)}
        </div>
      ))}
    </div>
  );
}