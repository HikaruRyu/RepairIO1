import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ProblemaButton from "../../components/ProblemaButton";

function Consola() {
  const { nombre } = useParams();
  const [consola, setConsola] = useState(null);
  const [loading, setLoading] = useState(true);
  const [problemas, setProblemas] = useState([]);

  useEffect(() => {
    const fetchConsola = async () => {
      try {
        const response = await fetch(`http://localhost:8081/getConsoles.php`);
        const data = await response.json();
        const foundConsola = data.find(c => c.nom === decodeURIComponent(nombre));
        setConsola(foundConsola);

        if (foundConsola) {
          const problemsResponse = await fetch(`http://localhost:8081/getProblems.php?idConsola=${foundConsola.idConsola}`);
          const problems = await problemsResponse.json();
          setProblemas(problems);
        }
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
    <div className="min-h-screen bg-orange-50 flex">
      <div className="w-1/4 bg-white border-r-2 border-black p-4">
        <h2 className="text-xl font-bold mb-4">Problemes</h2>
        <div className="space-y-2">
          {problemas.map((problema) => (
            <ProblemaButton 
              key={problema.idProblema} 
              problema={problema} 
              nombreConsola={nombre}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 p-6 bg-white border-2 border-black shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">
          {consola.nom}
        </h1>
        <img
          src={`http://localhost:5173/public/uploads/consolas/${consola.imatge}`}
          alt={consola.nom}
          className="mx-auto w-48 h-48 mb-4"
        />
        <p className="text-gray-800 text-lg text-center">
          {consola.descripcio}
        </p>
        <p className="mt-4 text-center text-sm text-gray-500">
          Aquí podríem mostrar un tutorial, passos de reparació o eines necessàries.
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
        <iframe className='iframe-container' style={{
            width: "100%",
    minHeight: "700px"
  }}
     src={'http://localhost:8082/index'}></iframe>
      </div>
    </div>
  );
}

export default Consola;
