import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function Progress() {
  const [progressData, setProgressData] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const subjectRes = await axios.get("http://localhost:8081/api/subjects");
      const assignmentRes = await axios.get(
        "http://localhost:8081/api/assignments",
      );

      const subjects = subjectRes.data.filter(
        (s) => String(s.userId) === String(userId),
      );

      const assignments = assignmentRes.data.filter(
        (a) => String(a.userId) === String(userId),
      );

      const result = subjects.map((subject) => {
        const subjectTasks = assignments.filter(
          (a) => String(a.subjectId) === String(subject.id),
        );

        const total = subjectTasks.length;
        const done = subjectTasks.filter(
          (a) => a.status === "completed" || a.status === "done",
        ).length;

        const progress = total === 0 ? 0 : Math.round((done / total) * 100);

        return {
          subject: subject.name,
          progress,
        };
      });

      setProgressData(result);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil progress");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">
        Progress Belajar 📊
      </h1>

      <div className="grid grid-cols-3 gap-4">
        {progressData.length === 0 ? (
          <p className="text-gray-500 col-span-3">Belum ada data progress 😴</p>
        ) : (
          progressData.map((d, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur p-4 rounded-2xl shadow"
            >
              <h2 className="font-semibold mb-2">{d.subject}</h2>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-400 h-3 rounded-full"
                  style={{ width: `${d.progress}%` }}
                ></div>
              </div>

              <p className="text-sm mt-2">{d.progress}% selesai</p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
