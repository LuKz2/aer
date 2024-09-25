import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { ChromePicker } from "react-color";
import * as THREE from 'three';
import { useSpring as useThreeSpring, animated as threeAnimated } from '@react-spring/three';
import { Box } from '@mui/material';
import { useSpring as useWebSpring, animated as webAnimated } from '@react-spring/web';
import { Vitrine } from "./jsx_glb/Vitrine";

// Componente Urso - modelo GLB
export function Urso(props) {
    const { nodes, materials } = useGLTF('../Glb/urso.glb'); // Verifique o caminho do GLB
    const groupRef = useRef(); // Referência ao grupo do urso

    // Use `useFrame` para atualizar a rotação do urso em cada frame
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.01; // Ajuste a velocidade de rotação aqui
        }
    });

    return (
        <group ref={groupRef} {...props} dispose={null} scale={[15, 15, 15]}> {/* Aumentei o tamanho */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh_0.geometry}
                material={materials['dark grey high gloss plastic']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh_0_1.geometry}
                material={materials['blue high gloss plastic']}
            />
        </group>
    );
}

useGLTF.preload('../Glb/urso.glb'); // Pré-carregar o GLB

export default function Rotate() {
    const [color, setColor] = useState("#000");
    const [loaded, setLoaded] = useState(false);
    const [animated, setAnimated] = useState(false);
    const [lightsOn, setLightsOn] = useState(false);
    const [exiting, setExiting] = useState(false);
    const [fadeOut, setFadeOut] = useState(false); // Estado para fade out
    const [showAnimation, setShowAnimation] = useState(false); // Estado para mostrar animação
    const [interacting, setInteracting] = useState(false); // Novo estado para controlar a interação
    const controls = useRef();

    // Animação de entrada e desaparecimento para o texto e o Color Picker
    const textAndPickerAnimation = useWebSpring({
        opacity: interacting ? 0 : (lightsOn ? 1 : 0), // Se estiver interagindo, fade out; senão, entra quando as luzes estão acesas
        config: { duration: 500 }, // Duração da animação
    });

    // Animação para o GLB (substituindo o Lottie)
    const glbAnimation = useWebSpring({
        opacity: fadeOut ? 0 : (showAnimation ? 1 : 0),
        transform: fadeOut ? 'translateY(30px)' : 'translateY(0px)',
        config: { duration: 1000 },
    });

    // Animação para a entrada (descida) da vitrine
    const entryAnimation = useThreeSpring({
        vitrinePosition: animated && !exiting ? [0, 0, 0] : [0, 10, 0],
        lightIntensity: lightsOn && !exiting ? 2 : 0,
        config: {
            mass: 2,
            tension: 150, // Um pouco mais rápido na descida
            friction: 70, // Suave mas rápida
        },
        onRest: () => {
            if (!exiting) {
                setLightsOn(true);
            } else {
                setLoaded(false);
            }
        },
    });

    // Controle de exibição do 3D após o placeholder
    useEffect(() => {
        const section = document.getElementById('rotate-section');
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowAnimation(true);
                    observer.unobserve(section);
                }
            },
            { threshold: 0.2 }
        );
        if (section) observer.observe(section);
        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    // Funções que controlam quando o usuário começa e para de interagir com a vitrine
    const handleStartInteraction = () => {
        setInteracting(true); // Esconde o texto e o Color Picker
    };

    const handleEndInteraction = () => {
        setInteracting(false); // Mostra novamente o texto e o Color Picker
    };

    const handleColorChange = (newColor) => {
        setColor(newColor.hex);
    };

    const handleLoad3D = () => {
        setFadeOut(true);
        setTimeout(() => {
            setAnimated(true);
            setLoaded(true);
            setExiting(false);
            setShowAnimation(false);
        }, 1000);
    };

    const handleUnload3D = () => {
        // Adiciona o efeito de saída para o texto e Color Picker
        setInteracting(true); // Ativa o fade out e move os elementos para cima

        setLightsOn(false);
        setExiting(true);

        setTimeout(() => {
            setLoaded(false);
            setShowAnimation(false);
        }, 500);

        setTimeout(() => {
            setFadeOut(false);
            setShowAnimation(true);
            setInteracting(false); // Reseta a animação após o fade out
        }, 1000);
    };

    return (
        <>
            <style>
                {`
                    @keyframes gradienteMove {
                        0% { background-position: 0% 0%; }
                        50% { background-position: 100% 100%; }
                        100% { background-position: 0% 0%; }
                    }

                    .animated-bg {
                        background: linear-gradient(180deg, #0a0a0a 20%, #1c1c1c 60%, #0a0a0a 100%);
                        animation: gradienteMove 5s ease-in-out infinite;
                        width: 100vw;
                        height: 100vh;
                        position: relative;
                        overflow: hidden;
                    }

                    .info-text {
                        color: white;
                        font-size: 18px;
                        margin-left: 20px;
                        font-family: Arial, sans-serif;
                    }
                `}
            </style>
            <div id="rotate-section" className="animated-bg" style={{ minHeight: '110vh' }}>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        filter: loaded ? 'none' : 'blur(20px)',
                        transition: 'filter 0.5s ease',
                        zIndex: 1,
                    }}
                >
                    <Canvas
                        shadows={{ type: THREE.PCFSoftShadowMap }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                        }}
                        gl={{
                            antialias: true, // Ativa o anti-aliasing
                            toneMapping: THREE.ACESFilmicToneMapping, // Ajusta o tone mapping para uma melhor qualidade de renderização
                        }}
                    >
                        {/* Luz ambiente e luz direcional */}
                        <threeAnimated.ambientLight intensity={entryAnimation.lightIntensity} />
                        <threeAnimated.directionalLight
                            position={[0, 5, 5]}
                            intensity={entryAnimation.lightIntensity}
                            castShadow
                            shadow-mapSize-width={4096} // Aumenta a resolução das sombras
                            shadow-mapSize-height={4096}
                            shadow-bias={-0.0001}
                        />
                        <threeAnimated.directionalLight
                            position={[0, 5, -5]}
                            intensity={entryAnimation.lightIntensity}
                            castShadow
                            shadow-mapSize-width={4096}
                            shadow-mapSize-height={4096}
                            shadow-bias={-0.0001}
                        />

                        <OrbitControls
                            ref={controls}
                            target={[0, 0, 0]}
                            maxPolarAngle={Math.PI / 2}
                            minDistance={2}
                            maxDistance={2.5}
                            enablePan={false}
                            enableZoom={false}
                            enableRotate={true}
                            onStart={handleStartInteraction} // Quando o usuário começa a interagir
                            onEnd={handleEndInteraction}    // Quando o usuário para de interagir
                        />

                        {/* Palco fixo, sem sombras */}
                        <mesh
                            position={[0, -0.7, -0.15]}
                            rotation={[0, 0, 0]}
                            receiveShadow={false} // Sem receber sombras
                        >
                            <cylinderGeometry args={[1.7, 1.7, 0.15, 64]} />
                            <meshStandardMaterial color={"#000"} roughness={0.7} metalness={0.2} />
                        </mesh>

                        {/* Vitrine com sombras */}
                        <threeAnimated.group position={entryAnimation.vitrinePosition} rotation={[0, 4.6, 0]}>
                            <Vitrine color={color} castShadow={true} receiveShadow={true} />
                        </threeAnimated.group>
                    </Canvas>
                </div>

                {!loaded || exiting ? (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 2,
                        }}
                    >
                        <div>
                            <button
                                onClick={handleLoad3D}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                }}
                            >
                                <webAnimated.div style={glbAnimation}>
                                    {/* Substituindo o Lottie por um modelo GLB (Urso) */}
                                    <Canvas style={{ height: 150, width: 150 }} shadows>
                                        {/* Luz ambiente suave para iluminar o urso de todos os lados */}
                                        <ambientLight intensity={1.2} />

                                        {/* Luzes direcionadas para iluminar o urso de diferentes ângulos */}
                                        <spotLight
                                            intensity={1.5}
                                            position={[5, 5, 5]}
                                            angle={0.5}
                                            penumbra={1}
                                            castShadow
                                            shadow-mapSize-width={1024}
                                            shadow-mapSize-height={1024}
                                        />
                                        <spotLight
                                            intensity={1.5}
                                            position={[-5, 5, 5]}
                                            angle={0.5}
                                            penumbra={1}
                                            castShadow
                                            shadow-mapSize-width={1024}
                                            shadow-mapSize-height={1024}
                                        />
                                        <spotLight
                                            intensity={1.5}
                                            position={[0, -5, 5]}
                                            angle={0.5}
                                            penumbra={1}
                                            castShadow
                                            shadow-mapSize-width={1024}
                                            shadow-mapSize-height={1024}
                                        />

                                        {/* Adicionando um Environment para o urso */}
                                        <Environment preset="city" background={false} /> {/* Preset de ambiente, você pode ajustar */}

                                        <Urso />
                                    </Canvas>
                                    <p style={{ color: 'white', marginTop: '10px' }}>Visualizar 3D</p>
                                </webAnimated.div>


                            </button>
                        </div>
                    </div>
                ) : null}

                {loaded && !exiting && (
                    <>
                        {/* Botão de descarregar (Sair do 3D) */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '90px',
                                right: '50px',
                                zIndex: 10000,
                            }}
                        >
                            <button
                                onClick={handleUnload3D}
                                style={{
                                    backgroundColor: '#242525',
                                    border: 'none',
                                    color: 'white',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                }}
                            >
                                Sair do 3D
                            </button>
                        </div>

                        {/* Texto com animação de entrada e desaparecimento */}
                        <webAnimated.div
                            style={{
                                ...textAndPickerAnimation,
                                position: 'absolute',
                                top: '350px',
                                left: '40px',
                                zIndex: 2,
                            }}
                        >
                            <div className="info-text">
                                <h1 style={{ color: '#393c41', fontWeight: 80, lineHeight: 1.2, fontSize: '100px' }}>
                                    Vitrine
                                </h1>
                                <p style={{ fontSize: '30px', color: '#FFF' }}>
                                    Design Moderno e Eficiente
                                </p>
                            </div>
                        </webAnimated.div>

                        {/* Color Picker com animação de entrada e desaparecimento */}
                        <webAnimated.div
                            style={{
                                ...textAndPickerAnimation,
                                position: 'absolute',
                                bottom: '440px',
                                right: '60px',
                                zIndex: 2,
                            }}
                        >
                            <Box
                                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            >
                                <ChromePicker color={color} onChangeComplete={handleColorChange} />
                            </Box>
                        </webAnimated.div>
                    </>
                )}
            </div>
        </>
    );
}
