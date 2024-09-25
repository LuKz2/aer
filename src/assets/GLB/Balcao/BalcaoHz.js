import React from 'react';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

export function ThreeModelViewer({ color }) {
  const { nodes, materials } = useGLTF('../Glb/12.glb');

  // Função para modificar a cor dos materiais
  const modifyMaterialsColor = () => {
    const blackMaterial = materials['black low gloss plastic']; // Ajuste de material
    blackMaterial.color = new THREE.Color(color);
  };

  modifyMaterialsColor();

  // Calculando o centro do objeto para garantir que ele esteja centralizado
  const boundingBox = new THREE.Box3().setFromObject(nodes.Mesh_0);
  const center = boundingBox.getCenter(new THREE.Vector3());

  return (
    <group position={[-center.x-0.1, -center.y+0.2, -center.z]}> 
      <group>
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
          material={materials['black low gloss plastic']}
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
          material={materials['black low gloss plastic']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_12.geometry}
          material={materials['white led']}
        />
      </group>
    </group>
  );
}

useGLTF.preload('../Glb/12.glb');
