import Layout from "../components/Layout";

export default function Dashboard() {

  // dummy data (sementara)
  const total = 8;
  const done = 3;
  const pending = total - done;

  return (
    <Layout>

      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Total Tasks</h3>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-green-500">{done}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-500">{pending}</p>
        </div>

      </div>

      {/* RECENT TASKS */}
      <div className="bg-white p-5 rounded-xl shadow">

        <h3 className="font-bold mb-4">Recent Tasks</h3>

        <ul className="space-y-2">
          <li className="text-gray-700">✔ UI Design</li>
          <li className="text-gray-700">✔ API Integration</li>
          <li className="text-gray-400 line-through">Database Setup</li>
        </ul>

      </div>

    </Layout>
  );
}