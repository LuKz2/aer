import React, { useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Vitrine } from "./jsx_glb/Vitrine";
import { ChromePicker } from "react-color";
import Lottie from "react-lottie";
import animationData from '../../assets/lottie/360.json'



export default function Rotate() {
    const [color, setColor] = useState("#000");
    const [cameraPosition, setCameraPosition] = useState([2, 2, 2]);
    const [cameraTarget, setCameraTarget] = useState([0, 0, 0]);
    const controls = useRef();

    // Atualizar a posição e o alvo da câmera quando a cor é alterada
    const handleColorChange = (selectedColor) => {
        // Salvar a posição e o alvo da câmera antes de alterar a cor
        const currentPosition = controls.current.object.position.toArray();
        const currentTarget = controls.current.target.toArray();
    
        setColor(selectedColor.hex);
    
        // Definir o estado da cor primeiro e depois restaurar a posição e o alvo da câmera
        requestAnimationFrame(() => {
            controls.current.object.position.fromArray(currentPosition);
            controls.current.target.fromArray(currentTarget);
        });
    };

    // Configuração do Lottie
    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            minHeight: "100vh",
            position: "relative",
            background: "linear-gradient(90deg, rgba(25,25,25,1) 0%, rgba(25,25,25,1) 35%, rgba(58,62,62,1) 100%)"
        }}>
            <Canvas
                style={{ position: "absolute", margin: 0, left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ambientLight intensity={0.5} />
                <Environment preset="night" />
                <OrbitControls
                    ref={controls}
                    target={cameraTarget}
                    maxPolarAngle={Math.PI / 2}
                    minDistance={2}
                    maxDistance={2.5}
                    enablePan={false}
                    enableZoom={false}
                    position={cameraPosition} // Restaurar a posição da câmera
                />

                
                <Vitrine color={color} />
            </Canvas>
            <div style={{ position: "absolute", top: 400, right: 80 }}>
                <ChromePicker
                    color={color}
                    onChangeComplete={handleColorChange}
                />
            </div>
        </div>
    );
}
