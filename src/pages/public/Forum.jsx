import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Forum() {
  const { nombre } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [idForum, setIdForum] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookie = document.cookie
      .split(";")
      .find((row) => row.trim().startsWith("user="));
    if (!cookie) {
      navigate("/login");
      return;
    }
    const cookieValue = cookie.split("=")[1];
    const userData = JSON.parse(decodeURIComponent(cookieValue));
    setUser(userData);

    fetchForumId();
  }, [nombre, navigate]);

  useEffect(() => {
    if (idForum) {
      fetchMessages();
    }
  }, [idForum]);

  const fetchForumId = async () => {
    try {
      const response = await fetch(
        `http://localhost/RepairIo/php/getForumId.php?consola_nom=${nombre}`
      );

      const data = await response.json();
      if (data.status === "success") {
        setIdForum(data.idForum);
      } else {
        alert("Error: " + data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al cargar el foro");
      navigate("/");
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost/RepairIo/php/getMessages.php?idForum=${idForum}`
      );
      const data = await response.json();
      if (data.status === "success") {
        setMessages(data.messages);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(
        "http://localhost/RepairIo/php/createMessage.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idForum: idForum,
            contingut: newMessage,
            idUsuari: user.idUser,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        setNewMessage("");
        fetchMessages(); 
      } else {
        alert("Error al enviar el mensaje: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  if (!user) {
    return (
      <div className="text-center text-red-600 font-bold mt-10">
        Error: Debes iniciar sesión para acceder al foro
      </div>
    );
  }

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
          {messages.map((msg) => (
            <div
              key={msg.idMissatge}
              className="bg-orange-200 border-2 border-black p-2 shadow-[2px_2px_0_#000]"
            >
              <div className="font-semibold mb-1">{msg.autor}</div>
              <div>{msg.contingut}</div>
              <div className="text-sm text-gray-500 mt-1">{msg.data}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forum;
