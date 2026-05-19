import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function RiskPanel({ session, refresh }) {
  const [stats, setStats] = useState({
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0,
    riskScore: 0
  });

  const [risk, setRisk] = useState("");
  const [severity, setSeverity] = useState("");

  // 🔥 ADDED (ONLY THIS)
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!session) {
      setStats({
        highRisk: 0,
        mediumRisk: 0,
        lowRisk: 0,
        riskScore: 0
      });
      setRisk("");
      setSeverity("");
      return;
    }

    let cancelled = false;

    const fetchRisk = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/risk/session/${session}`,
          {
            headers: {
              Authorization: `Bearer ${token}` // 🔥 ADDED
            }
          }
        );

        if (!cancelled && res.data) {
         setStats(prev => ({
  highRisk: res.data.highRisk ?? prev.highRisk,
  mediumRisk: res.data.mediumRisk ?? prev.mediumRisk,
  lowRisk: res.data.lowRisk ?? prev.lowRisk,
  riskScore: res.data.riskScore ?? prev.riskScore
}));

          setRisk(res.data.last?.risk || "");
          setSeverity(res.data.last?.severity || "");
        }
      } catch (err) {
        console.error("Risk fetch failed", err);
      }
    };

    fetchRisk();

    const retry = setTimeout(fetchRisk, 500);

    return () => {
      cancelled = true;
      clearTimeout(retry);
    };
  }, [session, refresh]);

  const chartData = [
    { name: "High", value: stats.highRisk },
    { name: "Medium", value: stats.mediumRisk },
    { name: "Low", value: stats.lowRisk }
  ];

  return (
    <div
      style={{
        width: 300,
        background: "#020617",
        padding: 20,
        borderLeft: "1px solid #1e293b",
        color: "white"
      }}
    >
      <div style={{ fontSize: 18, marginBottom: 5 }}>🛡 Risk Score</div>
      <div style={{ fontSize: 48, fontWeight: "bold", marginBottom: 10 }}>
        {stats.riskScore}
      </div>

      <div style={{ fontSize: 16, marginBottom: 6 }}>
        <b>Risk:</b> {risk || "-"}
      </div>

      <div
        style={{
          fontSize: 16,
          marginBottom: 20,
          color:
            severity === "High"
              ? "#ef4444"
              : severity === "Medium"
              ? "#f97316"
              : severity === "Low"
              ? "#22c55e"
              : "#94a3b8"
        }}
      >
        <b>Severity:</b> {severity || "-"}
      </div>

      <div style={{ height: 200, marginTop: 20 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}