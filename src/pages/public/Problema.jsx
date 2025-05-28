import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Problema() {
  const { nombre, idProblema } = useParams();
  const [problema, setProblema] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblema = async () => {
      try {
        const response = await fetch(`http://localhost/RepairIo/php/getProblemaById.php?idProblema=${idProblema}`);
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setProblema(data);
      } catch (error) {
        console.error('Error fetching problema:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblema();
  }, [idProblema]);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-orange-500">Caregant problema...</p>
        </div>
      </div>
    );
  }

  if (!problema) {
    return (
      <div className="text-center text-red-600 font-bold mt-10">
        Problema no encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 flex">
      <div className="w-1/4 bg-white border-r-2 border-black p-4">
        <h2 className="text-xl font-bold mb-4">Problemes</h2>
        <div className="space-y-2">
          <Link 
            to={`/consola/${encodeURIComponent(nombre)}`} 
            className="block p-2 bg-green-400 border-2 border-black text-white hover:bg-green-300"
          >
            Tornar a la consola
          </Link>
        </div>
      </div>
      <div className="flex-1 p-6 bg-white border-2 border-black shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{problema.titol}</h1>
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Detalls del Problema</h2>
          <p className="text-gray-800 text-lg mb-4">
            {problema.descripcio}
          </p>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">URL de l'Aplicació</h3>
            <p className="text-gray-800 text-lg">
              <a href={problema.URLapp} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                {problema.URLapp}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Problema;
