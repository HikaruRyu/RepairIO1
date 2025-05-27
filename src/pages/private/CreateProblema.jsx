import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProblema = () => {
  const [consolas, setConsolas] = useState([]);
  const [formData, setFormData] = useState({
    descripcio: '',
    URLapp: '',
    idConsola: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchConsolas();
  }, []);

  const fetchConsolas = async () => {
    try {
      const response = await fetch('http://localhost/RepairIo/php/getAllConsolas.php');
      const data = await response.json();
      if (data.status === 'success') {
        setConsolas(data.data);
      } else {
        console.error('Error fetching consolas:', data.message);
      }
    } catch (error) {
      console.error('Error fetching consolas:', error);
      alert('Error al cargar las consolas. Por favor, intenta de nuevo.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.idConsola) {
      alert('Por favor, selecciona una consola');
      return;
    }

    try {
      const response = await fetch('http://localhost/RepairIo/php/createProblema.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Problema creado exitosamente');
        navigate('/editProblema');
      } else {
        console.error('Error creating problema:', data.error);
        alert('Error al crear el problema. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error creating problema:', error);
      alert('Error al crear el problema. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-10">
      <div className="bg-white border-2 border-black p-6 shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 border-b-4 border-black pb-3 pt-2 bg-orange-400 shadow-[3px_3px_0_#000]">
          Crear Nuevo Problema
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Descripción</label>
            <textarea
              className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[2px_2px_0_#000]"
              name="descripcio"
              value={formData.descripcio}
              onChange={handleChange}
              required
              rows="4"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">URL de la Aplicación</label>
            <input
              type="text"
              className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[3px_3px_0_#000]"
              name="URLapp"
              value={formData.URLapp}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Consola</label>
            <select
              className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[3px_3px_0_#000]"
              name="idConsola"
              value={formData.idConsola}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una consola</option>
              {consolas.map(consola => (
                <option key={consola.idConsola} value={consola.idConsola}>
                  {consola.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 shadow-[2px_2px_0_#000]"
            >
              Crear Problema
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProblema;
