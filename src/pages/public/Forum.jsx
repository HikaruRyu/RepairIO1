import React, { useState } from "react";
import { useParams } from "react-router-dom";

function Forum() {
  const { nombre } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, newMessage]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-orange-100 p-6">
      <div className="max-w-2xl mx-auto bg-white border-4 border-black p-6 shadow-[6px_6px_0_#000]">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Fòrum de {nombre}
        </h2>

        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full border-2 border-black p-2 mb-2"
            rows={3}
            placeholder="Escriu el teu missatge aquí..."
          />
          <button
            type="submit"
            className="bg-yellow-400 border-2 border-black px-4 py-2 font-bold shadow-[2px_2px_0_#000] hover:bg-yellow-300"
          >
            Enviar
          </button>
        </form>

        <div className="space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-orange-200 border-2 border-black p-2 shadow-[2px_2px_0_#000]"
            >
              {msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forum;
