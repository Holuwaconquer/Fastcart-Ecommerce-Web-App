import axios from "axios";
import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const [year, month] = label.split('-');
    const formattedLabel = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'short', year: 'numeric' });
    return (
      <div style={{padding: '20px'}} className="bg-[#333752] rounded-[4px] text-white flex flex-col items-center justify-center">
        {payload.map((entry) => (
          <p className="flex flex-col items-center justify-center" key={entry.dataKey}>
            <strong>{entry.value} Orders</strong>
            <span>{formattedLabel}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DashboardChart = () => {
  const [ordersMonthly, setOrdersMonthly] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const monthlyURL = `${API_URL}/admin/order/monthly`;

    axios.get(monthlyURL)
      .then((res) => {
        if (res.status === 200 && res.data?.data) {
          const rawData = res.data.data;

          // Generate all months from Jan to Dec
          const months = [
            "2025-01", "2025-02", "2025-03", "2025-04", "2025-05",
            "2025-06", "2025-07", "2025-08", "2025-09", "2025-10",
            "2025-11", "2025-12"
          ];

          // Fill missing months with zero values
          const filledData = months.map(month => {
            const existingMonth = rawData.find(item => item._id === month);
            if (existingMonth) {
              return {
                month: existingMonth._id,
                totalOrders: existingMonth.totalOrders,
              };
            } else {
              return {
                month: month,
                totalOrders: 0,
              };
            }
          });

          setOrdersMonthly(filledData);
        }
      })
      .catch((err) => console.error("Error fetching monthly orders:", err));
  }, []);

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={ordersMonthly}>
          <CartesianGrid strokeDasharray="2 2" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tickFormatter={(month) => {
              // Format month (e.g., "2025-01" → "Jan 2025")
              const [year, monthNum] = month.split('-');
              const date = new Date(`${year}-${monthNum}-01`);
              return date.toLocaleString('default', { month: 'short', year: 'numeric' });
            }}
            interval={0}
            tick={{ fontSize: 12, fill: "#5A607F" }}
          />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip content={<CustomToolTip />} />
          <Legend />
          <Line
            key="totalOrders"
            type="monotone"
            dataKey="totalOrders"
            name="Total Orders"
            stroke="#1E5EFF"
            strokeWidth={2}
            dot={false}
          />
          <Line
            key="totalRevenue"
            type="monotone"
            dataKey="totalRevenue"
            name="Total Revenue"
            stroke="#A3AED0"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
  