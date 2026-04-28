import { useState } from "react";
import Layout from "../components/Layout";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Halo! Saya siap membantu mengatur jadwal belajar kamu 📚" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    const newMessages = [
      ...messages,
      { role: "user", text: input },
      { role: "ai", text: "Saya sarankan kerjakan tugas dengan deadline terdekat dulu 🚀" },
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">
        AI Assistant 🤖
      </h1>

      <div className="bg-white/70 backdrop-blur rounded-2xl shadow p-4 h-[70vh] flex flex-col">

        {/* Chat */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl max-w-xs ${
                msg.role === "user"
                  ? "bg-indigo-500 text-white ml-auto"
                  : "bg-gray-200"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="mt-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanya AI..."
            className="flex-1 border p-2 rounded-lg"
          />
          <button
            onClick={sendMessage}
            className="bg-gradient-to-r from-indigo-500 to-purple-400 text-white px-4 rounded-lg"
          >
            Kirim
          </button>
        </div>
      </div>
    </Layout>
  );
}