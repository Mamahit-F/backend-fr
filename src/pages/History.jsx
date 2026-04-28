import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function History() {
  const [historyTasks, setHistoryTasks] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/assignments");

      const completedTasks = res.data.filter(
        (task) =>
          String(task.userId) === String(userId) &&
          (task.status === "done" || task.status === "completed"),
      );

      setHistoryTasks(completedTasks);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil history");
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">History</h1>
          <p className="text-gray-500">Tugas yang telah kamu selesaikan</p>
        </div>

        {historyTasks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow">
            <p className="text-gray-400 text-lg">Belum ada tugas selesai 😴</p>
          </div>
        ) : (
          <div className="space-y-4">
            {historyTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{task.title}</h3>

                    <p className="text-sm text-gray-400">
                      Deadline:{" "}
                      {task.deadline
                        ? new Date(task.deadline).toLocaleDateString()
                        : "-"}
                    </p>

                    <p className="text-sm text-gray-400">
                      {task.description || "Tidak ada deskripsi"}
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600 font-medium">
                    DONE
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
