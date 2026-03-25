export default function WeeklySecurityReport({ userId }) {

  const downloadPDF = () => {
    window.open(`http://localhost:5000/api/report/pdf/${userId}`);
  };

  const downloadDOC = () => {
    window.open(`http://localhost:5000/api/report/doc/${userId}`);
  };

  return (
    <div style={card}>

      <div style={header}>
        <h2>Weekly Security Reports</h2>

        <div>
          <button style={btnRed} onClick={downloadPDF}>
            PDF
          </button>

          <button style={btnBlue} onClick={downloadDOC}>
            DOC
          </button>
        </div>
      </div>

      <p style={text}>
        This report includes risk summary, threat logs,
        alerts, and AI recommendations for the past week.
      </p>

    </div>
  );
}

/* STYLES */

const card = {
  background: "rgba(20,33,61,0.6)",
  borderRadius: "16px",
  padding: "20px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const btnRed = {
  marginRight: "10px",
  padding: "8px 14px",
  background: "#ef4444",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
};

const btnBlue = {
  padding: "8px 14px",
  background: "#3b82f6",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
};

const text = {
  marginTop: "10px",
  color: "#9ca3af",
};