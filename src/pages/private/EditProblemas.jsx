import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManageProblemas = () => {
  const [problemas, setProblemas] = useState([]);
  const [selectedProblema, setSelectedProblema] = useState(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProblemas();
  }, []);

  const fetchProblemas = async () => {
    try {
      const response = await fetch(
        "http://localhost/RepairIo/php/getAllProblemas.php"
      );
      const data = await response.json();
      setProblemas(data);
    } catch (error) {
      console.error("Error fetching problemas:", error);
    }
  };

  const handleEdit = (problema) => {
    setSelectedProblema(problema);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Estàs segur que vols eliminar aquest problema?")
    ) {
      try {
        const response = await fetch(
          `http://localhost/RepairIo/php/deleteProblema.php?id=${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          fetchProblemas();
        } else {
          console.error("Error deleting problema");
        }
      } catch (error) {
        console.error("Error deleting problema:", error);
      }
    }
  };

  const handleUpdate = async () => {
    if (!selectedProblema) return;

    try {
      const response = await fetch(
        "http://localhost/RepairIo/php/editProblema.php",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedProblema),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setEditing(false);
        setSelectedProblema(null);
        fetchProblemas();
        alert("Canvis guardats correctament");
      } else {
        console.error(
          "Error updating problema:",
          data.error || "Error al actualizar el problema"
        );
        alert("Error al guardar els canvis. Si us plau, intenta-ho de nou.");
      }
    } catch (error) {
      console.error("Error updating problema:", error);
      alert("Error al connectar amb el servidor. Si us plau, intenta-ho de nou.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestió de Problemes</h2>
        <div className="flex justify-end mb-4">
          <button
            className="bg-orange-500 text-white font-semibold px-3 py-1 rounded-lg hover:bg-orange-600 shadow-[2px_2px_0_#000]"
            onClick={() => navigate("/createProblema")}
          >
            Crear Nou Problema
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left font-bold py-2">Problema</th>
                <th className="text-left font-bold py-2">Descripció</th>
                <th className="text-left font-bold py-2">URL de l'Aplicació</th>
                <th className="text-left font-bold py-2">Consola</th>
                <th className="text-left font-bold py-2">Accions</th>
              </tr>
            </thead>
            <tbody>
              {problemas.map((problema) => (
                <tr key={problema.idProblema} className="border-b border-black">
                  <td className="py-2">{problema.titol}</td>
                  <td className="py-2">{problema.descripcio}</td>
                  <td className="py-2">{problema.URLapp}</td>
                  <td className="py-2">{problema.consola_nom}</td>
                  <td className="py-2">
                    <button
                      onClick={() => handleEdit(problema)}
                      className="bg-orange-500 text-white font-semibold px-3 py-1 rounded-lg hover:bg-orange-600 shadow-[2px_2px_0_#000] mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(problema.idProblema)}
                      className="bg-red-500 text-white font-semibold px-3 py-1 rounded-lg hover:bg-red-600 shadow-[2px_2px_0_#000]"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editing && selectedProblema && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">
              Editar Problema
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Títol
                </label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[3px_3px_0_#000]"
                  name="titol"
                  value={selectedProblema.titol}
                  onChange={(e) =>
                    setSelectedProblema({
                      ...selectedProblema,
                      titol: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">
                  Descripció
                </label>
                <textarea
                  className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[3px_3px_0_#000]"
                  name="descripcio"
                  value={selectedProblema.descripcio}
                  onChange={(e) =>
                    setSelectedProblema({
                      ...selectedProblema,
                      descripcio: e.target.value,
                    })
                  }
                  required
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">
                  URL de l'Aplicació
                </label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 shadow-[3px_3px_0_#000]"
                  name="URLapp"
                  value={selectedProblema.URLapp}
                  onChange={(e) =>
                    setSelectedProblema({
                      ...selectedProblema,
                      URLapp: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="bg-gray-400 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 shadow-[2px_2px_0_#000]"
                >
                  Cancel·lar
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 shadow-[2px_2px_0_#000]"
                >
                  Desar Canvis
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProblemas;
