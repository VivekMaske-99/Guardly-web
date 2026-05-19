import { useState } from "react";
import History from "../components/History";
import Chat from "../components/Chat";
import RiskPanel from "../components/RiskPanel";

export default function Chatbot() {
  const [session, setSession] = useState(null);
  const [refresh, setRefresh] = useState(0);

  return (
    <div
      style={{
        display: "flex",

        // ✅ Adjust for sticky navbar (no overlap)
        height: "calc(100vh - 75px)",

        background: "#020617",
        color: "white",
        fontFamily: "Inter, system-ui",

        // ✅ Prevent outer scroll, allow inner scroll
        overflow: "hidden",

        // ✅ Fix flex layout issues
        width: "100%"
      }}
    >
      {/* LEFT - HISTORY */}
      <div style={{ flexShrink: 0 }}>
        <History
          onSelect={setSession}
          onNew={() => setSession(null)}
        />
      </div>

      {/* CENTER - CHAT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0 // 🔥 VERY IMPORTANT (prevents overflow bugs)
        }}
      >
        <Chat
          session={session}
          onNewSession={(id) => setSession(id)}
          onScan={() => setRefresh(r => r + 1)}
        />
      </div>

      {/* RIGHT - RISK PANEL */}
      <div style={{ flexShrink: 0 }}>
        <RiskPanel
          session={session}
          refresh={refresh}
        />
      </div>
    </div>
  );
}