import React, { useRef } from 'react'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'; // Adicionando a importação do THREE

export function Vitrine({ color }) {
  const { nodes, materials } = useGLTF('/12.glb')

  const modifyMaterialsColor = () => {
    const blackMaterial = materials['black low gloss plastic']; // Substitua 'nome_do_seu_material_preto' pelo nome real do material preto no seu modelo
    blackMaterial.color = new THREE.Color(color);
  };

  modifyMaterialsColor();

  const boundingBox = new THREE.Box3().setFromObject(nodes.Mesh_0);
  const center = boundingBox.getCenter(new THREE.Vector3());

  return (
    <group position={[-center.x, -center.y, -center.z]}>
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
          material={materials['black low gloss plastic']} // 
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
          material={materials['black low gloss plastic']}  //
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_12.geometry}
          material={materials['white led']}
        />
   
      </group>
     
    </group>
  )
}

useGLTF.preload('/12.glb')
