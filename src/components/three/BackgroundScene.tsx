"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePathname } from "next/navigation";
import { sceneConfig } from "@/design/scene";
import { getThemeColors, colors } from "@/design/tokens";
import { useScene } from "@/components/layout/SceneToggle";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMotionAllowed } from "@/hooks/useMotionAllowed";

// 1. 3D Developer Laptop (Polished Metallic Chassis, Glass Display & Glowing Code)
function Laptop3D({
  position,
  speedMultiplier,
}: {
  position: [number, number, number];
  speedMultiplier: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [themeColors, setThemeColors] = useState(() => getThemeColors());

  useEffect(() => {
    const update = () => setThemeColors(getThemeColors());
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    return () => obs.disconnect();
  }, []);

  useFrame((state) => {
    if (!groupRef.current || speedMultiplier === 0) return;
    const t = state.clock.getElapsedTime() * speedMultiplier;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.16;
    groupRef.current.rotation.y = -0.42 + Math.sin(t * 0.5) * 0.12;
    groupRef.current.rotation.x = 0.22 + Math.cos(t * 0.6) * 0.06;
    groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.04;
  });

  return (
    <group ref={groupRef} position={position} scale={sceneConfig.laptop.scale}>
      {/* Base Chassis - Sleek Space Grey Titanium */}
      <mesh position={[0, -0.05, 0.4]}>
        <boxGeometry args={[2.2, 0.08, 1.5]} />
        <meshStandardMaterial
          color={themeColors.slateGrey}
          emissive={themeColors.titaniumDark}
          emissiveIntensity={0.12}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      {/* Keyboard Bed - Crisp Metallic Silver Titanium */}
      <mesh position={[0, -0.005, 0.45]}>
        <boxGeometry args={[1.9, 0.02, 0.85]} />
        <meshStandardMaterial
          color={themeColors.titaniumLight}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Trackpad - Clean Titanium Grey */}
      <mesh position={[0, -0.005, 0.98]}>
        <boxGeometry args={[0.7, 0.02, 0.4]} />
        <meshStandardMaterial
          color={themeColors.titaniumMid}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>

      {/* Screen Lid (tilted at 110 deg) */}
      <group position={[0, 0, -0.35]} rotation={[-0.45, 0, 0]}>
        {/* Lid Back Shell - Sleek Space Grey */}
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[2.2, 1.5, 0.06]} />
          <meshStandardMaterial
            color={themeColors.titaniumDark}
            emissive={themeColors.slateGrey}
            emissiveIntensity={0.15}
            metalness={0.72}
            roughness={0.2}
          />
        </mesh>

        {/* Screen Bezel - Charcoal Titanium */}
        <mesh position={[0, 0.75, 0.035]}>
          <boxGeometry args={[2.05, 1.35, 0.01]} />
          <meshStandardMaterial
            color={themeColors.spaceGrey}
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>

        {/* Glowing Display Surface - Deep Grey Glass */}
        <mesh position={[0, 0.75, 0.045]}>
          <planeGeometry args={[1.9, 1.2]} />
          <meshStandardMaterial
            color={themeColors.spaceGrey}
            emissive={themeColors.titaniumDark}
            emissiveIntensity={0.35}
            roughness={0.2}
          />
        </mesh>

        {/* Vibrant Glowing Code Syntax Lines */}
        {[-0.35, -0.18, -0.01, 0.16, 0.33].map((yOff, i) => (
          <mesh key={i} position={[(i % 2 === 0 ? -0.2 : 0.0), 0.75 + yOff, 0.052]}>
            <planeGeometry args={[0.9 + (i % 3) * 0.3, 0.045]} />
            <meshBasicMaterial
              color={i === 0 ? themeColors.codeCyan : i === 2 ? themeColors.codeGreen : themeColors.titaniumLight}
              transparent
              opacity={0.95}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// 2. 3D Software Debug Bug (Vibrant Cyber Beetle with Chrome Legs & Emerald Eyes)
function Bug3D({
  position,
  speedMultiplier,
}: {
  position: [number, number, number];
  speedMultiplier: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [themeColors, setThemeColors] = useState(() => getThemeColors());

  useEffect(() => {
    const update = () => setThemeColors(getThemeColors());
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    return () => obs.disconnect();
  }, []);

  useFrame((state) => {
    if (!groupRef.current || speedMultiplier === 0) return;
    const t = state.clock.getElapsedTime() * speedMultiplier;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.85) * 0.15;
    groupRef.current.rotation.z = Math.sin(t * 0.75) * 0.1;
    groupRef.current.rotation.y = 0.45 + Math.cos(t * 0.55) * 0.12;
    groupRef.current.rotation.x = -0.15 + Math.sin(t * 0.45) * 0.06;
  });

  return (
    <group ref={groupRef} position={position} scale={sceneConfig.bug.scale}>
      {/* Bug Carapace - Sleek Graphite Titanium Grey */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.55, 0.8, 16, 16]} />
        <meshStandardMaterial
          color={themeColors.slateGrey}
          emissive={themeColors.titaniumDark}
          emissiveIntensity={0.2}
          metalness={0.7}
          roughness={0.22}
        />
      </mesh>

      {/* Cyber Glowing Center Spine */}
      <mesh position={[0, 0, 0.52]}>
        <boxGeometry args={[0.07, 1.2, 0.07]} />
        <meshStandardMaterial
          color={themeColors.codeCyan}
          emissive={themeColors.codeCyan}
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Bug Head - Polished Metallic Silver Titanium */}
      <mesh position={[0, 0.65, 0.2]}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshStandardMaterial
          color={themeColors.titaniumLight}
          metalness={0.8}
          roughness={0.15}
        />
      </mesh>

      {/* Cyber Eyes - Glowing Mint Emerald */}
      <mesh position={[-0.16, 0.78, 0.42]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color={themeColors.codeGreen} />
      </mesh>
      <mesh position={[0.16, 0.78, 0.42]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color={themeColors.codeGreen} />
      </mesh>

      {/* Antennae - Polished Silver */}
      <mesh position={[-0.22, 1.05, 0.35]} rotation={[0.2, 0, -0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
        <meshStandardMaterial color={themeColors.titaniumLight} metalness={0.8} />
      </mesh>
      <mesh position={[0.22, 1.05, 0.35]} rotation={[0.2, 0, 0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
        <meshStandardMaterial color={themeColors.titaniumLight} metalness={0.8} />
      </mesh>

      {/* 6 Polished Titanium Cyber Legs */}
      {[-0.3, 0.0, 0.3].map((y, idx) => (
        <React.Fragment key={idx}>
          <group position={[-0.5, y, 0]} rotation={[0, 0, 0.4 + idx * 0.1]}>
            <mesh position={[-0.35, 0, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.7, 8]} />
              <meshStandardMaterial
                color={themeColors.titaniumMid}
                metalness={0.85}
                roughness={0.15}
              />
            </mesh>
          </group>
          <group position={[0.5, y, 0]} rotation={[0, 0, -0.4 - idx * 0.1]}>
            <mesh position={[0.35, 0, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.7, 8]} />
              <meshStandardMaterial
                color={themeColors.titaniumMid}
                metalness={0.85}
                roughness={0.15}
              />
            </mesh>
          </group>
        </React.Fragment>
      ))}
    </group>
  );
}

// 3. 3D Code Brackets `< / >` (Radiant Indigo & Electric Cyan)
function CodeBrackets3D({
  position,
  speedMultiplier,
}: {
  position: [number, number, number];
  speedMultiplier: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [themeColors, setThemeColors] = useState(() => getThemeColors());

  useEffect(() => {
    const update = () => setThemeColors(getThemeColors());
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    return () => obs.disconnect();
  }, []);

  useFrame((state) => {
    if (!groupRef.current || speedMultiplier === 0) return;
    const t = state.clock.getElapsedTime() * speedMultiplier;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.16;
    groupRef.current.rotation.y = t * 0.22;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.08;
  });

  return (
    <group ref={groupRef} position={position} scale={sceneConfig.brackets.scale}>
      {/* Left Bracket '<' - Sleek Titanium Grey */}
      <group position={[-0.9, 0, 0]}>
        <mesh position={[-0.25, 0.45, 0]} rotation={[0, 0, -0.6]}>
          <boxGeometry args={[0.12, 1.1, 0.12]} />
          <meshStandardMaterial
            color={themeColors.slateGrey}
            emissive={themeColors.titaniumDark}
            emissiveIntensity={0.15}
            metalness={0.65}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[-0.25, -0.45, 0]} rotation={[0, 0, 0.6]}>
          <boxGeometry args={[0.12, 1.1, 0.12]} />
          <meshStandardMaterial
            color={themeColors.slateGrey}
            emissive={themeColors.titaniumDark}
            emissiveIntensity={0.15}
            metalness={0.65}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Center Slash '/' - Glowing Cyan */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.1, 1.7, 0.1]} />
        <meshStandardMaterial
          color={themeColors.codeCyan}
          emissive={themeColors.codeCyan}
          emissiveIntensity={0.5}
          metalness={0.4}
        />
      </mesh>

      {/* Right Bracket '>' - Sleek Titanium Grey */}
      <group position={[0.9, 0, 0]}>
        <mesh position={[0.25, 0.45, 0]} rotation={[0, 0, 0.6]}>
          <boxGeometry args={[0.12, 1.1, 0.12]} />
          <meshStandardMaterial
            color={themeColors.slateGrey}
            emissive={themeColors.titaniumDark}
            emissiveIntensity={0.15}
            metalness={0.65}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0.25, -0.45, 0]} rotation={[0, 0, -0.6]}>
          <boxGeometry args={[0.12, 1.1, 0.12]} />
          <meshStandardMaterial
            color={themeColors.slateGrey}
            emissive={themeColors.titaniumDark}
            emissiveIntensity={0.15}
            metalness={0.65}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

// 4. 3D Curly Braces `{ }` with Glowing Emerald Logic Block
function CurlyBraces3D({
  position,
  speedMultiplier,
}: {
  position: [number, number, number];
  speedMultiplier: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [themeColors, setThemeColors] = useState(() => getThemeColors());

  useEffect(() => {
    const update = () => setThemeColors(getThemeColors());
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    return () => obs.disconnect();
  }, []);

  useFrame((state) => {
    if (!groupRef.current || speedMultiplier === 0) return;
    const t = state.clock.getElapsedTime() * speedMultiplier;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.15;
    groupRef.current.rotation.y = -t * 0.18;
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.08;
  });

  return (
    <group ref={groupRef} position={position} scale={sceneConfig.curlyBraces.scale}>
      {/* Left Brace Segment - Sleek Titanium Grey */}
      <mesh position={[-0.7, 0.5, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.12, 0.8, 0.12]} />
        <meshStandardMaterial
          color={themeColors.slateGrey}
          emissive={themeColors.titaniumDark}
          emissiveIntensity={0.15}
          metalness={0.65}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[-0.85, 0, 0]}>
        <boxGeometry args={[0.3, 0.12, 0.12]} />
        <meshStandardMaterial
          color={themeColors.slateGrey}
          emissive={themeColors.titaniumDark}
          emissiveIntensity={0.15}
          metalness={0.65}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[-0.7, -0.5, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.12, 0.8, 0.12]} />
        <meshStandardMaterial
          color={themeColors.slateGrey}
          emissive={themeColors.titaniumDark}
          emissiveIntensity={0.15}
          metalness={0.65}
          roughness={0.2}
        />
      </mesh>

      {/* Floating Center Logic Octahedron - Glowing Mint Emerald */}
      <mesh position={[0, 0, 0]} rotation={[0.4, 0.4, 0]}>
        <octahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial
          color={themeColors.codeGreen}
          emissive={themeColors.codeGreen}
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.15}
        />
      </mesh>

      {/* Right Brace Segment - Sleek Titanium Grey */}
      <mesh position={[0.7, 0.5, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.12, 0.8, 0.12]} />
        <meshStandardMaterial
          color={themeColors.slateGrey}
          emissive={themeColors.titaniumDark}
          emissiveIntensity={0.15}
          metalness={0.65}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0.85, 0, 0]}>
        <boxGeometry args={[0.3, 0.12, 0.12]} />
        <meshStandardMaterial
          color={themeColors.slateGrey}
          emissive={themeColors.titaniumDark}
          emissiveIntensity={0.15}
          metalness={0.65}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0.7, -0.5, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.12, 0.8, 0.12]} />
        <meshStandardMaterial
          color={themeColors.slateGrey}
          emissive={themeColors.titaniumDark}
          emissiveIntensity={0.15}
          metalness={0.65}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

// 5. Software Developer Network Constellation
function DeveloperNetworkGraph({ speedMultiplier }: { speedMultiplier: number }) {
  const isMobile = useIsMobile();
  const count = isMobile ? sceneConfig.network.nodeCountTablet : sceneConfig.network.nodeCountDesktop;
  const lineMeshRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const packetsRef = useRef<THREE.InstancedMesh>(null);

  const [themeColors, setThemeColors] = useState(() => getThemeColors());

  useEffect(() => {
    const update = () => setThemeColors(getThemeColors());
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    return () => obs.disconnect();
  }, []);

  const [initialNodes, velocities] = useMemo(() => {
    const { spreadX, spreadY, spreadZ, offsetZ } = sceneConfig.network;
    const nodes = new Float32Array(count * 3);
    const vels = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let x = (Math.random() - 0.5) * spreadX;
      if (Math.abs(x) < 2.5) {
        x += x >= 0 ? 2.5 : -2.5;
      }
      const y = (Math.random() - 0.5) * spreadY;
      const z = (Math.random() - 0.5) * spreadZ + offsetZ;

      nodes[i * 3] = x;
      nodes[i * 3 + 1] = y;
      nodes[i * 3 + 2] = z;

      vels[i * 3] = (Math.random() - 0.5) * 0.4;
      vels[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      vels[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
    }
    return [nodes, vels];
  }, [count]);

  const nodePositions = useRef(new Float32Array(initialNodes));
  const maxLineSegments = count * 4;
  const linePositions = useMemo(() => new Float32Array(maxLineSegments * 6), [maxLineSegments]);
  const lineColors = useMemo(() => new Float32Array(maxLineSegments * 6), [maxLineSegments]);

  const packetCount = sceneConfig.packets.count;
  const packetData = useRef(
    Array.from({ length: packetCount }, () => ({
      sourceIdx: Math.floor(Math.random() * count),
      targetIdx: Math.floor(Math.random() * count),
      progress: Math.random(),
      speed: (0.4 + Math.random() * 0.5) * sceneConfig.packets.speed,
    }))
  );

  const dummyMatrix = useMemo(() => new THREE.Matrix4(), []);
  const accentColorObj = useMemo(() => new THREE.Color(themeColors.titaniumMid), [themeColors.titaniumMid]);
  const accent2ColorObj = useMemo(() => new THREE.Color(themeColors.codeCyan), [themeColors.codeCyan]);

  useFrame((state, delta) => {
    if (speedMultiplier === 0) return;
    const effDelta = Math.min(delta, 0.1) * speedMultiplier;
    const pos = nodePositions.current;
    const vels = velocities;
    const { spreadX, spreadY, spreadZ, offsetZ, maxDistance } = sceneConfig.network;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx] += vels[idx] * effDelta * sceneConfig.network.driftSpeed;
      pos[idx + 1] += vels[idx + 1] * effDelta * sceneConfig.network.driftSpeed;
      pos[idx + 2] += vels[idx + 2] * effDelta * sceneConfig.network.driftSpeed;

      const halfX = spreadX / 2;
      const halfY = spreadY / 2;
      if (Math.abs(pos[idx]) > halfX) vels[idx] *= -1;
      if (Math.abs(pos[idx + 1]) > halfY) vels[idx + 1] *= -1;
      if (pos[idx + 2] > offsetZ + spreadZ / 2 || pos[idx + 2] < offsetZ - spreadZ / 2) {
        vels[idx + 2] *= -1;
      }
    }

    if (nodesRef.current) {
      nodesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    let lineIdx = 0;
    const activePairs: Array<[number, number]> = [];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x1 = pos[i3];
      const y1 = pos[i3 + 1];
      const z1 = pos[i3 + 2];

      for (let j = i + 1; j < count; j++) {
        const j3 = j * 3;
        const dx = x1 - pos[j3];
        const dy = y1 - pos[j3 + 1];
        const dz = z1 - pos[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance && lineIdx < maxLineSegments) {
          const l6 = lineIdx * 6;
          linePositions[l6] = x1;
          linePositions[l6 + 1] = y1;
          linePositions[l6 + 2] = z1;
          linePositions[l6 + 3] = pos[j3];
          linePositions[l6 + 4] = pos[j3 + 1];
          linePositions[l6 + 5] = pos[j3 + 2];

          const dist = Math.sqrt(distSq);
          const alpha = 1 - dist / maxDistance;

          lineColors[l6] = accentColorObj.r * alpha;
          lineColors[l6 + 1] = accentColorObj.g * alpha;
          lineColors[l6 + 2] = accentColorObj.b * alpha;
          lineColors[l6 + 3] = accent2ColorObj.r * alpha;
          lineColors[l6 + 4] = accent2ColorObj.g * alpha;
          lineColors[l6 + 5] = accent2ColorObj.b * alpha;

          activePairs.push([i, j]);
          lineIdx++;
        }
      }
    }

    if (lineMeshRef.current) {
      lineMeshRef.current.geometry.setDrawRange(0, lineIdx * 2);
      lineMeshRef.current.geometry.attributes.position.needsUpdate = true;
      lineMeshRef.current.geometry.attributes.color.needsUpdate = true;
    }

    if (packetsRef.current && activePairs.length > 0) {
      packetData.current.forEach((pkt, pIdx) => {
        pkt.progress += pkt.speed * effDelta;
        if (pkt.progress >= 1.0) {
          pkt.progress = 0;
          const pair = activePairs[Math.floor(Math.random() * activePairs.length)];
          pkt.sourceIdx = pair[0];
          pkt.targetIdx = pair[1];
        }

        const s3 = pkt.sourceIdx * 3;
        const t3 = pkt.targetIdx * 3;
        const px = pos[s3] + (pos[t3] - pos[s3]) * pkt.progress;
        const py = pos[s3 + 1] + (pos[t3 + 1] - pos[s3 + 1]) * pkt.progress;
        const pz = pos[s3 + 2] + (pos[t3 + 2] - pos[s3 + 2]) * pkt.progress;

        dummyMatrix.makeTranslation(px, py, pz);
        dummyMatrix.scale(new THREE.Vector3(sceneConfig.packets.size, sceneConfig.packets.size, sceneConfig.packets.size));
        packetsRef.current?.setMatrixAt(pIdx, dummyMatrix);
      });
      packetsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions.current, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={themeColors.slateGrey}
          size={sceneConfig.network.nodeSize}
          sizeAttenuation
          transparent
          opacity={sceneConfig.network.nodeOpacity}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>

      <lineSegments ref={lineMeshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={sceneConfig.network.lineOpacity}
          blending={THREE.NormalBlending}
          depthWrite={false}
        />
      </lineSegments>

      <instancedMesh
        ref={packetsRef}
        args={[undefined, undefined, packetCount]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          color={themeColors.codeCyan}
          transparent
          opacity={sceneConfig.packets.opacity}
          blending={THREE.NormalBlending}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
}

// 6. Ambient Deep Telemetry Cloud
function TelemetryCloud({ speedMultiplier }: { speedMultiplier: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const isMobile = useIsMobile();
  const count = isMobile ? sceneConfig.particles.countTablet : sceneConfig.particles.countDesktop;

  const [themeColors, setThemeColors] = useState(() => getThemeColors());

  useEffect(() => {
    const update = () => setThemeColors(getThemeColors());
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    return () => obs.disconnect();
  }, []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const { spreadX, spreadY, spreadZ } = sceneConfig.particles;

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spreadX;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spreadZ - 6;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current || speedMultiplier === 0) return;
    const effDelta = delta * speedMultiplier;
    pointsRef.current.rotation.y += sceneConfig.particles.rotationSpeedY * effDelta;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;
    const halfY = sceneConfig.particles.spreadY / 2;

    for (let i = 0; i < count; i++) {
      let y = array[i * 3 + 1] + sceneConfig.particles.verticalDriftSpeed * effDelta;
      if (y > halfY) y = -halfY;
      array[i * 3 + 1] = y;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={themeColors.titaniumMid}
        size={sceneConfig.particles.size}
        sizeAttenuation
        transparent
        opacity={sceneConfig.particles.opacity}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

// 7. Camera Parallax & Scroll Controller
function CameraController({
  scrollProgress,
  speedMultiplier,
}: {
  scrollProgress: number;
  speedMultiplier: number;
}) {
  const { camera } = useThree();
  const isMobile = useIsMobile();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return;
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isMobile]);

  useFrame(() => {
    const targetZ = sceneConfig.camera.initialZ + scrollProgress * sceneConfig.camera.travelZ;
    camera.position.z += (targetZ - camera.position.z) * sceneConfig.camera.dampingScroll;

    if (!isMobile && speedMultiplier > 0) {
      const targetX = mouse.current.x * sceneConfig.camera.maxMouseParallax;
      const targetY = -mouse.current.y * sceneConfig.camera.maxMouseParallax;
      camera.position.x += (targetX - camera.position.x) * sceneConfig.camera.dampingMouse;
      camera.position.y += (targetY - camera.position.y) * sceneConfig.camera.dampingMouse;
    }
  });

  return null;
}

// 8. Static Off-White Background Fallback for Touch & Dense Pages
export function StaticBackgroundFallback() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-bg">
      <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-1/3 -right-20 h-96 w-96 rounded-full bg-accent-2/5 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,var(--color-bg)_100%)] opacity-70" />
    </div>
  );
}

// 9. Persistent Master Background Component
export function BackgroundScene() {
  const pathname = usePathname();
  const { preset, speedMultiplier } = useScene();
  const isMobile = useIsMobile();
  const motionAllowed = useMotionAllowed();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tabVisible, setTabVisible] = useState(true);

  const isArticleOrResume = pathname.startsWith("/articles") || pathname === "/resume";
  const useFallback = isMobile || !motionAllowed || preset === "off" || isArticleOrResume;

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(window.scrollY / maxScroll);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <>
      {useFallback ? (
        <StaticBackgroundFallback />
      ) : (
        <div className="fixed inset-0 -z-10 pointer-events-none select-none overflow-hidden">
          {/* Subtle off-white vignette overlay */}
          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_50%,var(--color-bg)_100%)] opacity-70 pointer-events-none" />

          {/* 3D WebGL Canvas */}
          <Canvas
            dpr={sceneConfig.render.dpr}
            camera={{ position: [0, 0, sceneConfig.camera.initialZ], fov: sceneConfig.camera.fov }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            frameloop={tabVisible ? "always" : "never"}
          >
            {/* Radiant Developer Lighting Rig (Crisp Key + Titanium Highlights) */}
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 12, 8]} intensity={1.8} />
            <directionalLight position={[-10, -8, 6]} intensity={0.9} color={colors.titaniumLight} />
            <pointLight position={[6, 2, -2]} intensity={0.6} color={colors.accent2} />
            <pointLight position={[-6, -2, -2]} intensity={0.6} color={colors.codeGreen} />

            <Suspense fallback={null}>
              {/* Developer 3D Artifacts */}
              <Laptop3D position={sceneConfig.laptop.position} speedMultiplier={speedMultiplier} />
              <Bug3D position={sceneConfig.bug.position} speedMultiplier={speedMultiplier} />
              <CodeBrackets3D position={sceneConfig.brackets.position} speedMultiplier={speedMultiplier} />
              <CurlyBraces3D position={sceneConfig.curlyBraces.position} speedMultiplier={speedMultiplier} />

              {/* Developer Constellation Mesh & Deep Space Telemetry */}
              <DeveloperNetworkGraph speedMultiplier={speedMultiplier} />
              <TelemetryCloud speedMultiplier={speedMultiplier} />

              <CameraController scrollProgress={scrollProgress} speedMultiplier={speedMultiplier} />
            </Suspense>
          </Canvas>
        </div>
      )}
    </>
  );
}
