import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Map, { Marker } from 'react-map-gl'; // Importação corrigida
import Drone3D from './components/Drone3D';
import SensorPanel from './components/SensorPanel';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';

// Token público do Mapbox (gratuito)
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

function App() {
  const [dronePosition, setDronePosition] = useState({ 
    longitude: -46.6333, 
    latitude: -23.5505 
  });
  const [sensorData, setSensorData] = useState({
    qualidadeAr: 85,
    temperatura: 25,
    umidade: 60,
    poluicao: 12
  });
  const [isFlying, setIsFlying] = useState(false);

  // Simula movimento do drone
  const startFlight = () => {
    setIsFlying(true);
    simulateFlight();
  };

  const simulateFlight = () => {
    let step = 0;
    const flightInterval = setInterval(() => {
      step += 0.01;
      const newLng = -46.6333 + Math.sin(step) * 0.01;
      const newLat = -23.5505 + Math.cos(step) * 0.01;
      
      setDronePosition({
        longitude: newLng,
        latitude: newLat
      });
      
      // Atualiza dados dos sensores
      setSensorData({
        qualidadeAr: 80 + Math.random() * 20,
        temperatura: 20 + Math.random() * 10,
        umidade: 50 + Math.random() * 30,
        poluicao: 10 + Math.random() * 15
      });

      if (step > 6) {
        clearInterval(flightInterval);
        setIsFlying(false);
      }
    }, 200);
  };

  return (
    <div className="app">
      {/* Mapa 2D */}
      <div className="map-container">
        <Map
          mapboxAccessToken={MAPBOX_TOKEN}
          initialViewState={{
            longitude: dronePosition.longitude,
            latitude: dronePosition.latitude,
            zoom: 14
          }}
          style={{ width: '100%', height: '100vh' }}
          mapStyle="mapbox://styles/mapbox/satellite-v9"
        >
          <Marker 
            longitude={dronePosition.longitude} 
            latitude={dronePosition.latitude}
          >
            <div className="drone-marker">
              🚁
            </div>
          </Marker>
        </Map>
      </div>

      {/* Visualização 3D do Drone */}
      <div className="drone-3d-view">
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          
          <Drone3D isFlying={isFlying} />
          
          <Environment preset="city" />
          <OrbitControls />
        </Canvas>
      </div>

      {/* Painel de Controle */}
      <div className="control-panel">
        <button 
          className={`flight-btn ${isFlying ? 'flying' : ''}`}
          onClick={startFlight}
          disabled={isFlying}
        >
          {isFlying ? '🛸 Voando...' : '🚀 Iniciar Voo'}
        </button>
        
        <SensorPanel data={sensorData} />
      </div>
    </div>
  );
}

export default App;