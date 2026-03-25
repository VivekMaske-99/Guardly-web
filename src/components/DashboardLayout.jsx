import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={mainContent}>
        {children}
      </div>
    </div>
  );
}

const mainContent = {
  marginLeft: "230px",
  width: "100%",
  minHeight: "100vh",
};