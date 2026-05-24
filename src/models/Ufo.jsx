import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber"; 
import ufoScene from '../assets/ufo.glb';

const Ufo = ({ isRotating, ...props }) => {
    const ref = useRef();
    const { scene } = useGLTF(ufoScene);

    // Bobbing animation variables
    const bobbingSpeed = 4.5; 
    const bobbingHeight = 0.4; 

    const initialPosition = useRef([0, 0, 0]);

    //Initialize initial position
    useEffect(() => {
        if (ref.current) {
            initialPosition.current = [...ref.current.position];
        }
    }, []);

    // Animation loop for bobbing
    useFrame((state) => {
        if (ref.current) {
            const time = state.clock.getElapsedTime(); 
            const [x, y, z] = initialPosition.current;  
            ref.current.position.set(x, y + Math.sin(time * bobbingSpeed) * bobbingHeight, z);
        }
    });


    return (
        <mesh {...props} ref={ref}>
            {}
            <primitive object={scene} />
        </mesh>
    );
};

export default Ufo;