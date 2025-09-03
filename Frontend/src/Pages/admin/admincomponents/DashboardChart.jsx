import axios from "axios";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CustomToolTip = ({ active, payload, label }) =>{
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#333752] rounded-[4px] flex flex-col items-center justify-center text-white" style={{ padding: '10px' }}>
        <p className="font-bold">{`${payload[0].value}`} {payload[0].value > 1 ? "Orders" : "Order"}</p>
        <p>
          {new Date(order.date).toLocaleDateString()}
          {new Date(`1970-01-01T${label}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    );
  }
  return null;
}

const DashboardChart = () => {
  // Convert API data into chart-friendly format
  const [ordersDaily, setOrdersDaily] = useState([]);

  useEffect(() => {
    const dailyURL = "http://localhost:5000/admin/orders/hourly"
    axios.get(dailyURL)
    .then((res) =>{
      if(res.status === 200 && res.data?.data){
        setOrdersDaily(res.data.data);
      }
    }).catch((err) => console.error("Error fetching daily orders:", err));
  }, [])
  

  const data = ordersDaily.map(order => ({
    date: order.date, 
    time: order.hour,     // "00:00", "01:00", ...
    orders: order.totalOrders,
  }));

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* ✅ Show X-axis labels */}
          <XAxis dataKey="time" tick={{ fontSize: 12, fill: "#5A607F" }} />
          <YAxis />
          <Tooltip
            content={<CustomToolTip />}
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#1E5EFF"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
