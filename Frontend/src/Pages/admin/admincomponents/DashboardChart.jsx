import axios from "axios";
import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ✅ Custom tooltip
const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const [hourStr] = label.split(":");
    const hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedLabel = `${displayHour} ${ampm}`;
    return (
      <div style={{padding: '20px'}} className="bg-[#333752] rounded-[4px] text-white flex flex-col items-center justify-center">
        {payload.map((entry) => (
          <p className="flex flex-col items-center justify-center" key={entry.dataKey}>
            <strong>{entry.value} Orders</strong>
            <span >{entry.dataKey
            .replace(" Orders", "")
            .replace(/, \d{4}$/, "")} {formattedLabel}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DashboardChart = () => {
  const [ordersDaily, setOrdersDaily] = useState([]);
  const [showPrevious, setShowPrevious] = useState(false);
  const [todayLabel, setTodayLabel] = useState("");

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const formatDate = (d) => d.toISOString().split("T")[0];
    const todayStr = formatDate(today);
    const yesterdayStr = formatDate(yesterday);

    const dailyURL = `http://localhost:5000/admin/orders/hourly?dates=${yesterdayStr},${todayStr}`;

    axios.get(dailyURL)
      .then((res) => {
    if (res.status === 200 && res.data?.data) {
      const rawData = res.data.data;

      // Extract today’s label string
      const keys = Object.keys(rawData[0] || {});
      const ordersKeys = keys.filter(k => k.includes("Orders"));
      const todayFormatted = today.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const todayKey = ordersKeys.find(k => k.startsWith(todayFormatted));
      setTodayLabel(todayKey?.replace(" Orders", "") || "");

      // ✅ Filter last 12 hours relative to now
      const now = new Date();
      const last12Hours = rawData.filter(d => {
        const [hourStr] = d.time.split(":");
        const hour = parseInt(hourStr, 10);

        // Construct a Date using today's date + that hour
        const pointDate = new Date(today);
        pointDate.setHours(hour, 0, 0, 0);

        return (now - pointDate) <= 12 * 60 * 60 * 1000 && pointDate <= now;
      });

      setOrdersDaily(last12Hours);
    }
  })
      .catch((err) => console.error("Error fetching daily orders:", err));
  }, []);

  return (
    <div>
      {/* ✅ Toggle button */}
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setShowPrevious((prev) => !prev)}
      >
        {showPrevious ? "Hide Previous Day" : "Show Previous Day"}
      </button>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={ordersDaily}>
          <CartesianGrid strokeDasharray="2 2" vertical={false}/>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tickFormatter={(time) => {
              // "00:00" → "12 AM", "13:00" → "1 PM"
              const [hour] = time.split(":");
              const h = parseInt(hour, 10);
              const ampm = h >= 12 ? "PM" : "AM";
              const displayHour = h % 12 === 0 ? 12 : h % 12;
              return `${displayHour} ${ampm}`;
            }}
            interval={0}
            tick={{ fontSize: 12, fill: "#5A607F" }}
          />

          <YAxis axisLine={false}
            tickLine={false} />
          <Tooltip content={<CustomToolTip />} />
          <Legend />

          {/* ✅ Dynamically add only Orders lines */}
          {ordersDaily.length > 0 &&
            Object.keys(ordersDaily[0])
              .filter((key) => key !== "time" && key.includes("Orders"))
              .map((metric) => {
                const isCurrent = metric.startsWith(todayLabel);

                if (!isCurrent && !showPrevious) {
                  return null;
                }

                return (
                  <Line
                    key={metric}
                    type="monotone"
                    dataKey={metric}
                    name={metric.replace(" Orders", "").replace(/, \d{4}$/, "")}
                    stroke={isCurrent ? "#1E5EFF" : "#A3AED0"}
                    strokeWidth={2}
                    dot={false}
                  />
                );
              })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
