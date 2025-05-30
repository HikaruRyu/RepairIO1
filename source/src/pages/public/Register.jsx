import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
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

  if (formData.password !== formData.confirmPassword) {
    alert("Les contrasenyes no coincideixen");
    return;
  }

  try {
    const response = await fetch("http://localhost:8081/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    });

    const result = await response.json();

    if (result.status === "success") {
      // Enviar correo de bienvenida
      fetch("http://localhost:8081/sendMail.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username
        })
      })
      .then(response => response.json())
      .then(mailResult => {
        if (mailResult.status === "success") {
          navigate("/login");
        } else {
          console.error("Error al enviar el correo:", mailResult.message);
          navigate("/login");
        }
      })
      .catch(error => {
        console.error("Error al enviar el correo:", error);
        navigate("/login");
      });
    } else {
      alert(result.message || "Error en el registre.");
    }

  } catch (error) {
    console.error("Error en la petició:", error);
    alert("Error de connexió amb el servidor.");
  }
};



  
return (
  <div className="min-h-screen bg-orange-50 flex items-center justify-center">
    <div className="bg-orange-300 p-8 rounded-4xl shadow-lg w-[600px] h-[650px]">
      <h2 className="text-3xl font-bold text-orange-700 text-center mt-8 mb-8">
        REGISTRA'T
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center">
          <label className="text-orange-700 text-lg font-bold mb-2">
            Nom d'usuari
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-96 p-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        <div className="flex flex-col items-center">
          <label className="text-orange-700 text-lg font-bold mb-2">
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

        <div className="flex flex-col items-center">
          <label className="text-orange-700 text-lg font-bold mb-2">
            Confirma la contrasenya
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-96 p-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-500"
            required
          />
        </div>
        <div className="flex flex-col items-center justify-center">

          <button
            type="submit"
            className="w-36 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            REGISTRAR-SE
          </button>
        </div>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Ja tens compte?{' '}
        <Link to="/login" className="text-orange-600 hover:text-orange-700">
          Inicia sessió aquí
        </Link>
      </p>
    </div>
  </div>
);
}

export default Register;
