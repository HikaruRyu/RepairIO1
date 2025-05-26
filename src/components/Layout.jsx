import React from "react";
import { Link } from "react-router-dom";

function Layout({ children }) {
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
            to="/login"
            className="bg-yellow-300 border-2 border-black px-3 py-1 font-bold shadow-[2px_2px_0_#000] hover:bg-yellow-200"
          >
            👤 Login / Register
          </Link>
        </nav>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}

export default Layout;
