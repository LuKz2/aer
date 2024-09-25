import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function Deposito(props) {
  const groupRef = useRef(); // Ref para o grupo principal do modelo
  const { nodes, materials } = useGLTF('../Glb/ESTANTE DEPOSITO.glb');

  // Criação de uma caixa delimitadora para calcular o centro do modelo
  useEffect(() => {
    if (groupRef.current) {
      const boundingBox = new THREE.Box3().setFromObject(groupRef.current);
      const center = boundingBox.getCenter(new THREE.Vector3());

      // Ajusta a posição do grupo para centralizar o modelo
      groupRef.current.position.set(-center.x, -center.y, -center.z);
    }
  }, [nodes]);

  return (
    <group
      ref={groupRef}
      {...props}
      dispose={null}
      // Aqui você pode ajustar o valor de scale para diminuir o tamanho do modelo
      scale={[0.6, 0.6, 0.6]} // Reduz o tamanho do modelo para 10% do original
    >
      <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes?.Mesh_0008?.geometry}
          material={materials['satin finish nickel']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes?.Mesh_0008_1?.geometry}
          material={materials['color-1.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes?.Mesh_0008_2?.geometry}
          material={materials['pw-mt11000-4']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes?.Mesh_0008_3?.geometry}
          material={materials['satin finish nickel']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes?.Mesh_0008_4?.geometry}
          material={materials.COLUNA}
        />
      </group>
    </group>
  );
}

// Carrega o GLB antes de renderizar o componente
useGLTF.preload('../Glb/ESTANTE DEPOSITO.glb');
