/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars, Environment, Line, Text, RoundedBox, Html, Torus, Icosahedron, Octahedron } from '@react-three/drei';
import * as THREE from 'three';
import { Zap, Users, Mail } from 'lucide-react';

// Add global JSX declaration to fix TypeScript errors for React Three Fiber intrinsic elements.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      fog: any;
      group: any;
      mesh: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      planeGeometry: any;
      sphereGeometry: any;
      boxGeometry: any;
      icosahedronGeometry: any;
      torusGeometry: any;
      octahedronGeometry: any;
    }
  }
}

// Augment React's JSX namespace for React 18+ types where JSX is namespaced under React
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      fog: any;
      group: any;
      mesh: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      planeGeometry: any;
      sphereGeometry: any;
      boxGeometry: any;
      icosahedronGeometry: any;
      torusGeometry: any;
      octahedronGeometry: any;
    }
  }
}

// --- UTILS ---
const RandomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

// --- SHARED COMPONENTS ---

interface FloatingIconProps {
    position: [number, number, number];
    color: string;
    children: React.ReactNode;
    size?: string;
    speed?: number;
    rotationIntensity?: number;
    floatIntensity?: number;
}

const FloatingIcon = ({ 
    position, 
    color, 
    children, 
    size = "w-12 h-12",
    speed = 1.5, // Default slower speed for organic feel
    rotationIntensity = 0.2,
    floatIntensity = 1 
}: FloatingIconProps) => {
    return (
        <group position={position}>
            <Float 
                speed={speed} 
                rotationIntensity={rotationIntensity} 
                floatIntensity={floatIntensity} 
                floatingRange={[-0.1, 0.1]}
            >
                <Html transform center distanceFactor={8} position={[0, 0, 0]}>
                    <div 
                        className={`flex items-center justify-center ${size} rounded-full shadow-lg border border-white/10 backdrop-blur-md transition-transform hover:scale-110 overflow-hidden`}
                        style={{ 
                            background: 'rgba(20, 20, 30, 0.6)',
                            borderColor: color,
                            boxShadow: `0 0 20px ${color}60` // Glow color with opacity
                        }}
                    >
                        {children}
                    </div>
                </Html>
            </Float>
        </group>
    )
}

const DataStream = () => {
    const lineRef = useRef<any>(null);

    const points = useMemo(() => {
        const p = [];
        // More points for a longer, smoother flow across the screen
        for (let i = 0; i < 15; i++) {
            const x = (i - 7) * 1.5; // Spread out horizontally
            const y = Math.sin(i * 0.5) * 1.2; // Gentle sine wave
            const z = Math.cos(i * 0.3) * 1.5; // Gentle depth curve
            p.push(new THREE.Vector3(x, y, z));
        }
        // High segment count for smoothness
        return new THREE.CatmullRomCurve3(p).getPoints(150);
    }, []);

    useFrame((state) => {
        if (lineRef.current?.material) {
            const t = state.clock.getElapsedTime();
            
            // Speed adjustment to 0.8 as requested for organic flow
            const speed = 0.8;
            
            const pulse = Math.sin(t * speed);
            
            // Opacity breathing (0.1 to 0.4)
            lineRef.current.material.opacity = 0.1 + (pulse * 0.5 + 0.5) * 0.3; 
            
            // Width pulsing: 1.5 to 3.5
            // Calculation: Base 1.5 + (NormalizedSine * 2) -> 1.5 + (0 to 1) * 2 = 1.5 to 3.5
            lineRef.current.material.linewidth = 1.5 + (Math.sin(t * speed + 1) * 0.5 + 0.5) * 2;
        }
    });

    return (
        <Line
            ref={lineRef}
            points={points}
            color="#3B82F6"
            opacity={0.2}
            transparent
            lineWidth={2}
        />
    );
};

// --- SCENES ---

