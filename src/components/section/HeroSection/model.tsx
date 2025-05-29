/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";
import type { Object3D } from "three";

useGLTF.preload("/bolid-opt.glb");

export function Model({ path = "/bolid-opt.glb" }: { path?: string }) {
  const model = useGLTF(path, true);

  return (
    // <PresentationControls
    //   global
    //   polar={[-0.4, 0.2]}
    //   speed={0}
    //   azimuth={[-0.4, 0.2]}
    // >
    //   <primitive object={model.scene as Object3D} position-y={1.2} />
    // </PresentationControls>
    <primitive object={model.scene as Object3D} />
  );
}
