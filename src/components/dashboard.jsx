
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { CornerDownLeft } from "lucide-react";

// Static fallback data
const staticData = {
  total: 9,
  platformCounts: {
    "Home TV": 57,
    "Youtube": 43
  },
  programCounts: {
    "Out of focus": 2,
    "Weekend Arabia": 1,
    "Middle East Hour": 3
  },
  contentCounts: {
    "News": 4,
    "Entertainment": 3,
    "Sports": 2
  },
  recent: [
    { name: "Salah", mobile: "Bahrain +97394953622", platform: ["Home TV"] },
    { name: "Dilna", mobile: "Bahrain +97387987654", platform: ["Youtube"] },
    { name: "Dilna", mobile: "Kuwait +96587987654", platform: ["Home TV"] },
    { name: "DataHex1", mobile: "Kuwait +96587987654", platform: ["Home TV", "Youtube"] },
    { name: "Dilna", mobile: "Qatar +97470343172", platform: ["Home TV", "Youtube"] }
  ]
};

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4"];

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    platformCounts: {},
    programCounts: {},
    contentCounts: {},
    recent: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/summary");
        if (res.data && Object.keys(res.data).length > 0 && res.data.total > 0) {
          setStats(res.data); // use dynamic API data
          setError(false);
        } else {
          console.warn("Empty API data, using static fallback.");
          setStats(staticData);
          setError(true);
        }
      } catch (err) {
        console.error("API fetch failed, using static fallback:", err.message);
        setStats(staticData);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const pieData = Object.entries(stats.platformCounts).map(([key, value]) => ({
    name: key,
    value
  }));

  const barData = Object.entries(stats.programCounts).map(([key, value]) => ({
    name: key,
    count: value
  }));

  const backFunction = () => {
    window.location.href = "/";
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="flex w-full justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">
          <span className="inline-block mr-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="3" width="6" height="18" rx="1" fill="#4CAF50" />
              <rect x="10" y="8" width="6" height="13" rx="1" fill="#2196F3" />
              <rect x="18" y="5" width="6" height="16" rx="1" fill="#9C27B0" />
            </svg>
          </span>
          Survey Dashboard
        </h1>
        <button
          onClick={backFunction}
          className="p-2 bg-white shadow rounded-full hover:bg-gray-50 transition"
          aria-label="Go back"
        >
          <CornerDownLeft size={24} />
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl font-semibold text-gray-600">Loading dashboard data...</div>
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-4 p-4 text-yellow-800 bg-yellow-100 border border-yellow-300 rounded">
              API not available. Showing fallback data.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-xl font-semibold">Total Submissions</h2>
              <p className="text-4xl font-bold text-green-600 mt-4">{stats.total}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow col-span-1 md:col-span-2">
              <h2 className="text-lg font-semibold mb-2">Platform Distribution</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={95}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow mb-8">
            <h2 className="text-lg font-semibold mb-4">Program Preferences</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Responses</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Mobile</th>
                    <th className="px-4 py-2">Platform</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.mobile}</td>
                      <td className="px-4 py-2">
                        {Array.isArray(item.platform)
                          ? item.platform.join(", ")
                          : item.platform}
                      </td>
                    </tr>
                  ))}
                  {stats.recent.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-4">No data yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
