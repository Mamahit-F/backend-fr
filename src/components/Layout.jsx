import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Assignments", path: "/assignments" },
    { name: "Subjects", path: "/subjects" },
    { name: "Progress", path: "/progress" },
    { name: "AI Assistant", path: "/ai" },
    { name: "History", path: "/history" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-5">
        <h2 className="text-xl font-bold mb-6">My App</h2>

        <nav className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">
        {children}
      </div>

    </div>
  );
}