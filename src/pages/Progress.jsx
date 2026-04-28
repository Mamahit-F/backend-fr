import Layout from "../components/Layout";

export default function Progress() {
  const data = [
    { subject: "AI", progress: 80 },
    { subject: "Database", progress: 60 },
    { subject: "Web", progress: 90 },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">
        Progress Belajar 📊
      </h1>

      <div className="grid grid-cols-3 gap-4">
        {data.map((d, i) => (
          <div
            key={i}
            className="bg-white/70 backdrop-blur p-4 rounded-2xl shadow"
          >
            <h2 className="font-semibold mb-2">{d.subject}</h2>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-400 h-3 rounded-full"
                style={{ width: `${d.progress}%` }}
              ></div>
            </div>

            <p className="text-sm mt-2">{d.progress}% selesai</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}