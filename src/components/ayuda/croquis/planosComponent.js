import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import salonesBase from '../../../images/croquis/salones/base.png';
import pabellonesBase from '../../../images/croquis/pabellones/basep.png';

const PlanosComponent = () => {
  const { paSa } = useParams(); // Captura el valor de la URL (por ejemplo, "P2-203")

  // Extraer pabellón y salón del valor recibido
  const pabellon = paSa.split('-')[0]; // "P2"
  const salonCodigo = paSa.split('-')[1]; // "203"
  const salonNumero = salonCodigo.slice(-2); // "03" (para buscar entre "101" a "105")
  const piso = salonCodigo.charAt(0); // Primer dígito para determinar el piso

  const [pabellonOverlay, setPabellonOverlay] = useState(null);
  const [salonOverlay, setSalonOverlay] = useState(null);

  // Cargar las imágenes dinámicamente
  useEffect(() => {
    // Cargar imagen de pabellón
    import(`../../../images/croquis/pabellones/${pabellon}.png`)
      .then((module) => setPabellonOverlay(module.default))
      .catch(() => console.log(`Imagen de pabellón ${pabellon}.png no encontrada`));

    // Cargar imagen de salón
    import(`../../../images/croquis/salones/${salonNumero}.png`)
      .then((module) => setSalonOverlay(module.default))
      .catch(() => console.log(`Imagen de salón ${salonNumero}.png no encontrada`));
  }, [pabellon, salonNumero]);

  return (
    <div className="container d-flex justify-content-center my-4">
      {/* Contenedor principal con fondo blanco, bordes redondeados y sombra */}
      <div className="bg-white rounded shadow p-4 position-relative" style={{ width: '100%', maxWidth: '700px' }}>
        
        {/* Imagen 'base' en la parte superior con la superposición del salón */}
        <div className="mb-3 position-relative" style={{ textAlign: 'center' }}>
          <img src={salonesBase} alt="Base Superior" className="img-fluid rounded mx-auto d-block" style={{ width: '600px' }} />
          {salonOverlay && (
            <img src={salonOverlay} alt="Overlay Salón" className="overlay-image position-absolute top-50 start-50 translate-middle" style={{ width: '92%' }} />
          )}
          <p className="position-absolute text-center text-dark fw-bold" style={{ bottom: '0', width: '100%' }}>
            {`Piso ${piso}, Salón ${salonCodigo}`}
          </p>
        </div>

        {/* Imagen 'basep' en la parte inferior con la superposición del pabellón */}
        <div className="position-relative" style={{ textAlign: 'center' }}>
          <img src={pabellonesBase} alt="Base Inferior" className="img-fluid rounded mx-auto d-block" style={{ width: '100%' }} />
          {pabellonOverlay && (
            <img src={pabellonOverlay} alt="Overlay Pabellón" className="overlay-image position-absolute top-50 start-50 translate-middle" style={{ width: '100%' }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanosComponent;
