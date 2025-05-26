import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Consola() {
  const { nombre } = useParams();
  const [consola, setConsola] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsola = async () => {
      try {
        const response = await fetch(`http://localhost/RepairIo/php/getConsoles.php`);
        const data = await response.json();
        const foundConsola = data.find(c => c.nom === decodeURIComponent(nombre));
        setConsola(foundConsola);
      } catch (error) {
        console.error('Error fetching consola:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsola();
  }, [nombre]);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-orange-500">Carregant consola...</p>
        </div>
      </div>
    );
  }

  if (!consola) {
    return (
      <div className="text-center text-red-600 font-bold mt-10">
        Consola no trobada.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-10">
      <div className="bg-white border-2 border-black p-6 shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-4">
          {consola.nom}
        </h1>
        <img
          src={`http://localhost/RepairIo/public/uploads/consolas/${consola.imatge}`}
          alt={consola.nom}
          className="mx-auto w-48 h-48 mb-4"
        />
        <p className="text-gray-800 text-lg text-center">
          {consola.descripcio}
        </p>
        <p className="mt-4 text-center text-sm text-gray-500">
          Aquí podrías mostrar un tutorial, pasos de reparación o piezas
          necesarias.
        </p>
        <div className="mt-4 text-center text-sm text-gray-500">
          Fabricant: {consola.fabricant}
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          Informació de manteniment: {consola.infoManteniment}
        </div>
        <div className="mt-4 text-center">
          <Link
            to={`/forum/${encodeURIComponent(nombre)}`}
            className="bg-green-400 border-2 border-black px-3 py-1 ml-2 font-bold shadow-[2px_2px_0_#000] hover:bg-green-300"
          >
            FÒRUM
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Consola;
