import React, { useState, useEffect } from "react";
import woodBackground from "/woodBack.jpg";
import ConsolaCard from "../../components/ConsolaCard"; 

function Home() {
  const [consoles, setConsoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsoles = async () => {
      try {
        const response = await fetch('http://localhost:8081/getConsoles.php',{
          headers:{
            'Content-Type':'application/json'
          }
        });

        const data = await response.json();
        console.log('Response data:', data);
        if (data.error) {
          console.error('Server error:', data.error);
          setConsoles([]);
        } else {
          setConsoles(data);
        }
      } catch (error) {
        console.error('Error fetching consoles:', error);
        setConsoles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConsoles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cover bg-center flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-orange-500">Carregant consoles...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-start p-8"
      style={{ backgroundImage: `url(${woodBackground})` }}
    >
      <div className="w-full max-w-4xl bg-orange-300 border-4 border-black p-6 shadow-[6px_6px_0_#000]">
        <h1 className="text-3xl font-bold text-center mb-8 border-b-4 border-black pb-3 pt-2 bg-orange-400 shadow-[3px_3px_0_#000]">
          CATÀLEG DE CONSOLES
        </h1>

        <div className="mb-8 text-center">
          <p className="text-xl font-bold mb-2">
            Benvingut a la nostra web on aprendràs a reparar consoles!
          </p>
          <p className="text-base">
            Repair.io és una plataforma dedicada a la reparació de consoles de videojocs. Aquí trobaràs una àmplia gamma de consoles, juntament amb informació detallada sobre cada model i les seves característiques. La nostra missió és ajudar-te a aprendre a reparar consoles i a mantenir-les en bon estat per gaudir dels teus videojocs preferits durant més temps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {consoles.map((consola) => (
            <ConsolaCard
              key={consola.idConsola}
              nombre={consola.nom}
              descripcion={consola.descripcio}
              imagen={`http://localhost:5173/public/uploads/consolas/${consola.imatge}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
