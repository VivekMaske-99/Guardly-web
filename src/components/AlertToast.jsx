export default function AlertToast({ message }) {
  return (
    <div style={toast}>
      ⚠ {message}
    </div>
  );
}

const toast = {
  position: "fixed",
  top: "20px",
  right: "20px",
  background: "#ef4444",
  color: "white",
  padding: "12px 20px",
  borderRadius: "10px",
  zIndex: 9999,
};