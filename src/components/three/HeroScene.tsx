"use client";

import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { getThemeColors } from "@/design/tokens";

function FloatingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [themeColors, setThemeColors] = useState(() => getThemeColors());

  useEffect(() => {
    // Read computed style tokens
    const updateColors = () => setThemeColors(getThemeColors());
    updateColors();

    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "style", "class"],
    });

    return () => observer.disconnect();
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <MeshDistortMaterial
          color={themeColors.accent}
          emissive={themeColors.accent}
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={2}
          wireframe
        />
      </mesh>

      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial
          color={themeColors.accent2}
          emissive={themeColors.accent2}
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      <FloatingCore />
    </>
  );
}
