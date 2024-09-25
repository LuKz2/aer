import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function VitrinePP(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('../Glb/vitrinepp.glb');

  // Calculando o centro do objeto para centralizar o ponto de rotação
  const boundingBox = new THREE.Box3().setFromObject(nodes.Mesh_0016);
  const center = boundingBox.getCenter(new THREE.Vector3());

  return (
    <group ref={group} {...props} position={[-center.x, -center.y, -center.z]} dispose={null}>
      <group>
        <mesh geometry={nodes.Mesh_0016.geometry} material={materials['PERFIL PINTADO']} />
        <mesh geometry={nodes.Mesh_0016_1.geometry} material={materials['pw-mt11040-4.002']} />
        <mesh geometry={nodes.Mesh_0016_2.geometry} material={materials['clear thick glass.012']} />
        <mesh geometry={nodes.Mesh_0016_3.geometry} material={materials['pw-mt11040-5.002']} />
        <mesh geometry={nodes.Mesh_0016_4.geometry} material={materials['pw-mt11040-2.002']} />
        <mesh geometry={nodes.Mesh_0016_5.geometry} material={materials['pw-mt11040-6.002']} />
        <mesh geometry={nodes.Mesh_0016_6.geometry} material={materials['pw-mt11000.015']} />
        <mesh geometry={nodes.Mesh_0016_7.geometry} material={materials['pw-mt11000-1.015']} />
        <mesh geometry={nodes.Mesh_0016_8.geometry} material={materials['red high gloss plastic']} />
        <mesh geometry={nodes.Mesh_0016_9.geometry} material={materials['matte aluminum']} />
        <mesh geometry={nodes.Mesh_0016_10.geometry} material={materials['pw-mt11040-1.002']} />
        <mesh geometry={nodes.Mesh_0016_11.geometry} material={materials['satin finish nickel']} />
        <mesh geometry={nodes.Mesh_0016_12.geometry} material={materials['pw-mt11000-2.015']} />
        <mesh geometry={nodes.Mesh_0016_13.geometry} material={materials['amber led']} />
        <mesh geometry={nodes.Mesh_0016_14.geometry} material={materials['pw-mt11040-3.002']} />
        <mesh geometry={nodes.Mesh_0016_15.geometry} material={materials['VIDRO PINTADO']} />
        <mesh geometry={nodes.Mesh_0016_16.geometry} material={materials['pw-mt11040.002']} />
        <mesh geometry={nodes.Mesh_0016_17.geometry} material={materials['clear glass']} />
      </group>
    </group>
  );
}

useGLTF.preload('../Glb/vitrinepp.glb');
