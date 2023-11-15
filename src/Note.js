import React, { useState } from 'react';
import './Note.css';

function Note() {
    const [notas, setNotas] = useState([]);
    const [nuevaNota, setNuevaNota] = useState({
        titulo: '',
        descripcion: '',
        estado: '',
    });

    const agregarNota = () => {
        console.log("Estado actual:", nuevaNota.estado);
        if (!nuevaNota.titulo.trim() || !nuevaNota.descripcion.trim() || nuevaNota.estado === 'Falso') {
            return;
        }
    
        setNotas([...notas, nuevaNota]);
        setNuevaNota({
            titulo: '',
            descripcion: '',
            estado: '',
        });
    };
    
    
    
    

    const cambiarEstado = (index, nuevoEstado) => {
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
            <label>
                Estado:
                <select
                    className="note-input"
                    value={nuevaNota.estado}
                    onChange={(e) => setNuevaNota({ ...nuevaNota, estado: e.target.value })}
                >

                    <option value="Verdadero">Verdadero</option>
                    <option value="Falso">Falso</option>
                </select>
            </label>
            <button className="note-button" onClick={agregarNota}>Agregar nueva nota</button>

            {['Inicio', 'En proceso', 'Resuelto', ].map((estado) => (
                <div key={estado} className="note-category">
                    <h3>{`Notas ${estado}`}</h3>
                    <ul>
                        {notas.map((nota, index) => (
                            nota.estado === estado && (
                                <li key={index} className="note-item">
                                    <h4>{nota.titulo}</h4>
                                    <p>{nota.descripcion}</p>
                                    <button className="note-button" onClick={() => cambiarEstado(index, estado)}>
                                        {estado === 'Inicio' ? 'En proceso' : estado === 'En proceso' ? 'Resuelto' : 'Falso'}
                                    </button>
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
