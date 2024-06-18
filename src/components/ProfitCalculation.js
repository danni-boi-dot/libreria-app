import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfitCalculation = () => {
  const [totalGanancias, setTotalGanancias] = useState(0);

  useEffect(() => {
    calcularGanancias();
  }, []);

  const calcularGanancias = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ventas/calcular-ganancias');
      setTotalGanancias(response.data.ganancias);
    } catch (error) {
      console.error('Error al calcular las ganancias:', error);
    }
  };

  return (
    <div>
      <h2>Ganancias Totales</h2>
      <p>${totalGanancias.toFixed(2)}</p>
    </div>
  );
}

export default ProfitCalculation;
