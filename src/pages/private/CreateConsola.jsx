import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateConsola() {
  const [formData, setFormData] = useState({
    nom: '',
    fabricant: '',
    descripcio: '',
    infoManteniment: '',
    URLapp: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePath, setImagePath] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePath(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert('Por favor, seleccione una imagen');
      return;
    }

    try {
      const formDataImage = new FormData();
      formDataImage.append('file', selectedImage);
      
      const imageResponse = await fetch('http://localhost/RepairIo/php/uploadImage.php', {
        method: 'POST',
        body: formDataImage
      });
      
      const imageResult = await imageResponse.json();
      
      if (imageResult.status === 'success') {
        const formDataConsola = new FormData();
        formDataConsola.append('nom', formData.nom);
        formDataConsola.append('fabricant', formData.fabricant);
        formDataConsola.append('descripcio', formData.descripcio);
        formDataConsola.append('infoManteniment', formData.infoManteniment);
        formDataConsola.append('URLapp', formData.URLapp);
        formDataConsola.append('imatge', imageResult.path);
        
        const response = await fetch('http://localhost/RepairIo/php/createConsola.php', {
          method: 'POST',
          body: formDataConsola
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
          alert('Consola creada exitosamente');
          navigate('/consola/' + formData.nom);
        } else {
          alert(result.message || 'Error al crear la consola');
        }
      } else {
        alert(imageResult.message || 'Error al subir la imagen');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="min-h-screen bg-orange-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-xl w-full">
        <h2 className="text-4xl font-bold text-orange-600 text-center mb-8">
          Crear Consola
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5" enctype="multipart/form-data">
          <div>
            <label className="block text-orange-700 font-semibold mb-1">Nombre</label>
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
            <label className="block text-orange-700 font-semibold mb-1">Fabricante</label>
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
            <label className="block text-orange-700 font-semibold mb-1">Descripción</label>
            <textarea
              name="descripcio"
              value={formData.descripcio}
              onChange={handleChange}
              className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 h-24"
              required
            />
          </div>

          <div>
            <label className="block text-orange-700 font-semibold mb-1">Información de Mantenimiento</label>
            <textarea
              name="infoManteniment"
              value={formData.infoManteniment}
              onChange={handleChange}
              className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 h-24"
              required
            />
          </div>

          <div>
            <label className="block text-orange-700 font-semibold mb-1">Imagen</label>
            <div className="flex flex-col gap-2">
              {imagePath && (
                <img 
                  src={`http://localhost/RepairIo/public/uploads/consolas/${imagePath}`} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-orange-700 font-semibold mb-1">URL de la App</label>
            <input
              type="url"
              name="URLapp"
              value={formData.URLapp}
              onChange={handleChange}
              className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition duration-200"
            >
              Crear Consola
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateConsola;
