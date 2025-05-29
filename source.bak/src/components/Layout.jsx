import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Layout({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = document.cookie.split(';').find(row => row.trim().startsWith('user='));
    
    const currentPath = location.pathname;
    
    if (currentPath === '/' || 
        currentPath === '/register' || 
        currentPath.startsWith('/consola/') || 
        currentPath.startsWith('/forum/')) {
      return; // Don't redirect if user is in public routes
    }

    if (cookie) {
      const cookieValue = cookie.split('=')[1];
      try {
        const userData = JSON.parse(decodeURIComponent(cookieValue));
        setIsAdmin(userData.rol === 1);
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-orange-400 text-black border-b-4 border-black shadow-[3px_3px_0_#000] p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">REPAIR.IO</h1>
        <nav className="flex gap-4">
          <Link
            to="/"
            className="bg-yellow-300 border-2 border-black px-3 py-1 font-bold shadow-[2px_2px_0_#000] hover:bg-yellow-200"
          >
            🏠 Home
          </Link>
          <Link
            to="/user"
            className="bg-yellow-300 border-2 border-black px-3 py-1 font-bold shadow-[2px_2px_0_#000] hover:bg-yellow-200"
          >
            👤 User
          </Link>
          {isAdmin && (
            <>
              <Link
                to="/createConsola"
                className="bg-yellow-300 border-2 border-black px-3 py-1 font-bold shadow-[2px_2px_0_#000] hover:bg-yellow-200"
              >
                🎮 Crear Consola
              </Link>
              <Link
                to="/editConsola"
                className="bg-yellow-300 border-2 border-black px-3 py-1 font-bold shadow-[2px_2px_0_#000] hover:bg-yellow-200"
              >
                🎮 Editar Consola
              </Link>
              <Link
                to="/createProblema"
                className="bg-yellow-300 border-2 border-black px-3 py-1 font-bold shadow-[2px_2px_0_#000] hover:bg-yellow-200"
              >
                🔧 Crear Problema
              </Link>
              <Link
                to="/editProblema"
                className="bg-yellow-300 border-2 border-black px-3 py-1 font-bold shadow-[2px_2px_0_#000] hover:bg-yellow-200"
              >
                🔧 Editar Problema
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}

export default Layout;
