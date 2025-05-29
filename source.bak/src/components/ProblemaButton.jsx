import React from 'react';
import { Link } from 'react-router-dom';

function ProblemaButton({ problema, nombreConsola }) {
  return (
    <Link 
      to={`/consola/${encodeURIComponent(nombreConsola)}/problema/${problema.idProblema}`}
      className="block p-2 bg-green-400 border-2 border-black text-white hover:bg-green-300 mb-2"
    >
      {problema.titol}
    </Link>
  );
}

export default ProblemaButton;
