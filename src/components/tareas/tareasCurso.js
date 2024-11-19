import React from 'react';
import { useParams } from 'react-router-dom';
import TareasComponent from './tareasComponente';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TareasCurso = () => {
    const { cursoId } = useParams();

    return (
        <div>
            <Link to="/cursos">
                <Button variant="secondary" className="mx-2">Volver</Button>
            </Link>
            <TareasComponent fixedCursoId={cursoId} />
        </div>
    );
};

export default TareasCurso;