// Component to handle mouse parallax effect for background elements
const BackgroundParallax = ({ children }: { children: React.ReactNode }) => {
    const groupRef = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if (groupRef.current) {
            // Smoothly interpolate rotation based on mouse position
            // Dividing by 20 makes the movement subtle
            const targetRotX = state.mouse.y * 0.05;
            const targetRotY = state.mouse.x * 0.05;
            
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.02);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.02);
        }
    });

    return <group ref={groupRef}>{children}</group>;
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3B82F6" />
        <fog attach="fog" args={['#020408', 5, 20]} />
        
        {/* Floating Icons with Images - Varied speeds for organic feel */}
        
        {/* WhatsApp - Left Top */}
        <FloatingIcon position={[-4, 2, 0]} color="#25D366" speed={1.2} floatIntensity={1.2}>
            <img src="https://img.icons8.com/color/96/whatsapp--v1.png" alt="WhatsApp" className="w-8 h-8" />
        </FloatingIcon>

        {/* Messenger - Left Bottom */}
        <FloatingIcon position={[-3.5, -2, 1]} color="#0084FF" speed={1.5} rotationIntensity={0.3}>
             <img src="https://img.icons8.com/fluency/96/facebook-messenger--v2.png" alt="Messenger" className="w-8 h-8" />
        </FloatingIcon>

        {/* Instagram - Left Center Deep */}
        <FloatingIcon position={[-2, 0, -2]} color="#E1306C" speed={0.8} floatIntensity={1.5}>
             <img src="https://img.icons8.com/fluency/96/instagram-new.png" alt="Instagram" className="w-8 h-8" />
        </FloatingIcon>

        {/* Automation (Zap) - Right Top */}
        <FloatingIcon position={[3.5, 2.5, -1]} color="#8B5CF6" speed={1.3} rotationIntensity={0.1}>
             <img src="https://img.icons8.com/fluency/96/flash-on.png" alt="Automation" className="w-8 h-8" />
        </FloatingIcon>

        {/* Leads (Users) - Right Center */}
        <FloatingIcon position={[4, -0.5, 0]} color="#06B6D4" speed={1.1} floatIntensity={1.1}>
             <img src="https://img.icons8.com/fluency/96/conference-call.png" alt="Leads" className="w-8 h-8" />
        </FloatingIcon>

        {/* Email - Right Bottom */}
        <FloatingIcon position={[2.5, -3, 1]} color="#F59E0B" speed={1.6} rotationIntensity={0.4}>
             <img src="https://img.icons8.com/fluency/96/mail.png" alt="Email" className="w-8 h-8" />
        </FloatingIcon>

        {/* Parallax Background Group */}
        <BackgroundParallax>
            {/* Background particles for depth */}
            <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.1}>
                {[...Array(6)].map((_, i) => (
                    <Sphere key={i} args={[0.05, 8, 8]} position={[RandomFloat(-6, 6), RandomFloat(-4, 4), RandomFloat(-5, -2)]}>
                        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
                    </Sphere>
                ))}
            </Float>
            <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={0.5} />
        </BackgroundParallax>

        {/* Curved Data Lines connecting the ecosystem */}
        <group rotation={[0.2, 0.5, 0]}>
            <DataStream />
        </group>
        <group rotation={[-0.2, -0.5, 0]} position={[0, -2, 0]}>
            <DataStream />
        </group>

      </Canvas>
    </div>
  );
};

// --- COMPLEX NETWORK VISUALIZATION ---

const Packet = ({ curve, speed = 1, delay = 0, color = "#fff" }: { curve: THREE.Curve<THREE.Vector3>, speed?: number, delay?: number, color?: string }) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (!ref.current) return;
        const t = (state.clock.getElapsedTime() * speed + delay) % 1;
        const pos = curve.getPoint(t);
        ref.current.position.copy(pos);
        
        // Pulse scale based on position
        const scale = Math.sin(t * Math.PI) * 1.5; 
        ref.current.scale.setScalar(Math.max(0.1, scale));
    });
    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color={color} />
        </mesh>
    );
};

