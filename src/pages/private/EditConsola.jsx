import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditConsola() {
  const [consolas, setConsolas] = useState([]);
  const [selectedConsola, setSelectedConsola] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    fabricant: "",
    descripcio: "",
    infoManteniment: "",
    URLapp: "",
    imatge: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsolas = async () => {
      try {
        const response = await fetch(
          "http://localhost/RepairIo/php/getAllConsolas.php"
        );
        const data = await response.json();
        if (data.status === "success") {
          setConsolas(data.data);
        }
      } catch (error) {
        console.error("Error fetching consoles:", error);
      }
    };
    fetchConsolas();
  }, []);

  useEffect(() => {
    if (selectedConsola) {
      const fetchConsolaDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost/RepairIo/php/getConsola.php?idConsola=${selectedConsola}`
          );
          const data = await response.json();
          if (data.status === "success") {
            setFormData(data.data);
          }
        } catch (error) {
          console.error("Error fetching console details:", error);
        }
      };
      fetchConsolaDetails();
    }
  }, [selectedConsola]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        alert("Error al cargar la imagen");
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePath("");
  };

  useEffect(() => {
    if (selectedConsola && formData.imatge) {
      setImagePath(
        `http://localhost/RepairIo/public/uploads/consolas/${formData.imatge}`
      );
    }
  }, [selectedConsola, formData.imatge]);

  const handleDelete = async () => {
    if (!selectedConsola) {
      alert("Siusplau, seleccioni una consola primer");
      return;
    }

    if (window.confirm("¿Estàs segur que vols eliminar aquesta consola?")) {
      try {
        const response = await fetch(
          "http://localhost/RepairIo/php/deleteConsola.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              idConsola: selectedConsola,
            }).toString(),
          }
        );

        const result = await response.json();

        if (result.status === "success") {
          //alert('Consola eliminada exitosament');
          const fetchConsolas = async () => {
            try {
              const response = await fetch(
                "http://localhost/RepairIo/php/getAllConsolas.php"
              );
              const data = await response.json();
              if (data.status === "success") {
                setConsolas(data.data);
                setSelectedConsola(null);
                setFormData({
                  nom: "",
                  fabricant: "",
                  descripcio: "",
                  infoManteniment: "",
                  URLapp: "",
                });
              }
            } catch (error) {
              console.error("Error refreshing consoles:", error);
            }
          };
          fetchConsolas();
        } else {
          alert(result.message || "Error en eliminar la consola");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al connectar-se amb el servidor");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedConsola) {
      alert("Siusplau, seleccioni una consola primer");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/RepairIo/php/updateConsola.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            idConsola: selectedConsola,
            ...formData,
          }).toString(),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        // alert('Consola actualizada exitosament');
        const fetchConsolas = async () => {
          try {
            const response = await fetch(
              "http://localhost/RepairIo/php/getAllConsolas.php"
            );
            const data = await response.json();
            if (data.status === "success") {
              setConsolas(data.data);
              setSelectedConsola(null);
              setFormData({
                nom: "",
                fabricant: "",
                descripcio: "",
                infoManteniment: "",
                URLapp: "",
              });
            }
          } catch (error) {
            console.error("Error refreshing consoles:", error);
          }
        };
        fetchConsolas();
      } else {
        alert(result.message || "Error al actualitzar la consola");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al connectar-se amb el servidor");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-10">
      <div className="bg-white border-2 border-black p-6 shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 border-b-4 border-black pb-3 pt-2 bg-orange-400 shadow-[3px_3px_0_#000]">
          Editar Consola
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Selecciona una consola</h2>
          <select
            value={selectedConsola || ""}
            onChange={(e) => setSelectedConsola(e.target.value)}
            className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[3px_3px_0_#000]"
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
          <form onSubmit={handleSubmit} className="space-y-5">
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
              <label className="block text-lg font-semibold mb-2">
                Fabricant
              </label>
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
              <label className="block text-lg font-semibold mb-2">
                Descripció
              </label>
              <textarea
                name="descripcio"
                value={formData.descripcio}
                onChange={handleChange}
                className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[3px_3px_0_#000]"
                required
                rows={4}
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                Informació de Manteniment
              </label>
              <textarea
                name="infoManteniment"
                value={formData.infoManteniment}
                onChange={handleChange}
                className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[3px_3px_0_#000]"
                required
                rows={4}
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
                      className="w-48 h-48 object-cover rounded-lg border-2 border-black shadow-[3px_3px_0_#000]"
                    />
                    <button
                      onClick={handleRemoveImage}
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition duration-200 shadow-[2px_2px_0_#000]"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="w-48 h-48 border-2 border-black rounded-lg flex items-center justify-center bg-orange-50 shadow-[3px_3px_0_#000]">
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
              <label className="block text-lg font-semibold mb-2">
                Imagen URL
              </label>
              <input
                type="text"
                name="imatge"
                value={formData.imatge}
                onChange={handleChange}
                className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[3px_3px_0_#000]"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                URL de l'App
              </label>
              <input
                type="text"
                name="URLapp"
                value={formData.URLapp}
                onChange={handleChange}
                className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[3px_3px_0_#000]"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition duration-200 shadow-[3px_3px_0_#000]"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 transition duration-200 shadow-[3px_3px_0_#000]"
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
