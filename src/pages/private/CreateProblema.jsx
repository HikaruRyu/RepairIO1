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
      const response = await fetch('/php/getAllConsolas.php');
      const data = await response.json();
      setConsolas(data);
    } catch (error) {
      console.error('Error fetching consolas:', error);
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
    try {
      const response = await fetch('/php/createProblema.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        navigate('/editProblema');
      } else {
        console.error('Error creating problema');
      }
    } catch (error) {
      console.error('Error creating problema:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear Nuevo Problema</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="descripcio" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="descripcio"
            name="descripcio"
            value={formData.descripcio}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="URLapp" className="form-label">URL de la Aplicación</label>
          <input
            type="text"
            className="form-control"
            id="URLapp"
            name="URLapp"
            value={formData.URLapp}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="idConsola" className="form-label">Consola</label>
          <select
            className="form-select"
            id="idConsola"
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

        <button type="submit" className="btn btn-primary">Crear Problema</button>
      </form>
    </div>
  );
};

export default CreateProblema;
