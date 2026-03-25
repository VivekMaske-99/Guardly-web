import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#ef4444", "#f59e0b", "#3b82f6", "#10b981"];

export default function ThreatDistribution({ data }) {

  const formatted = data.map(item => ({
    name: item._id,
    value: item.count
  }));

  const total = formatted.reduce((sum, item) => sum + item.value, 0);

  return (
  <div style={card}>
    <h2>Threat Distribution</h2>

    <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={formatted}
            dataKey="value"
            innerRadius={70}
            outerRadius={110}
          >
            {formatted.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="text-center mt-6">
        <p className="text-3xl font-bold">{total}</p>
        <p className="text-gray-400 text-sm">Total Threats</p>
      </div>

    </div>
  );
}
const card = {
  background: "rgba(20,33,61,0.6)",
  padding: "20px",
  borderRadius: "15px",
};