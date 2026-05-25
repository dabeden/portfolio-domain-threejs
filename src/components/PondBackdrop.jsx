import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const createToonGradient = (colors) => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 1;

  const context = canvas.getContext("2d");
  const gradient = context.createLinearGradient(0, 0, canvas.width, 0);

  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color);
  });

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
};

function WaterSurface() {
  const meshRef = useRef(null);

  // Make the plane vertical (perpendicular to camera)
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(18, 10, 96, 56);
    // No rotation: vertical
    return geo;
  }, []);

  const gradientMap = useMemo(
    () => createToonGradient(["#0f4f68", "#2ad6ff", "#d7fbff"]),
    []
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) {
      return;
    }

    const position = meshRef.current.geometry.attributes.position;
    const elapsed = clock.getElapsedTime();

    for (let i = 0; i < position.count; i += 1) {
      const x = position.getX(i);
      const y = position.getY(i);

      // Animate Z for vertical ripples
      const ripple =
        Math.sin(x * 1.8 + elapsed * 1.4) * 0.18 +
        Math.cos(y * 1.4 - elapsed * 1.2) * 0.13 +
        Math.sin((x + y) * 0.9 - elapsed * 1.1) * 0.07;

      position.setZ(i, ripple);
    }

    position.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} position={[0, 1.5, -2.5]} receiveShadow>
      <primitive object={geometry} attach="geometry" />
      <meshToonMaterial
        color="#0d85ad"
        emissive="#0f7fa8"
        emissiveIntensity={0.55}
        gradientMap={gradientMap}
      />
    </mesh>
  );
}

function GroundPlane() {
  const gradientMap = useMemo(
    () => createToonGradient(["#09131f", "#0f3742", "#1d5d64"]),
    []
  );

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.14, 0]} receiveShadow>
      <planeGeometry args={[20, 14]} />
      <meshToonMaterial color="#0f2b33" gradientMap={gradientMap} />
    </mesh>
  );
}

function PondEdge() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.13, 0]}>
      <ringGeometry args={[8.2, 9.5, 64]} />
      <meshToonMaterial color="#0a242d" transparent opacity={0.98} />
    </mesh>
  );
}

function SampleCube() {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.6;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
  });

  return (
    <mesh ref={meshRef} position={[0, 1.2, -1.2]} castShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#7dd3fc" metalness={0.2} roughness={0.35} />
    </mesh>
  );
}

function PondScene() {
  return (
    <>
      <ambientLight intensity={0.95} />
      <hemisphereLight
        skyColor="#b8f8ff"
        groundColor="#06111b"
        intensity={0.8}
      />
      <directionalLight position={[5, 7, 4]} intensity={1.4} color="#dffbff" castShadow />
      <directionalLight position={[-5, 6, -5]} intensity={0.85} color="#73d8ff" />
      <pointLight position={[0, 2.4, 1.5]} intensity={1.4} color="#7fe9ff" distance={8} />
      <WaterSurface />
      <SampleCube />
    </>
  );
}

const PondBackdrop = () => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 2.2, 5.6], fov: 28 }}
      gl={{ antialias: true, alpha: true }}
      shadows
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#030a12"]} />
      <fog attach="fog" args={["#030a12", 8, 18]} />
      <PondScene />
    </Canvas>
  );
};

export default PondBackdrop;
