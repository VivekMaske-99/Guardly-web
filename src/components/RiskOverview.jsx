export default function RiskOverview({ data }) {
  return (
    <div style={grid}>

      <div style={card}>
        <p>Risk Score</p>
        <h2 style={{ color: "#f97316" }}>{data.riskScore}</h2>
      </div>

      <div style={card}>
        <p>Security Health</p>
        <h2 style={{ color: "#4ade80" }}>{data.securityHealth}%</h2>
      </div>

      <div style={card}>
        <p>Active Threats</p>
        <h2 style={{ color: "#f87171" }}>{data.recentEvents?.length}</h2>
      </div>

      <div style={card}>
        <p>Alerts</p>
        <h2 style={{ color: "#facc15" }}>{data.alerts?.length}</h2>
      </div>

    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
};

const card = {
  background: "rgba(20,33,61,0.6)",
  padding: "20px",
  borderRadius: "15px",
};