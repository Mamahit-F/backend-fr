import Layout from "../components/Layout";

export default function History() {

  // 🔥 dummy data (nanti bisa ambil dari backend / state global)
  const tasks = [
    {
      id: 1,
      title: "UI Dashboard Design",
      status: "done",
      completedAt: "2026-04-25"
    },
    {
      id: 2,
      title: "API Integration",
      status: "done",
      completedAt: "2026-04-20"
    },
    {
      id: 3,
      title: "Database Setup",
      status: "done",
      completedAt: "2026-03-10"
    }
  ];

  // 🔥 filter 2 minggu terakhir
  const now = new Date();
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(now.getDate() - 14);

  const historyTasks = tasks.filter((t) => {
    const completedDate = new Date(t.completedAt);
    return (
      t.status === "done" &&
      completedDate >= twoWeeksAgo
    );
  });

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            History
          </h1>
          <p className="text-gray-500">
            Tugas yang telah kamu selesaikan dalam 2 minggu terakhir
          </p>
        </div>

        {/* LIST */}
        {historyTasks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow">
            <p className="text-gray-400 text-lg">
              Belum ada tugas selesai 😴
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {historyTasks.map((t) => (
              <div
                key={t.id}
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">

                  <div>
                    <h3 className="font-semibold text-lg">
                      {t.title}
                    </h3>

                    <p className="text-sm text-gray-400">
                      Diselesaikan pada{" "}
                      {new Date(t.completedAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* STATUS BADGE */}
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