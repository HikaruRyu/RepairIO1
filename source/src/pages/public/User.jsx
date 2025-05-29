import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function User() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    contrasenya: '',
    rol: false
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const cookie = document.cookie.split(';').find(row => row.trim().startsWith('user='));
    if (!cookie) {
      navigate('/login');
      return;
    }

    const cookieValue = cookie.split('=')[1];
    const userData = JSON.parse(decodeURIComponent(cookieValue));
    
    setUser(userData);
    setFormData({
      nom: userData.nom,
      email: userData.email,
      contrasenya: '', 
      rol: userData.rol
    });
    setLoading(false);
  }, [navigate]);

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
      const cookie = document.cookie.split(';').find(row => row.trim().startsWith('user='));
      if (!cookie) {
       alert("Error: No s'ha pogut obtenir l'ID de l'usuari");
        return;
      }
      const cookieValue = cookie.split('=')[1];
      const userData = JSON.parse(decodeURIComponent(cookieValue));

      const updateData = {
        idUser: userData.idUser,
        name: formData.nom,
        email: formData.email,
        contrasenya: formData.contrasenya,
        rol: formData.rol
      };

      const response = await fetch('http://localhost:8081/updateUser.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        //alert('Informació actualizada exitosament');
        setEditing(false);
        document.cookie = `user=${encodeURIComponent(JSON.stringify({
          idUser: userData.idUser,
          nom: formData.nom,
          email: formData.email,
          rol: formData.rol
        }))}; path=/; max-age=3600`;
      } else {
        alert("Error a l'actualizar la informació: " + (data.message || "Error desconegut"));
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error al conectar amb el servidor: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-orange-500">Carregant informació ...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-red-600 font-bold mt-10">
        Error: Usuari no trobat
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-10">
      <div className="bg-white border-2 border-black p-6 shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 border-b-4 border-black pb-3 pt-2 bg-orange-400 shadow-[3px_3px_0_#000]">
          El Meu Perfil
        </h1>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-orange-700 font-semibold mb-1">Nom</label>
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
              <label className="block text-orange-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block text-orange-700 font-semibold mb-1">Contransenya</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="contrasenya"
                  value={formData.contrasenya}
                  onChange={handleChange}
                  className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-600"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-orange-700 font-semibold mb-1">Rol</label>
              <select
                name="rol"
                value={formData.rol ? '1' : '0'}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  rol: e.target.value === '1'
                }))}
                className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="0">Usuari Normal</option>
                <option value="1">Administrador</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-400 border-2 border-black px-4 py-2 rounded-lg hover:bg-gray-300 shadow-[2px_2px_0_#000]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 shadow-[2px_2px_0_#000]"
              >
                Guardar Canvis
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">Nom:</p>
                <p className="text-gray-700">{user.nom}</p>
              </div>
              <button
                onClick={() => setEditing(true)}
                className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 shadow-[2px_2px_0_#000]"
              >
                Editar
              </button>
            </div>

            <div className="mt-4">
              <p className="text-lg font-semibold">Email:</p>
              <p className="text-gray-700">{user.email}</p>

              <div className="mt-4">
                <p className="text-lg font-semibold">Rol:</p>
                <p className="text-gray-700">{user.rol ? 'Administrador' : 'Usuario Normal'}</p>
              </div>
              
            </div>

                      <button
            onClick={() => {
              fetch('http://localhost:8081/logout.php', {
                method: 'GET',
                credentials: 'include'
              }).then(() => {
                navigate('/');
              });
            }}
            className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 shadow-[2px_2px_0_#000]"
          >
            Tancar Sessió
          </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
