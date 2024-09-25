import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Urso(props) {
  const { nodes, materials } = useGLTF('/Glb/urso.glb'); // Se estiver na pasta public

  return (
    <group {...props} dispose={null}>
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
  )
}

useGLTF.preload('/Glb/urso.glb')