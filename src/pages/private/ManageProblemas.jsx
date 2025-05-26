import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
      const response = await fetch('/php/getAllProblemas.php');
      const data = await response.json();
      setProblemas(data);
    } catch (error) {
      console.error('Error fetching problemas:', error);
    }
  };

  const handleEdit = (problema) => {
    setSelectedProblema(problema);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este problema?')) {
      try {
        const response = await fetch(`/php/deleteProblema.php?id=${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchProblemas();
        } else {
          console.error('Error deleting problema');
        }
      } catch (error) {
        console.error('Error deleting problema:', error);
      }
    }
  };

  const handleUpdate = async () => {
    if (!selectedProblema) return;

    try {
      const response = await fetch('/php/editProblema.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedProblema)
      });
      if (response.ok) {
        setEditing(false);
        setSelectedProblema(null);
        fetchProblemas();
      } else {
        console.error('Error updating problema');
      }
    } catch (error) {
      console.error('Error updating problema:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Problemas</h2>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/createProblema')}
        >
          Crear Nuevo Problema
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>URL Aplicación</th>
              <th>Consola</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {problemas.map(problema => (
              <tr key={problema.idProblema}>
                <td>{problema.idProblema}</td>
                <td>{problema.descripcio}</td>
                <td>{problema.URLapp}</td>
                <td>{problema.consola_nom}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(problema)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(problema.idProblema)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editing && selectedProblema && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Problema</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setEditing(false);
                    setSelectedProblema(null);
                  }}
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    value={selectedProblema.descripcio}
                    onChange={(e) => 
                      setSelectedProblema(prev => ({
                        ...prev,
                        descripcio: e.target.value
                      }))}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">URL Aplicación</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedProblema.URLapp}
                    onChange={(e) => 
                      setSelectedProblema(prev => ({
                        ...prev,
                        URLapp: e.target.value
                      }))}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditing(false);
                    setSelectedProblema(null);
                  }}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProblemas;
