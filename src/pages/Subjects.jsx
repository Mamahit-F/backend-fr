import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/subjects");

      const userSubjects = res.data.filter(
        (s) => String(s.userId) === String(userId),
      );

      setSubjects(userSubjects);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil subject");
    }
  };

  const addSubject = async () => {
    if (!name) return alert("Nama subject wajib diisi");

    try {
      await axios.post("http://localhost:8081/api/subjects", {
        name,
        userId: Number(userId),
      });

      setName("");
      loadSubjects();
    } catch (error) {
      console.error(error);
      alert("Gagal menambah subject");
    }
  };

  const deleteSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/subjects/${id}`);
      loadSubjects();
    } catch (error) {
      console.error(error);
      alert("Gagal hapus subject");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Subjects</h1>

      {/* INPUT */}
      <div className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tambah subject..."
          className="flex-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addSubject}
          className="bg-blue-600 text-white px-4 rounded-lg hover:scale-105"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-4 gap-4">
        {subjects.length === 0 ? (
          <p className="text-gray-500 col-span-4">Belum ada subject 😴</p>
        ) : (
          subjects.map((s) => (
            <div
              key={s.id}
              className="bg-white p-4 rounded-2xl shadow flex justify-between items-center hover:scale-105 transition"
            >
              <span>{s.name}</span>

              <button
                onClick={() => deleteSubject(s.id)}
                className="text-red-500 text-sm"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
