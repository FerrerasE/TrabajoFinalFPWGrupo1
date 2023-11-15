import React, { useState } from 'react';

function Notas() {
  const [notas, setNotas] = useState([]);
  const [nuevaNota, setNuevaNota] = useState({
    nombre: '',
    descripcion: '',
    valoracion: 0,
    estado: 'Verdadero',
  });

  const [mostrarTiposDeNota, setMostrarTiposDeNota] = useState(false);

  const alternarTiposDeNota = () => {
    setMostrarTiposDeNota(!mostrarTiposDeNota);
  };

  const agregarNota = () => {
    if (!nuevaNota.nombre.trim()) return;

    setNotas([...notas, nuevaNota]);
    setNuevaNota({
      nombre: '',
      descripcion: '',
      valoracion: 0,
      estado: 'Verdadero',
    });
  };

  const eliminarNota = (index) => {
    const nuevasNotas = [...notas];
    nuevasNotas.splice(index, 1);
    setNotas(nuevasNotas);
  };

  return (
    <div>
      <h2>Mis notas</h2>

      <input
        type="text"
        placeholder="Nombre de la nota"
        value={nuevaNota.nombre}
        onChange={(e) => setNuevaNota({ ...nuevaNota, nombre: e.target.value })}
      />
      <button onClick={agregarNota}>Agregar nueva nota</button>

      <ul>
        {notas.map((nota, index) => (
          <li key={index}>
            <h3>{nota.nombre}</h3>
            <p>Descripción: {nota.descripcion}</p>
            <p>Valoración: {nota.valoracion}</p>
            <p>Estado: {nota.estado}</p>
            <button onClick={() => eliminarNota(index)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notas;