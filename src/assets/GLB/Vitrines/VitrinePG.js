import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function VitrinePG(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('../Glb/VITRINE PORTO GALICIA.glb');

  // Calculando o centro do objeto para centralizar o ponto de rotação
  const boundingBox = new THREE.Box3().setFromObject(nodes.Mesh_0);
  const center = boundingBox.getCenter(new THREE.Vector3());

  return (
    <group ref={group} {...props} position={[-center.x, -center.y, -center.z]}>
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0.geometry}
          material={materials['PERFIL PINTADO']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_1.geometry}
          material={materials['pw-mt11000-3']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_2.geometry}
          material={materials['pw-mt11000-1']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_3.geometry}
          material={materials['pw-mt11000']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_4.geometry}
          material={materials['VIDRO PINTADO']}
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
          material={materials['pw-mt11000-2']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_7.geometry}
          material={materials['matte aluminum']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_8.geometry}
          material={materials['white satin finish plastic']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_9.geometry}
          material={materials['red low gloss plastic']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_10.geometry}
          material={materials['white low gloss plastic']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_11.geometry}
          material={materials['amber led']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_12.geometry}
          material={materials['clear glass']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_13.geometry}
          material={materials['satin finish nickel']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_14.geometry}
          material={materials['pw-mt11000-4']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0_15.geometry}
          material={materials['beige low gloss plastic']}
        />
      </group>
    </group>
  );
}

useGLTF.preload('../Glb/VITRINE PORTO GALICIA.glb');
