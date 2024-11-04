import React from 'react';
import { useParams } from 'react-router-dom';
import TareasComponent from './tareasComponente';

const TareasCurso = () => {
    const { cursoId } = useParams();
    return <TareasComponent fixedCursoId={cursoId} />;
};

export default TareasCurso;
