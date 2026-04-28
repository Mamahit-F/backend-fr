import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [assignments, setAssignments] = useState([]);

  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("name") || "Student";

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const summaryRes = await axios.get(
        `http://localhost:8081/api/dashboard/summary/${userId}`,
      );

      const assignmentRes = await axios.get(
        "http://localhost:8081/api/assignments",
      );

      const userAssignments = assignmentRes.data.filter(
        (item) => String(item.userId) === String(userId),
      );

      setSummary(summaryRes.data);
      setAssignments(userAssignments.slice(0, 5));
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data dashboard");
    }
  };

  if (!summary) {
    return (
      <Layout>
        <p>Loading dashboard...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-2">Hello, {name} 👋</h1>
      <p className="text-gray-500 mb-6">
        Berikut ringkasan tugas belajarmu hari ini.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Total Tasks</h3>
          <p className="text-2xl font-bold">{summary.totalAssignments}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-green-500">
            {summary.completedAssignments}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-500">
            {summary.pendingAssignments}
          </p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h3 className="font-bold mb-4">Statistics</h3>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-gray-500">In Progress</p>
            <p className="text-xl font-bold text-blue-500">
              {summary.inProgressAssignments}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Total Subjects</p>
            <p className="text-xl font-bold text-purple-500">
              {summary.totalSubjects}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Nearest Deadline</p>
            <p className="text-xl font-bold">{summary.nearestDeadlineTitle}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-bold mb-4">Recent Tasks</h3>

        {assignments.length === 0 ? (
          <p className="text-gray-400">Belum ada tugas.</p>
        ) : (
          <ul className="space-y-2">
            {assignments.map((task) => (
              <li key={task.id} className="text-gray-700">
                {task.status === "completed" || task.status === "done"
                  ? "✔"
                  : "•"}{" "}
                {task.title}{" "}
                <span className="text-gray-400">({task.status})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