const ComplexNode = ({ position, color, label, scale = 1, isCentral = false }: { position: THREE.Vector3, color: string, label?: string, scale?: number, isCentral?: boolean }) => {
    const groupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const ringRef1 = useRef<THREE.Group>(null);
    const ringRef2 = useRef<THREE.Group>(null);
    const ringRef3 = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if(groupRef.current) {
            // Gentle float based on position to unsync them
            groupRef.current.position.y = position.y + Math.sin(t + position.x * 0.5) * 0.1;
        }

        // Central Node Animation (Pulsating Core)
        if (isCentral && coreRef.current) {
            const pulse = 1 + Math.sin(t * 2) * 0.1;
            coreRef.current.scale.setScalar(pulse);
            // @ts-ignore
            if (coreRef.current.material.emissiveIntensity) {
                 // @ts-ignore
                coreRef.current.material.emissiveIntensity = 2 + Math.sin(t * 3) * 1;
            }
        }

        // Ring Rotations
        if(ringRef1.current) {
            ringRef1.current.rotation.x = t * 0.4;
            ringRef1.current.rotation.y = t * 0.2;
        }
        if(ringRef2.current) {
            ringRef2.current.rotation.x = -t * 0.3;
            ringRef2.current.rotation.z = t * 0.2;
        }
        if(ringRef3.current) {
             ringRef3.current.rotation.y = t * 0.5;
             ringRef3.current.rotation.x = Math.PI / 2;
        }
    })

    return (
        <group position={position} ref={groupRef}>
             {/* Label */}
             {label && (
                <Text 
                    position={[0, 0.8 * scale, 0]} 
                    fontSize={0.3 * scale} 
                    color="white" 
                    anchorX="center" 
                    anchorY="bottom"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    {label}
                </Text>
             )}

            {/* Glowing Inner Core */}
            {isCentral ? (
                <Sphere args={[0.6 * scale, 32, 32]} ref={coreRef}>
                    <MeshDistortMaterial 
                        color={color} 
                        emissive={color} 
                        emissiveIntensity={2} 
                        speed={2} 
                        distort={0.4} 
                    />
                </Sphere>
            ) : (
                <Octahedron args={[0.3 * scale, 0]}>
                     <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} toneMapped={false} />
                </Octahedron>
            )}

            {/* Rotating Rings - More complex structure */}
            <group ref={ringRef1}>
                <Torus args={[0.5 * scale, 0.015 * scale, 16, 32]}>
                    <meshBasicMaterial color={color} transparent opacity={0.3} />
                </Torus>
            </group>
            
            <group ref={ringRef2}>
                <Torus args={[0.65 * scale, 0.01 * scale, 16, 32]} rotation={[Math.PI/2, 0, 0]}>
                    <meshBasicMaterial color={isCentral ? "#ffffff" : color} transparent opacity={0.2} />
                </Torus>
            </group>

            {/* Third ring for extra detail on central node */}
            {isCentral && (
                <group ref={ringRef3}>
                    <Torus args={[0.8 * scale, 0.005 * scale, 32, 64]}>
                        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
                    </Torus>
                </group>
            )}
        </group>
    )
}

const CurvedConnection = ({ start, end, color }: { start: THREE.Vector3, end: THREE.Vector3, color: string }) => {
    const curve = useMemo(() => {
        const mid = start.clone().add(end).multiplyScalar(0.5);
        // Add curve height based on distance
        const dist = start.distanceTo(end);
        mid.y += dist * 0.2; 
        return new THREE.QuadraticBezierCurve3(start, mid, end);
    }, [start, end]);

    const points = useMemo(() => curve.getPoints(20), [curve]);

    return (
        <group>
            <Line points={points} color={color} transparent opacity={0.15} lineWidth={1} />
            <Packet curve={curve} speed={0.5} delay={Math.random()} color={color} />
        </group>
    )
}

const DynamicNetwork = () => {
    const groupRef = useRef<THREE.Group>(null);
    
    const { nodes, links } = useMemo(() => {
        const n = [];
        const l = [];
        
        // 1. Central Hub
        const centerPos = new THREE.Vector3(0,0,0);
        n.push({ pos: centerPos, color: '#3B82F6', label: 'AizyCore', scale: 1.5, isCentral: true });

        // 2. Satellites
        const satellites = [
            { label: 'WhatsApp', color: '#25D366' },
            { label: 'CRM', color: '#3B82F6' },
            { label: 'Email', color: '#F59E0B' },
            { label: 'Stripe', color: '#8B5CF6' },
            { label: 'Site', color: '#06B6D4' },
            { label: 'Instagram', color: '#E1306C' },
        ];

        satellites.forEach((sat, i) => {
            const angle = (i / satellites.length) * Math.PI * 2;
            const r = 4;
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            const y = Math.sin(i * 2) * 1.5; // Up and down variation
            const pos = new THREE.Vector3(x, y, z);
            
            n.push({ pos, color: sat.color, label: sat.label, scale: 1.2, isCentral: false });
            
            // Connect to Center
            l.push({ start: centerPos, end: pos, color: sat.color });

            // Connect to neighbour (ring connection)
            const nextIndex = (i + 1) % satellites.length;
             // We will connect them later in render loop to access positions
        });
        
        return { nodes: n, links: l };
    }, []);

    // Create ring connections dynamically
    const ringLinks = useMemo(() => {
        const rl = [];
        const satNodes = nodes.slice(1);
        for(let i=0; i<satNodes.length; i++) {
             const curr = satNodes[i];
             const next = satNodes[(i+1) % satNodes.length];
             rl.push({ start: curr.pos, end: next.pos, color: '#ffffff' });
        }
        return rl;
    }, [nodes]);

    // Slowly rotate the entire network
    useFrame((state) => {
        if(groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
             {/* Render Nodes */}
             {nodes.map((node, i) => (
                 <ComplexNode 
                    key={i} 
                    position={node.pos} 
                    color={node.color} 
                    label={node.label} 
                    scale={node.scale} 
                    isCentral={node.isCentral} 
                 />
             ))}

             {/* Render Radial Connections */}
             {links.map((link, i) => (
                 <CurvedConnection key={`radial-${i}`} start={link.start} end={link.end} color={link.color} />
             ))}

             {/* Render Ring Connections */}
             {ringLinks.map((link, i) => (
                 <CurvedConnection key={`ring-${i}`} start={link.start} end={link.end} color={link.color} />
             ))}
        </group>
    )
}

export const NetworkScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 2, 9], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3B82F6" />
        <Environment preset="city" />

        <DynamicNetwork />
        
        <Stars count={500} fade />
      </Canvas>
    </div>
  );
};

