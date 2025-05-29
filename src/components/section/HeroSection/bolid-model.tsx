/* eslint-disable react/no-unknown-property */
import { BakeShadows, OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

import { Model } from "./model";

export function BolidModel() {
  return (
    <Canvas
      style={{ height: "400px" }}
      shadows
      camera={{ position: [5, 2, 5], fov: 10 }}
    >
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6} adjustCamera={0.7}>
          <group position={[10, -2, 10]} rotation={[0, -1.3, 0]}>
            <Model />
          </group>
        </Stage>
      </Suspense>
      <BakeShadows />
      <OrbitControls
        autoRotate
        autoRotateSpeed={1}
        enablePan={true}
        enableZoom={false}
        enableRotate={true}
        enableDamping
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.75}
      />
    </Canvas>
  );
}
