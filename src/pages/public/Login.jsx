import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost/RepairIo/php/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    });

    const result = await response.json();

    if (result.status === "success") {
      //alert(result.message);
      const expires = new Date();
      expires.setHours(expires.getHours() + 1);
      document.cookie = `user=${encodeURIComponent(JSON.stringify(result.user))}; expires=${expires.toUTCString()}; path=/`;
      
      const checkCookie = () => {
        const cookie = document.cookie.split(';').find(row => row.trim().startsWith('user='));
        if (cookie) {
          const cookieValue = cookie.split('=')[1];
          const user = JSON.parse(decodeURIComponent(cookieValue));
          return user;
        }
        return null;
      };

      const user = checkCookie();
      if (!user) {
        navigate('/login');
      } else {
        navigate('/');
      };
      navigate('/');
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("Error al conectar-se amb el servidor.");
  }
};


  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="bg-orange-300 p-8 rounded-4xl shadow-lg w-[600px] h-[460px]">
        <h2 className="text-3xl font-bold text-orange-700 text-center mt-8 mb-8">
          INICIAR SESSIÓ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <label className="text-orange-700 text-lg font-bold mb-2 ">
              Correu electrònic
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-96 p-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-orange-700 text-lg font-bold mb-2">
              Contrasenya
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-96 p-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
            >
              INICIAR SESSIÓ
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-gray-600">
          No tens compte?{" "}
          <Link to="/register" className="text-orange-600 hover:text-orange-700">
            Registra't aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
