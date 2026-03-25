import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function TrendChart({ data }) {

  const formatted = data.map(item => ({
    week: `Week ${item._id}`,
    threats: item.count
  }));

  return (
  <div style={card}>
    <h2>Weekly Threat Trend</h2>

    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="week" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="threats"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
const card = {
  background: "rgba(20,33,61,0.6)",
  padding: "20px",
  borderRadius: "15px",
};
