const BASE_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("token");

// GET ALL SCAN DATA (MAIN SOURCE)
export const getDashboardData = async () => {
  const res = await fetch(`${BASE_URL}/scan/history`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.json();
};

// Overview
export const getOverview = async () => {
  const data = await getDashboardData();

  const latest = data[0] || {};

  return {
    riskScore: latest.riskScore || 0,
    securityHealth: 100 - (latest.riskScore || 0),
    recentEvents: data,
    alerts: data.filter(item => item.severity === "High")
  };
};

// Category Distribution
export const getCategory = async () => {
  const data = await getDashboardData();

  const map = {};
  data.forEach(item => {
    const cat = item.category || "unknown";
    map[cat] = (map[cat] || 0) + 1;
  });

  return Object.keys(map).map(key => ({
    _id: key,
    count: map[key]
  }));
};

// Trend
export const getTrend = async () => {
  const data = await getDashboardData();

  const map = {};
  data.forEach(item => {
    const date = new Date(item.createdAt).toLocaleDateString();
    map[date] = (map[date] || 0) + 1;
  });

  return Object.keys(map).map(key => ({
    _id: key,
    count: map[key]
  }));
};

// Alerts
export const getAlerts = async () => {
  const data = await getDashboardData();

  return data
    .filter(item => item.severity === "High")
    .map(item => ({
      message: `${item.category} detected (Risk: ${item.riskLevel})`
    }));
};

// AI Insight
export const getInsight = async () => {
  return {
    insight:
      "Your system is secure. Monitor high-risk threats regularly."
  };
};