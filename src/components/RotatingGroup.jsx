import React, { useRef, useState, useEffect, useCallback} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import IconSphere from "./IconSphere";
import * as THREE from "three"; 


const interpolateColor = (color1, color2, t) => {
  const c1 = new THREE.Color(color1);
  const c2 = new THREE.Color(color2);
  return c1.lerp(c2, t); // Linearly interpolate between colors
};


const RotatingGroup = ({ icons}) => {
  const groupRef = useRef();
  const { gl, viewport } = useThree();

  const [isRotating, setIsRotating] = useState(false);

  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  const color1 = "#325154"; 
  const color2 = "#2c0f4a"; 
  
  const colorArray = icons.map((_, i) => {
    const t = i / (icons.length - 1); // Calculate t based on position
    return interpolateColor(color1, color2, t);
  });


  

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  }, [setIsRotating]);

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  }, [setIsRotating]);


  // Handle pointer (mouse or touch) move event
  const handlePointerMove =  useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the circle's rotation based on the mouse/touch movement
      groupRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  }, [isRotating, viewport.width]);

  // Handle keydown events
  const handleKeyDown = useCallback((event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      groupRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      groupRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  }, [isRotating, setIsRotating]);

  // Handle keyup events
  const handleKeyUp = useCallback((event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  }, []);

  // Touch events for mobile devices
  const handleTouchStart = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);
  
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  }, [setIsRotating]);
  
  const handleTouchEnd = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  }, [setIsRotating]);
  
  const handleTouchMove = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
  
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
  
      groupRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  }, [isRotating, viewport.width]);

    // Add event listeners for pointer and keyboard events
  useEffect(() => {
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
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove, handleKeyDown, handleKeyUp, handleTouchStart, handleTouchEnd, handleTouchMove]);

  useFrame(() => {
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = .001;
      }

      groupRef.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on circles orientation
      const rotation = groupRef.current.rotation.y;
    }
});


      return (
        <group
          ref={groupRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
        >
          {icons.map((icon, index) => {
            const angle = (index / icons.length) * Math.PI * 2; // Calculate angle for circular layout
            
            
            const radius = 3; // Distance from the center
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const scale = [0.7, 0.7, 0.7];
            const rotationY = -angle + (Math.PI/2);
            const color = colorArray[index];
            console.log(`color: `,color);
    
            return (
              <IconSphere
                key={index}
                position={[x, 0, z]}
                rotationY={rotationY}
                icon={icon}
                scale={scale}
                color={color}
                />
            );
          })}
        </group>
      );
    };
    
    export default RotatingGroup;