// --- NEW SCENE: 3D Bar Chart for "Results" Section ---

const Bar3D = ({ position, height, color, delay }: { position: [number, number, number], height: number, color: string, delay: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.getElapsedTime();
            // Calculate progress (0 to 1)
            // Slower speed for more emphasis on bounce (approx 1.4s duration to settle)
            // Increased multiplier from 0.8 to 0.7 makes it slower
            const rawProgress = Math.min(1, Math.max(0, (t - delay) * 0.7)); 
            
            // Elastic Ease Out implementation
            const easeOutElastic = (x: number): number => {
                const c4 = (2 * Math.PI) / 3; 
                return x === 0
                  ? 0
                  : x === 1
                  ? 1
                  : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
            };

            const eased = easeOutElastic(rawProgress);
            const currentH = height * eased;
            
            // Ensure strictly non-negative scale
            meshRef.current.scale.y = Math.max(0.01, currentH);
            meshRef.current.position.y = Math.max(0.005, currentH / 2); // Bottom-aligned
        }
    });

    return (
        <group position={position}>
            <RoundedBox ref={meshRef} args={[0.8, 1, 0.8]} radius={0.05} smoothness={4}>
                <meshStandardMaterial 
                    color={color} 
                    roughness={0.2} 
                    metalness={0.6} 
                    emissive={color}
                    emissiveIntensity={0.2}
                />
            </RoundedBox>
        </group>
    )
}

export const BarChartScene: React.FC = () => {
    return (
        <div className="w-full h-full min-h-[300px] relative rounded-2xl overflow-hidden">
            <Canvas camera={{ position: [5, 5, 8], fov: 35 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[0, 10, 5]} intensity={1} color="#ffffff" />
                <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
                
                {/* Ground Reflection */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial color="#020408" roughness={0.1} metalness={0.8} />
                </mesh>
                
                <group position={[-2, 0, 0]}>
                    {/* Month 1 - Low */}
                    <Bar3D position={[0, 0, 0]} height={1.5} color="#475569" delay={0.2} />
                    {/* Month 2 - Med */}
                    <Bar3D position={[1.2, 0, 0]} height={2.5} color="#64748b" delay={0.8} />
                    {/* Month 3 - High (AizyFlow) */}
                    <Bar3D position={[2.4, 0, 0]} height={5.5} color="#3B82F6" delay={1.4} />
                    
                    {/* Floating Indicators */}
                    <Float speed={2} floatIntensity={0.5}>
                        <mesh position={[2.4, 6.2, 0]}>
                             <sphereGeometry args={[0.2]} />
                             <meshBasicMaterial color="#06B6D4" />
                        </mesh>
                    </Float>
                </group>

                <Environment preset="city" />
            </Canvas>
            
            {/* HTML Overlay for labels */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-12 text-xs font-mono text-slate-500 pointer-events-none opacity-80 pl-8">
                <span>Mês 1</span>
                <span>Mês 2</span>
                <span className="text-accent-blue font-bold">AizyFlow</span>
            </div>
        </div>
    )
}