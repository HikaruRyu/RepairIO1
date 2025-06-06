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
  const [isUploading, setIsUploading] = useState(false);

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
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePath(event.target.result);
        setIsUploading(false);
      };
      reader.onerror = () => {
        setIsUploading(false);
        alert('Error al cargar la imagen');
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePath('');
    e.target.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert('Siusplau, trii una imatge');
      return;
    }

    try {
      const formDataImage = new FormData();
      formDataImage.append('file', selectedImage);
      
      const imageResponse = await fetch('http://localhost:8081/uploadImage.php', {
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
        
        const response = await fetch('http://localhost:8081/createConsola.php', {
          method: 'POST',
          body: formDataConsola
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
         // alert('Consola creada exitosament');
          navigate('/consola/' + formData.nom);
        } else {
          alert(result.message || 'Error al crear la consola');
        }
      } else {
        alert(imageResult.message || 'Error al pujar la imatge');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar amb el servidor');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-10">
      <div className="bg-white border-2 border-black p-6 shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 border-b-4 border-black pb-3 pt-2 bg-orange-400 shadow-[3px_3px_0_#000]">
          Crear Consola
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5" enctype="multipart/form-data">
          <div>
            <label className="block text-lg font-semibold mb-2">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[3px_3px_0_#000]"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Fabricant</label>
            <input
              type="text"
              name="fabricant"
              value={formData.fabricant}
              onChange={handleChange}
              className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[3px_3px_0_#000]"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Descripció</label>
            <textarea
              name="descripcio"
              value={formData.descripcio}
              onChange={handleChange}
              className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[3px_3px_0_#000]"
              required
              rows="4"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Informació de Manteniment</label>
            <textarea
              name="infoManteniment"
              value={formData.infoManteniment}
              onChange={handleChange}
              className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[3px_3px_0_#000]"
              required
              rows="4"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Imatge</label>
            <div className="flex flex-col space-y-2">
              {imagePath ? (
                <div className="relative">
                  <img 
                    src={imagePath} 
                    alt="Vista previa" 
                    className="w-48 h-48 object-cover rounded-lg border-2 border-orange-300"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition duration-200"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-48 h-48 border-2 border-orange-300 rounded-lg flex items-center justify-center">
                  {isUploading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                  ) : (
                    <p className="text-gray-500">Seleccioni una imatge</p>
                  )}
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[3px_3px_0_#000]"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">URL de la App</label>
            <input
              type="text"
              name="URLapp"
              value={formData.URLapp}
              onChange={handleChange}
              className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[3px_3px_0_#000]"
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
