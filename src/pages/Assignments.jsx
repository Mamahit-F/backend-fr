import { useState } from "react";
import Layout from "../components/Layout";

export default function Assignments() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const addTask = () => {
    if (!input) return;

    if (editId !== null) {
      // UPDATE
      setTasks(
        tasks.map((t) =>
          t.id === editId ? { ...t, title: input } : t
        )
      );
      setEditId(null);
    } else {
      // CREATE
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: input,
          status: "active",
        },
      ]);
    }

    setInput("");
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: "done" } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (task) => {
    setInput(task.title);
    setEditId(task.id);
  };

  return (
    <Layout>

      <h1 className="text-2xl font-bold mb-6">Assignments</h1>

      {/* INPUT */}
      <div className="flex gap-2 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tambah assignment..."
          className="flex-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addTask}
          className={`px-4 rounded-lg text-white transition ${
            editId !== null
              ? "bg-yellow-500 hover:scale-105"
              : "bg-blue-600 hover:scale-105"
          }`}
        >
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* LIST */}
      <div className="grid gap-4">

        {tasks.length === 0 ? (
          <p className="text-gray-500">Belum ada assignment 😴</p>
        ) : (
          tasks.map((t) => (
            <div
              key={t.id}
              className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h3
                  className={`font-semibold ${
                    t.status === "done"
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {t.title}
                </h3>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    t.status === "active"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {t.status}
                </span>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2">

                {t.status === "active" && (
                  <button
                    onClick={() => completeTask(t.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:scale-105"
                  >
                    Done
                  </button>
                )}

                <button
                  onClick={() => editTask(t)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:scale-105"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(t.id)}
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