import React, { useState } from 'react';
import './Note.css';

function Note() {
  const [notas, setNotas] = useState([]);
  const [nuevaNota, setNuevaNota] = useState({
    titulo: '',
    descripcion: '',
    estado: 'Inicio',
  });

  const agregarNota = () => {
    if (!nuevaNota.titulo.trim() || !nuevaNota.descripcion.trim()) return;

    setNotas([...notas, nuevaNota]);
    setNuevaNota({
      titulo: '',
      descripcion: '',
      estado: 'Inicio',
    });
  };

  const moverNota = (index, nuevoEstado) => {
    const nuevasNotas = [...notas];
    nuevasNotas[index].estado = nuevoEstado;
    setNotas(nuevasNotas);
  };

  const eliminarNota = (index) => {
    const nuevasNotas = [...notas];
    nuevasNotas.splice(index, 1);
    setNotas(nuevasNotas);
  };

  return (
    <div className="note-container">
      <input
        className="note-input"
        type="text"
        placeholder="Título de la nota"
        value={nuevaNota.titulo}
        onChange={(e) => setNuevaNota({ ...nuevaNota, titulo: e.target.value })}
      />
      <textarea
        className="note-input"
        placeholder="Descripción de la nota"
        value={nuevaNota.descripcion}
        onChange={(e) => setNuevaNota({ ...nuevaNota, descripcion: e.target.value })}
      />
      <button className="note-button" onClick={agregarNota}>Agregar nueva nota</button>

      {['Inicio', 'En proceso', 'Resuelto'].map((estado) => (
        <div key={estado} className="note-category">
          <h3>{`Notas ${estado}`}</h3>
          <ul>
            {notas.map((nota, index) => (
              nota.estado === estado && (
                <li key={index} className="note-item">
                  <h4>{nota.titulo}</h4>
                  <p>{nota.descripcion}</p>
                  {estado !== 'Resuelto' && (
                    <button className="note-button" onClick={() => moverNota(index, estado === 'Inicio' ? 'En proceso' : 'Resuelto')}>
                      {estado === 'Inicio' ? 'En proceso' : 'Resuelto'}
                    </button>
                  )}
                  <button className="note-button" onClick={() => eliminarNota(index)}>Borrar</button>
                </li>
              )
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}


export default Note;