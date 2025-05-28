import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EditConsola() {
  const [consolas, setConsolas] = useState([]);
  const [selectedConsola, setSelectedConsola] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    fabricant: '',
    descripcio: '',
    infoManteniment: '',
    URLapp: '',
    imatge: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsolas = async () => {
      try {
        const response = await fetch('http://localhost/RepairIo/php/getAllConsolas.php');
        const data = await response.json();
        if (data.status === 'success') {
          setConsolas(data.data);
        }
      } catch (error) {
        console.error('Error fetching consoles:', error);
      }
    };
    fetchConsolas();
  }, []);

  useEffect(() => {
    if (selectedConsola) {
      const fetchConsolaDetails = async () => {
        try {
          const response = await fetch(`http://localhost/RepairIo/php/getConsola.php?idConsola=${selectedConsola}`);
          const data = await response.json();
          if (data.status === 'success') {
            setFormData(data.data);
          }
        } catch (error) {
          console.error('Error fetching console details:', error);
        }
      };
      fetchConsolaDetails();
    }
  }, [selectedConsola]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDelete = async () => {
    if (!selectedConsola) {
      alert('Siusplau, seleccioni una consola primer');
      return;
    }

    if (window.confirm('¿Estás seguro de que quieres eliminar esta consola?')) {
      try {
        const response = await fetch('http://localhost/RepairIo/php/deleteConsola.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            idConsola: selectedConsola
          }).toString()
        });

        const result = await response.json();

        if (result.status === 'success') {
          //alert('Consola eliminada exitosament');
          const fetchConsolas = async () => {
            try {
              const response = await fetch('http://localhost/RepairIo/php/getAllConsolas.php');
              const data = await response.json();
              if (data.status === 'success') {
                setConsolas(data.data);
                setSelectedConsola(null);
                setFormData({
                  nom: '',
                  fabricant: '',
                  descripcio: '',
                  infoManteniment: '',
                  URLapp: ''
                });
              }
            } catch (error) {
              console.error('Error refreshing consoles:', error);
            }
          };
          fetchConsolas();
        } else {
          alert(result.message || 'Error en eliminar la consola');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar amb el servidor');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedConsola) {
      alert('Siusplau, seleccioni una consola primer');
      return;
    }

    try {
      const response = await fetch('http://localhost/RepairIo/php/updateConsola.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          idConsola: selectedConsola,
          ...formData
        }).toString()
      });

      const result = await response.json();

      if (result.status === 'success') {
       // alert('Consola actualizada exitosament');
        const fetchConsolas = async () => {
          try {
            const response = await fetch('http://localhost/RepairIo/php/getAllConsolas.php');
            const data = await response.json();
            if (data.status === 'success') {
              setConsolas(data.data);
              setSelectedConsola(null);
              setFormData({
                nom: '',
                fabricant: '',
                descripcio: '',
                infoManteniment: '',
                URLapp: ''
              });
            }
          } catch (error) {
            console.error('Error refreshing consoles:', error);
          }
        };
        fetchConsolas();
      } else {
        alert(result.message || 'Error al actualizar la consola');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar-se amb el servidor');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-10">
      <div className="bg-white border-2 border-black p-6 shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6">Editar Consola</h1>

        {/* Console Selection Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Selecciona una consola</h2>
          <select
            value={selectedConsola || ''}
            onChange={(e) => setSelectedConsola(e.target.value)}
            className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Selecciona una consola...</option>
            {consolas.map((consola) => (
              <option key={consola.idConsola} value={consola.idConsola}>
                {consola.nom}
              </option>
            ))}
          </select>
        </div>

        {selectedConsola && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fabricante
              </label>
              <input
                type="text"
                name="fabricant"
                value={formData.fabricant}
                onChange={handleChange}
                className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcio"
                value={formData.descripcio}
                onChange={handleChange}
                className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Información de Mantenimiento
              </label>
              <textarea
                name="infoManteniment"
                value={formData.infoManteniment}
                onChange={handleChange}
                className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de la App
              </label>
              <input
                type="text"
                name="URLapp"
                value={formData.URLapp}
                onChange={handleChange}
                className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen URL
              </label>
              <input
                type="text"
                name="imatge"
                value={formData.imatge}
                onChange={handleChange}
                className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition duration-200"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Eliminar Consola
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditConsola;