import React from "react";
import { Link } from "react-router-dom";

function ConsolaCard({ nombre, descripcion, imagen }) {
  return (
    <div className="p-4 bg-orange-200 border-2 border-black shadow-[4px_4px_0_#000]">
      <div className="flex items-center">
        <img src={imagen} alt={nombre} className="w-16 h-22" />
        <div className="ml-4 flex-1">
          <p className="font-bold text-lg">{nombre}</p>
          <p className="text-sm">{descripcion}</p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Link
          to={`/consola/${encodeURIComponent(nombre)}`}
          className="bg-yellow-400 border-2 border-black px-3 py-1 ml-2 font-bold shadow-[2px_2px_0_#000] hover:bg-yellow-300"
        >
          REPARAR
        </Link>
      </div>
    </div>
  );
}

export default ConsolaCard;
