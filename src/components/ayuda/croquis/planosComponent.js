import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Form } from 'react-bootstrap';
import salonesBase from '../../../images/croquis/salones/base.png';
import pabellonesBase from '../../../images/croquis/pabellones/basep.png';
import { apiRequest } from '../../general/comun';

const PlanosComponent = () => {
  const { paSa } = useParams();
  const [pabellonOverlay, setPabellonOverlay] = useState(null);
  const [salonOverlay, setSalonOverlay] = useState(null);
  const [horariosData, setHorariosData] = useState([]);
  const [filteredHorarios, setFilteredHorarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState(paSa || ''); // Usamos `paSa` como término de búsqueda si está presente
  const [selectedAula, setSelectedAula] = useState(paSa || null);

  const obtenerHorarios = useCallback(async () => {
    try {
      const data = await apiRequest({ endpoint: '/horarios/' });
      setHorariosData(data);
      // Filtrar automáticamente por `paSa` si está presente
      setFilteredHorarios(
        paSa ? data.filter((horario) => horario.aula.toLowerCase().includes(paSa.toLowerCase())) : data
      );
    } catch (error) {
      console.error('Error al obtener los horarios:', error);
    }
  }, [paSa]);

  useEffect(() => {
    obtenerHorarios();
  }, [obtenerHorarios]);

  useEffect(() => {
    if (selectedAula) {
      const [pabellon, salonCodigo] = selectedAula.split('-');
      const salonNumero = salonCodigo.slice(-2);

      import(`../../../images/croquis/pabellones/${pabellon}.png`)
        .then((module) => setPabellonOverlay(module.default))
        .catch(() => console.log(`Imagen de pabellón ${pabellon}.png no encontrada`));

      import(`../../../images/croquis/salones/${salonNumero}.png`)
        .then((module) => setSalonOverlay(module.default))
        .catch(() => console.log(`Imagen de salón ${salonNumero}.png no encontrada`));
    }
  }, [selectedAula]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredHorarios(
      horariosData.filter(
        (horario) =>
          horario.curso.toLowerCase().includes(term) ||
          horario.aula.toLowerCase().includes(term)
      )
    );
  };

  const renderSalonText = () => {
    if (selectedAula) {
      const [pabellon, salonCodigo] = selectedAula.split('-'); // Dividimos por el guión
      const piso = pabellon.slice(1); // Tomamos el número después de la P
      return `Piso ${piso}, Salón ${salonCodigo}`;
    }
    return 'Selecciona un curso en la leyenda para ver su ubicación';
  };

  const renderPabellonText = () => {
    if (selectedAula) {
      const [pabellon] = selectedAula.split('-');
      return `Pabellón ${pabellon}`;
    }
    return 'Selecciona un curso en la leyenda para ver su ubicación';
  };


  return (
    <div className="container my-4">
      <Row>
        <Col md={8}>
          <div className="bg-white rounded shadow p-4 position-relative" style={{ width: '100%', maxWidth: '700px' }}>
            <div className="mb-2 position-relative" style={{ textAlign: 'center' }}>
              <img src={salonesBase} alt="Base Superior" className="img-fluid rounded mx-auto d-block" style={{ width: '600px' }} />
              {salonOverlay && (
                <img src={salonOverlay} alt="Overlay Salón" className="overlay-image position-absolute top-50 start-50 translate-middle" style={{ width: '92%' }} />
              )}
            </div>
            <div>
              <p className="position-absolute text-center text-dark fw-bold" style={{ top: '0', width: '100%' }}>
                {renderSalonText()}
              </p>
            </div>
            <div className="position-relative" style={{ textAlign: 'center' }}>
              <img src={pabellonesBase} alt="Base Inferior" className="img-fluid rounded mx-auto d-block" style={{ width: '100%' }} />
              {pabellonOverlay && (
                <img src={pabellonOverlay} alt="Overlay Pabellón" className="overlay-image position-absolute top-50 start-50 translate-middle" style={{ width: '100%' }} />
              )}
            </div>
            <div>
              <p className="position-absolute text-center text-dark fw-bold mb-2" style={{ bottom: '0', width: '100%' }}>
                {renderPabellonText()}
              </p>
            </div>
          </div>
        </Col>

        <Col md={4}>
          <h3 className="text-center mb-4 mt-4">Seleccionar curso a buscar</h3>
          <Form.Control
            type="text"
            placeholder="Buscar curso o aula"
            value={searchTerm}
            onChange={handleSearch}
            className="mb-3"
          />
          <div
            className="list-group"
            style={{
              maxHeight: '400px',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {filteredHorarios.map((horario) => (
              <button
                key={horario.id}
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${selectedAula === horario.aula ? 'active' : ''}`}
                onClick={() => setSelectedAula(horario.aula)}
                style={{ backgroundColor: selectedAula === horario.aula ? horario.color : '#f8f9fa', color: selectedAula === horario.aula ? '#fff' : '#000' }}
              >
                {horario.curso} - {horario.aula}
              </button>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PlanosComponent;
