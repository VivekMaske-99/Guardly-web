import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Chat({ session, onNewSession, onScan }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [showFollowups, setShowFollowups] = useState(false);

  const chatRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?._id;
  const token = localStorage.getItem("token");

  // ✅ SMART SCROLL
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;

    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 100;

    if (isNearBottom) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  // ✅ LOAD OLD CHAT
  useEffect(() => {
    if (!session) {
      setMessages([]);
      setHasStarted(false);
      setShowFollowups(false);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/chat/session/${session}`)
      .then(res => {
        const formatted = [];

        res.data.forEach(item => {
          formatted.push({
            role: "user",
            message: item.message
          });

          formatted.push({
            role: "ai",
            ...item.aiResult
          });
        });

        setMessages(formatted);
        setHasStarted(true);
        setShowFollowups(false);
      })
      .catch(err => console.error(err));
  }, [session]);

  // ✅ SEND MESSAGE
  const sendMessage = async (msgText) => {
    const messageToSend = msgText || text;
    if (!messageToSend.trim()) return;

    setText("");
    setHasStarted(true);

    let s = session;

    if (!s) {
      s = Date.now().toString();
      onNewSession(s);
    }

    const newMsg = {
      role: "user",
      message: messageToSend
    };

    setMessages(prev => [...prev, newMsg]);

    try {
      console.log("🔥 Sending:", { userId, sessionId: s, message: messageToSend });

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat`,
        {
          userId,
          sessionId: s,
          message: messageToSend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const aiMsg = {
        role: "ai",
        ...res.data
      };

      setMessages(prev => {
        const updated = [...prev, aiMsg];

        // 🔥 SHOW FOLLOWUPS ONLY AFTER FIRST RESPONSE
        if (updated.length <= 2) {
          setShowFollowups(true);
        } else {
          setShowFollowups(false);
        }

        return updated;
      });

      onScan();

    } catch (err) {
      console.error(err);

      setMessages(prev => [
        ...prev,
        { role: "ai", ai: "⚠ Server not reachable" }
      ]);
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}>

      {/* CHAT AREA */}
      <div
        ref={chatRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 40px"
        }}
      >
        {/* WELCOME */}
        {!hasStarted && messages.length === 0 ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.8
            }}
          >
            <h1 style={{ fontSize: 32, marginBottom: 20 }}>
              What can I help with?
            </h1>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                "Someone sent fake UPI link",
                "I got suspicious WhatsApp message",
                "Is this crypto offer safe?",
                "How to identify phishing?"
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 20,
                    border: "1px solid #1e293b",
                    background: "transparent",
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: 20 }}>

              {/* USER */}
              {msg.role === "user" && (
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      display: "inline-block",
                      background: "#2563eb",
                      padding: 12,
                      borderRadius: 12,
                      maxWidth: "60%"
                    }}
                  >
                    <b>You</b>
                    <div>{msg.message}</div>
                  </div>
                </div>
              )}

              {/* AI */}
              {msg.role === "ai" && (
                <div>
                  <div
                    style={{
                      background: "#020617",
                      border: "1px solid #1e293b",
                      padding: 12,
                      borderRadius: 12,
                      maxWidth: "70%"
                    }}
                  >
                    <b>GuardLY</b>
                    <div>{msg.ai}</div>

                {/* 🔥 ONLY FIRST AI RESPONSE */}
{msg.role === "ai" &&
 messages.findIndex(m => m.role === "ai") === i && (
  <>
    {msg.impact && (
      <div style={{ marginTop: 10 }}>
        <b style={{ color: "#ef4444" }}>Impact:</b> {msg.impact}
      </div>
    )}

    {msg.action && (
      <div>
        <b style={{ color: "#22c55e" }}>Action:</b> {msg.action}
      </div>
    )}
  </>
)}

                    {/* 🔥 FOLLOW-UP QUESTIONS */}
                    {showFollowups && i === messages.length - 1 && (
                      <div style={{ marginTop: 15 }}>
                        <div style={{ opacity: 0.7, marginBottom: 8 }}>
                          Suggested follow-ups
                        </div>

                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                          {[
                            "What should I do next?",
                            "How to stay safe?",
                            "Can you explain more?",
                            "How to report this?"
                          ].map((q, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setShowFollowups(false);
                                sendMessage(q);
                              }}
                              style={{
                                padding: "8px 14px",
                                borderRadius: 20,
                                border: "1px solid #1e293b",
                                background: "transparent",
                                color: "white",
                                cursor: "pointer",
                                fontSize: 13
                              }}
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* INPUT */}
      <div
        style={{
          padding: 15,
          borderTop: "1px solid #1e293b",
          display: "flex",
          gap: 10
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask GuardLY..."
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 20,
            border: "1px solid #1e293b",
            background: "transparent",
            color: "white"
          }}
        />

        <button
          onClick={() => sendMessage()}
          style={{
            padding: "10px 16px",
            borderRadius: "50%",
            background: "#2563eb",
            border: "none",
            color: "white",
            cursor: "pointer"
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}