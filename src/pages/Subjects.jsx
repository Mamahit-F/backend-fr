import Layout from "../components/Layout";

export default function Subjects() {
  const subjects = [
    "Struktur Data",
    "Kecerdasan Buatan",
    "Basis Data",
    "Pemrograman Web",
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Subjects</h1>

      <div className="grid grid-cols-4 gap-4">
        {subjects.map((s, i) => (
          <div
            key={i}
            className="bg-white/70 p-4 rounded-2xl shadow hover:scale-105 transition"
          >
            {s}
          </div>
        ))}
      </div>
    </Layout>
  );
}