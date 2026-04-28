import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Assignments from "./pages/Assignments";
import AIAssistant from "./pages/AIAssistant";
import Progress from "./pages/Progress";
import History from "./pages/History"; // ✅ TAMBAHAN

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* MAIN */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/history" element={<History />} /> {/* ✅ TAMBAHAN */}
        <Route path="/ai" element={<AIAssistant />} />
        <Route path="/progress" element={<Progress />} />

        {/* FALLBACK */}
        <Route path="*" element={<h1>Page Not Found 😢</h1>} />

      </Routes>
    </BrowserRouter>
  );
}