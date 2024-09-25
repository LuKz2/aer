import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function ExpositorPV(props) {
  const { nodes, materials } = useGLTF('../Glb/EXPOSITOR PORTO VISEU.glb');
  
  // Criação de uma caixa delimitadora para calcular o centro do modelo
  const boundingBox = new THREE.Box3().setFromObject(nodes.Mesh_0011);
  const center = boundingBox.getCenter(new THREE.Vector3());
  
  // Ajustar a posição para centralizar o modelo em relação ao centro da caixa delimitadora
  const adjustedPosition = [-center.x, -center.y, -center.z];

  return (
    <group {...props} dispose={null} position={adjustedPosition}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0011.geometry}
        material={materials['color-7']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0011_1.geometry}
        material={materials['clear glass']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0011_2.geometry}
        material={materials['amber led']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0011_3.geometry}
        material={materials['VIDRO PINTADO']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0011_4.geometry}
        material={materials['color-4']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0011_5.geometry}
        material={materials['pw-mt11040-4.002']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0011_6.geometry}
        material={materials['color-9']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0011_7.geometry}
        material={materials['color.002']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0011_8.geometry}
        material={materials['clear thick glass.015']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0011_9.geometry}
        material={materials['satin finish nickel']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0011_10.geometry}
        material={materials['color-5']}
      />
    </group>
  );
}

useGLTF.preload('../Glb/EXPOSITOR PORTO VISEU.glb');
