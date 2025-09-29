import React from 'react';

const SensorPanel = ({ data }) => {
  const getQualityColor = (value) => {
    if (value >= 80) return '#00ff88';
    if (value >= 60) return '#ffaa00';
    return '#ff4444';
  };

  const sensors = [
    { label: 'Qualidade do Ar', value: data.qualidadeAr, unit: '%', color: getQualityColor(data.qualidadeAr) },
    { label: 'Temperatura', value: data.temperatura, unit: '°C', color: '#ffaa00' },
    { label: 'Umidade', value: data.umidade, unit: '%', color: '#0088ff' },
    { label: 'Poluição', value: data.poluicao, unit: 'μg/m³', color: getQualityColor(100 - data.poluicao) }
  ];

  return (
    <div className="sensor-panel">
      <h3>📊 Sensores do Drone</h3>
      {sensors.map((sensor, index) => (
        <div key={index} className="sensor-item">
          <div className="sensor-info">
            <span className="sensor-label">{sensor.label}</span>
            <span className="sensor-value" style={{ color: sensor.color }}>
              {sensor.value.toFixed(1)}{sensor.unit}
            </span>
          </div>
          <div className="sensor-bar">
            <div 
              className="sensor-fill"
              style={{
                width: `${sensor.value}%`,
                backgroundColor: sensor.color
              }}
            />
          </div>
        </div>
      ))}
      
      {/* Alertas como no SpecWater */}
      {data.qualidadeAr < 70 && (
        <div className="alert warning">
          ⚠️ Qualidade do ar moderada - Monitorar área
        </div>
      )}
      {data.poluicao > 20 && (
        <div className="alert danger">
          🚨 Nível de poluição alto - Enviar alerta
        </div>
      )}
    </div>
  );
};

export default SensorPanel;