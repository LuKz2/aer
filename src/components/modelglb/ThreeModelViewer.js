import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ThreeModelViewer(props) {
  const { nodes, materials } = useGLTF('../Glb/12.glb');
  const groupRef = useRef(); // Referência ao grupo que será rotacionado
  const modelRef = useRef(); // Referência ao modelo em si

  // Calcular a caixa delimitadora e o centro
  useEffect(() => {
    if (modelRef.current) {
      const boundingBox = new THREE.Box3().setFromObject(modelRef.current);
      const center = boundingBox.getCenter(new THREE.Vector3());

      // Ajustar o modelo para que o centro fique na origem
      modelRef.current.position.x = -center.x;
      modelRef.current.position.y = -center.y;
      modelRef.current.position.z = -center.z;
    }
  }, []);

  // Usar react-spring para animar a escala do modelo
  const { scale } = useSpring({
    from: { scale: 0 }, // Começa pequeno
    to: { scale: 1 }, // Termina no tamanho normal
    config: { mass: 1, tension: 170, friction: 26 },  // Controle da suavidade da animação
  });

  // Roda o modelo continuamente em torno do eixo Y
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005; // Ajuste a velocidade de rotação aqui
    }
  });

  return (
    <animated.group
      {...props}
      dispose={null}
      scale={scale}   // Aplica a animação de escala
      ref={groupRef}  // Referência para o grupo que está sendo rotacionado
    >
      <group ref={modelRef} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0.geometry}
          material={materials.Material_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_1.geometry}
          material={materials['black low gloss plastic']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_2.geometry}
          material={materials['red low gloss plastic']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_3.geometry}
          material={materials['white low gloss plastic']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_4.geometry}
          material={materials['light grey low gloss plastic']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_5.geometry}
          material={materials['clear thick glass']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_6.geometry}
          material={materials['matte steel']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_7.geometry}
          material={materials['beige low gloss plastic']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_8.geometry}
          material={materials.color}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_9.geometry}
          material={materials['clear glass']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_10.geometry}
          material={materials['matte aluminum']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_11.geometry}
          material={materials['dark grey low gloss plastic']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_12.geometry}
          material={materials['white led']}
        />
      </group>
    </animated.group>
  );
}

useGLTF.preload('../Glb/12.glb');
