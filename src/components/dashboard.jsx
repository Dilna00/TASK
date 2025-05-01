// import React, { useEffect, useState } from "react";

// import axios from "axios";
// import {
//   PieChart, Pie, Cell,
//   BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
// } from "recharts";

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4"];

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     total: 0,
//     platformCounts: {},
//     programCounts: {},
//     recent: []
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/summary");
//         setStats(res.data);
//       } catch (err) {
//         console.error("Error loading dashboard:", err);
//       }
//     };
//     fetchData();
//   }, []);

  

//   const pieData = Object.entries(stats.platformCounts).map(([key, value]) => ({
//     name: key,
//     value
//   }));

//   const barData = Object.entries(stats.programCounts).map(([key, value]) => ({
//     name: key,
//     count: value
//   }));

//   return (
//     <div className="w-full min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">📊 Survey Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-xl shadow text-center">
//           <h2 className="text-xl font-semibold">Total Submissions</h2>
//           <p className="text-4xl font-bold text-green-600 mt-4">{stats.total}</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow col-span-1 md:col-span-2">
//           <h2 className="text-lg font-semibold mb-2">Platform Distribution</h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ name, percent }) =>
//                   `${name} (${(percent * 100).toFixed(0)}%)`
//                 }
//                 outerRadius={100}
//                 dataKey="value"
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow mb-8">
//         <h2 className="text-lg font-semibold mb-4">Program Preferences</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={barData}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="count" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow">
//         <h2 className="text-lg font-semibold mb-4">Recent Responses</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead>
//               <tr className="bg-gray-200 text-left">
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Mobile</th>
//                 <th className="px-4 py-2">Platform</th>
//               </tr>
//             </thead>
//             <tbody>
//               {stats.recent.map((item, index) => (
//                 <tr key={index} className="border-t">
//                   <td className="px-4 py-2">{item.name}</td>
//                   <td className="px-4 py-2">{item.mobile}</td>
//                   <td className="px-4 py-2">{item.platform?.join(", ")}</td>
//                 </tr>
//               ))}
//               {stats.recent.length === 0 && (
//                 <tr><td colSpan="3" className="text-center py-4">No data yet</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4"];
import { Users, Tv, BarChart2, Clock, CornerDownLeft } from "lucide-react";
const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    platformCounts: {},
    programCounts: {},
    contentCounts: {},
    recent: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/summary");
        setStats(res.data);
      } catch (err) {
        console.error("Error loading dashboard:", err);
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




  const backfucntion = () => {
    window.location.href = "/";
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div  className="flex w-full justify-between">

      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">📊 Survey Dashboard</h1>
<button   
onClick={backfucntion}
>
<CornerDownLeft />
</button>
      </div>

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
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={100}
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
                <tr key={index} className="border-t">
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
                <tr><td colSpan="3" className="text-center py-4">No data yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
