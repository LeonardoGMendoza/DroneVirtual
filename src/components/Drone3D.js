import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Drone3D = ({ isFlying }) => {
  const droneRef = useRef();
  const rotor1Ref = useRef();
  const rotor2Ref = useRef();
  const rotor3Ref = useRef();
  const rotor4Ref = useRef();

  useFrame((state, delta) => {
    if (isFlying && droneRef.current) {
      // Animação de voo
      droneRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
      droneRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Rotação das hélices
      if (rotor1Ref.current) {
        rotor1Ref.current.rotation.y += delta * 25;
        rotor2Ref.current.rotation.y += delta * 25;
        rotor3Ref.current.rotation.y += delta * 25;
        rotor4Ref.current.rotation.y += delta * 25;
      }
    }
  });

  return (
    <group ref={droneRef} position={[0, 0, 0]}>
      {/* Corpo do drone */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Braços do drone */}
      {[[1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1]].map((pos, index) => (
        <mesh key={index} position={pos}>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
      ))}

      {/* Hélices */}
      <mesh ref={rotor1Ref} position={[1, 0.2, 1]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 8]} />
        <meshStandardMaterial color="#00ff88" />
      </mesh>
      <mesh ref={rotor2Ref} position={[-1, 0.2, 1]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 8]} />
        <meshStandardMaterial color="#00ff88" />
      </mesh>
      <mesh ref={rotor3Ref} position={[1, 0.2, -1]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 8]} />
        <meshStandardMaterial color="#00ff88" />
      </mesh>
      <mesh ref={rotor4Ref} position={[-1, 0.2, -1]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 8]} />
        <meshStandardMaterial color="#00ff88" />
      </mesh>

      {/* Luzes */}
      <pointLight position={[0.5, -0.1, 0.5]} color="#00ff88" intensity={1} />
      <pointLight position={[-0.5, -0.1, -0.5]} color="#ff0088" intensity={1} />
    </group>
  );
};

export default Drone3D;