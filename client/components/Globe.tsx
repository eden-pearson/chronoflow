/* eslint-disable react/no-unknown-property */

import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  useProgress,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense } from 'react'

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return <Html center>{Math.floor(progress)} % loaded</Html>
}

function GlobeModel() {
  const { scene } = useGLTF('/assets/globe/scene.gltf')

  useFrame(({ clock }) => {
    scene.rotation.y = clock.getElapsedTime() * 0.5
  })

  return <primitive object={scene} scale={[2, 2, 2]} />
}

function Globe() {
  return (
    <div className="w-[45%] h-[36rem]">
      <Canvas>
        <Suspense fallback={<Loader />}>
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 40]}
            fov={75}
            aspect={window.innerWidth / window.innerHeight}
            near={0.1}
            far={1000}
          />
          <ambientLight intensity={1} />
          <OrbitControls enableZoom={false} />
          <group position={[0, 20, -5]}>
            <GlobeModel />
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Globe

// maxPolarAngle={0.1}
// minPolarAngle={0}
