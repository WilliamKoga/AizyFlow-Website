/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars, Environment, Line } from '@react-three/drei';
import * as THREE from 'three';

const Particle = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.15;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.z = t * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 16, 16]} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </Sphere>
  );
};

const ConnectingLines = () => {
    // Generate some random connections
    const points = [];
    for(let i=0; i<5; i++) {
        points.push(
            new THREE.Vector3((Math.random()-0.5)*6, (Math.random()-0.5)*4, (Math.random()-0.5)*4)
        );
    }
    return (
        <group>
           {points.map((p, i) => (
                <Line 
                    key={i}
                    points={[p, new THREE.Vector3(0,0,0)]}
                    color="#1e293b"
                    lineWidth={1}
                    transparent
                    opacity={0.2}
                />
           ))}
        </group>
    )
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3B82F6" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Main Nodes */}
          <Particle position={[-2, 1, 0]} color="#3B82F6" scale={0.4} />
          <Particle position={[2, -1, -1]} color="#06B6D4" scale={0.5} />
          <Particle position={[0, 2, -2]} color="#8B5CF6" scale={0.3} />
          
          {/* Distant Nodes */}
          <Particle position={[-4, -2, -4]} color="#1e293b" scale={0.2} />
          <Particle position={[4, 2, -3]} color="#1e293b" scale={0.2} />
        </Float>

        <ConnectingLines />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
};

export const NetworkScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3B82F6" />
        <Environment preset="city" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group rotation={[0.5, 0.5, 0]}>
                 {/* Central Hub */}
                <Sphere args={[1, 32, 32]}>
                    <MeshDistortMaterial
                        color="#0D1117"
                        emissive="#3B82F6"
                        emissiveIntensity={0.2}
                        distort={0.3}
                        speed={2}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </Sphere>

                {/* Satellite Nodes */}
                {[...Array(6)].map((_, i) => {
                    const angle = (i / 6) * Math.PI * 2;
                    const radius = 2.5;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;
                    return (
                        <group key={i} position={[x, 0, z]}>
                            <Sphere args={[0.2, 16, 16]}>
                                <meshStandardMaterial color={i % 2 === 0 ? "#06B6D4" : "#8B5CF6"} emissiveIntensity={2} toneMapped={false} />
                            </Sphere>
                            <Line 
                                points={[[0,0,0], [-x, 0, -z]]}
                                color="#3B82F6"
                                lineWidth={1}
                                transparent
                                opacity={0.3}
                            />
                        </group>
                    )
                })}
            </group>
        </Float>
        <Stars count={500} />
      </Canvas>
    </div>
  );
};