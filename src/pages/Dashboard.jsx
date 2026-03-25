import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import Sidebar from "../components/Sidebar";
import RiskOverview from "../components/RiskOverview";
import ThreatDistribution from "../components/ThreatDistribution";
import TrendChart from "../components/TrendChart";
import AlertsPanel from "../components/AlertsPanel";
import AIInsights from "../components/AIInsights";
import VulnerabilityPanel from "../components/VulnerabilityPanel";
import WeeklySecurityReport from "../components/WeeklySecurityReport";
import RiskGauge from "../components/RiskGauge";
import AlertToast from "../components/AlertToast";

import {
  getOverview,
  getCategory,
  getTrend,
  getAlerts,
  getInsight
} from "../api/dashboardApi";

export default function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const [overview, setOverview] = useState(null);
  const [category, setCategory] = useState([]);
  const [trend, setTrend] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [insight, setInsight] = useState("");
  const [toast, setToast] = useState(null);

  const loadDashboard = async () => {
    try {
      if (!userId) return;

      const [
        overviewRes,
        categoryRes,
        trendRes,
        alertsRes,
        insightRes
      ] = await Promise.all([
        getOverview(userId),
        getCategory(userId),
        getTrend(userId),
        getAlerts(userId),
        getInsight(userId)
      ]);

      setOverview(overviewRes.data);
      setCategory(categoryRes.data);
      setTrend(trendRes.data);
      setAlerts(alertsRes.data);
      setInsight(insightRes.data.insight);

    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  useEffect(() => {
    loadDashboard();

    const socket = io("http://localhost:5000");

    socket.on("threatDetected", (data) => {
      if (data.userId === userId) {
        setToast(data.message || "⚠ Threat detected!");
        setTimeout(() => setToast(null), 3000);
        loadDashboard();
      }
    });

    return () => socket.disconnect();
  }, []);

  if (!overview) {
    return (
      <div style={loading}>
        Loading GuardLY Dashboard...
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div style={mainContent}>

        {/* TOAST */}
        {toast && <AlertToast message={toast} />}

        <div style={innerContainer}>

          {/* HEADER */}
          <div style={header}>
            <h1 style={title}>Security Dashboard</h1>
            <p style={subtitle}>
              Monitor your cybersecurity risk, alerts and AI insights
            </p>
          </div>

          {/* OVERVIEW + RISK GAUGE */}
          <div style={topGrid}>
            <RiskOverview data={overview} />
            <RiskGauge score={overview.riskScore} />
          </div>

          {/* GRID 1 */}
          <div style={grid}>
            <TrendChart data={trend} />
            <ThreatDistribution data={category} />
          </div>

          {/* GRID 2 */}
          <div style={grid}>
            <VulnerabilityPanel />
            <AIInsights insight={insight} />
          </div>

          {/* ALERTS */}
          <div style={section}>
            <AlertsPanel alerts={alerts} />
          </div>

          {/* REPORT */}
          <div style={section}>
            <WeeklySecurityReport userId={userId} />
          </div>

        </div>

      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const mainContent = {
  marginLeft: "230px",
  width: "100%",
  padding: "20px",
};

const innerContainer = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const header = {
  marginBottom: "30px",
};

const title = {
  fontSize: "36px",
  fontWeight: "700",
  background: "linear-gradient(135deg,#64c8ff,#9d7aff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subtitle = {
  color: "#9ca3af",
  marginTop: "8px",
};

const topGrid = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "20px",
  marginTop: "20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
  marginTop: "40px",
};

const section = {
  marginTop: "50px",
};

const loading = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
};