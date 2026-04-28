import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function Assignments() {
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [editId, setEditId] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadAssignments();
    loadSubjects();
  }, []);

  const loadAssignments = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/assignments");
      const userTasks = res.data.filter(
        (task) => String(task.userId) === String(userId),
      );
      setTasks(userTasks);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil assignment");
    }
  };

  const loadSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/subjects");
      const userSubjects = res.data.filter(
        (subject) => String(subject.userId) === String(userId),
      );
      setSubjects(userSubjects);

      if (userSubjects.length > 0) {
        setSubjectId(userSubjects[0].id);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil subject");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDeadline("");
    setEstimatedHours("");
    setEditId(null);

    if (subjects.length > 0) {
      setSubjectId(subjects[0].id);
    }
  };

  const saveTask = async () => {
    if (!title || !subjectId) {
      alert("Judul dan subject wajib diisi");
      return;
    }

    const payload = {
      userId: Number(userId),
      subjectId: Number(subjectId),
      title,
      description,
      deadline: deadline ? `${deadline}:00` : null,
      estimatedHours: estimatedHours ? Number(estimatedHours) : null,
      status: "pending",
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:8081/api/assignments/${editId}`, {
          ...payload,
          status: tasks.find((task) => task.id === editId)?.status || "pending",
        });
      } else {
        await axios.post("http://localhost:8081/api/assignments", payload);
      }

      resetForm();
      loadAssignments();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan assignment");
    }
  };

  const completeTask = async (task) => {
    try {
      await axios.put(`http://localhost:8081/api/assignments/${task.id}`, {
        ...task,
        status: "completed",
      });

      loadAssignments();
    } catch (error) {
      console.error(error);
      alert("Gagal update status");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/assignments/${id}`);
      loadAssignments();
    } catch (error) {
      console.error(error);
      alert("Gagal hapus assignment");
    }
  };

  const editTask = (task) => {
    setEditId(task.id);
    setTitle(task.title || "");
    setDescription(task.description || "");
    setEstimatedHours(task.estimatedHours || "");
    setSubjectId(task.subjectId || "");

    if (task.deadline) {
      setDeadline(task.deadline.slice(0, 16));
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Assignments</h1>

      <div className="bg-white p-5 rounded-xl shadow mb-6 grid gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul assignment"
          className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Deskripsi assignment"
          className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          value={estimatedHours}
          onChange={(e) => setEstimatedHours(e.target.value)}
          placeholder="Estimasi jam"
          className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={saveTask}
          className={`px-4 py-3 rounded-lg text-white transition ${
            editId
              ? "bg-yellow-500 hover:scale-105"
              : "bg-blue-600 hover:scale-105"
          }`}
        >
          {editId ? "Update Assignment" : "Add Assignment"}
        </button>
      </div>

      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500">Belum ada assignment 😴</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h3
                  className={`font-semibold ${
                    task.status === "completed" || task.status === "done"
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {task.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {task.description || "Tidak ada deskripsi"}
                </p>

                <p className="text-xs text-gray-400">
                  Deadline:{" "}
                  {task.deadline
                    ? new Date(task.deadline).toLocaleString()
                    : "-"}
                </p>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    task.status === "completed" || task.status === "done"
                      ? "bg-green-100 text-green-700"
                      : task.status === "in_progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <div className="flex gap-2">
                {task.status !== "completed" && task.status !== "done" && (
                  <button
                    onClick={() => completeTask(task)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:scale-105"
                  >
                    Done
                  </button>
                )}

                <button
                  onClick={() => editTask(task)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:scale-105"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
