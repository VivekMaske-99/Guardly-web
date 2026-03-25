export default function RiskGauge({ score }) {

  const getColor = () => {
    if (score > 75) return "#ef4444";
    if (score > 50) return "#f59e0b";
    return "#22c55e";
  };

  return (
    <div style={card}>
      <h3>Risk Level</h3>

      <div style={circleContainer}>
        <div
          style={{
            ...circle,
            borderColor: getColor(),
          }}
        >
          {score}
        </div>
      </div>
    </div>
  );
}

const card = {
  background: "rgba(255,255,255,0.05)",
  padding: "20px",
  borderRadius: "15px",
};

const circleContainer = {
  display: "flex",
  justifyContent: "center",
  marginTop: "15px",
};

const circle = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  border: "8px solid",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "28px",
};