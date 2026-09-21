"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

interface Atom {
  position: [number, number, number];
  color: string;
  radius: number;
}

const mockAtoms: Atom[] = [
  { position: [0, 0, 0], color: "#4287f5", radius: 0.5 },
  { position: [1.2, 0.5, 0], color: "#42f545", radius: 0.4 },
  { position: [-1.0, 0.3, 0.5], color: "#f54242", radius: 0.45 },
  { position: [0.5, 1.2, 0.3], color: "#f5f542", radius: 0.35 },
  { position: [-0.3, -1.0, 0.2], color: "#42f5f5", radius: 0.4 },
  { position: [0.8, -0.5, 1.0], color: "#f542d4", radius: 0.38 },
  { position: [-0.7, 0.8, -0.6], color: "#f59a42", radius: 0.42 },
  { position: [1.5, -0.8, -0.4], color: "#9f42f5", radius: 0.36 },
];

function Molecule() {
  return (
    <group>
      {mockAtoms.map((atom, index) => (
        <Sphere
          key={index}
          args={[atom.radius, 32, 32]}
          position={atom.position}
        >
          <meshStandardMaterial
            color={atom.color}
            metalness={0.3}
            roughness={0.4}
          />
        </Sphere>
      ))}
    </group>
  );
}

export default function MoleculeViewer() {
  return (
    <div className="w-full h-[400px] bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Molecule />
        <OrbitControls enableZoom enablePan enableRotate autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
