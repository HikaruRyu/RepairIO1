import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from "../../js/client"; 

const FormResponses = () => {
  const { email } = useParams(); 
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/dataForms.php`, {
      credentials: 'include', 
    })
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => item.email === email);
        setResponses(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [email]); 

  if (loading) {
    return <div className="text-center text-lg text-gatsby-gold-600">Cargando...</div>;
  }

  return (
    <div className="bg-gatsby-night-800 min-h-[73vh] py-12 px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl lg:text-4xl font-serif text-gatsby-gold-600 tracking-wide text-center mb-8">
          Resum d'Informació dels Convidats
        </h1>
        
        <h2 className="text-2xl text-center text-gatsby-gold-400 mb-6 font-serif">{email}</h2>

        <div className=" mb-8">
          <Link to="/form-information" className="text-xl font-serif text-gatsby-gold-400 hover:text-gatsby-pearl-500">
            ← Tornar a la llista d'assistents
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {responses.map((response) => (
            <div key={response.id} className="bg-gatsby-pearl-500 font-mono p-8 rounded-lg shadow-lg border-l-4 border-gatsby-gold-400">
              <h3 className="text-2xl font-semibold text-gatsby-night-600 mb-4">{response.name} {response.surname}</h3>
              <p className="text-lg mb-2"><span className="font-semibold text-gatsby-night-600">Telèfon:</span> {response.phone}</p>
              <p className="text-lg mb-2"><span className="font-semibold text-gatsby-night-600">Email:</span> {response.email}</p>
              <p className="text-lg mb-2"><span className="font-semibold text-gatsby-night-600">Menor:</span> {response.child === 1 ? "Sí" : "No"}</p>
              <p className="text-lg mb-2"><span className="font-semibold text-gatsby-night-600">Menu:</span> {response.menu}</p>
              <p className="text-lg mb-2"><span className="font-semibold text-gatsby-night-600">Al·lèrgies:</span> {response.allergies}</p>
              <p className="text-lg"><span className="font-semibold text-gatsby-night-600">Cançó:</span> {response.song}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormResponses;
