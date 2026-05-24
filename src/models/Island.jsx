

import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import IslandScene from '../assets/island_decor_gltf.glb';
export function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  ...props
}) {
  const islandRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(IslandScene);

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;


  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    lastX.current = clientX;
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      const delta = (clientX - lastX.current) / viewport.width;

      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      lastX.current = clientX;

      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);
  
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  }
  
  const handleTouchEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  }
  
  const handleTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
  
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
  
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  }

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchmove", handleTouchMove);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useFrame(() => {
    // apply dampening to slow rotation
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = islandRef.current.rotation.y;

      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

    return (
    <a.group ref={islandRef} {...props} dispose={null}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002.geometry}
      material={materials['Voro texture image']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_1.geometry}
      material={materials['Material.006']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_2.geometry}
      material={materials.Steel}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_3.geometry}
      material={materials.Wood}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_4.geometry}
      material={materials['WoodChest.003']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_5.geometry}
      material={materials['Steel.034']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_6.geometry}
      material={materials['Steel.030']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_7.geometry}
      material={materials['Steel.031']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_8.geometry}
      material={materials['Steel.036']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_9.geometry}
      material={materials['Steel.038']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_10.geometry}
      material={materials['Steel.032']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_11.geometry}
      material={materials['Steelgold.002']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_12.geometry}
      material={materials['Black.002']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_13.geometry}
      material={materials['Wood.001']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_14.geometry}
      material={materials['Material.005']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_15.geometry}
      material={materials['Coconuts.001']}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_16.geometry}
      material={materials.Coconuts}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Plane002_17.geometry}
      material={materials.Material}
    />
  </a.group>
)
  }
  
  export default Island;