export default function AlertsPanel({ alerts }) {
  return (
    <div style={card}>
      <h2 style={title}>Security Alerts</h2>

      {alerts.length === 0 ? (
        <p style={{ color: "#9ca3af" }}>No alerts detected</p>
      ) : (
        alerts.map((alert, index) => (
          <div key={index} style={alertBox}>
            ⚠ {alert.message}
          </div>
        ))
      )}
    </div>
  );
}

const card = {
  background: "rgba(20,33,61,0.6)",
  borderRadius: "16px",
  padding: "20px",
};

const title = { marginBottom: "15px" };

const alertBox = {
  background: "rgba(239,68,68,0.15)",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "10px",
  borderLeft: "4px solid #ef4444",
};