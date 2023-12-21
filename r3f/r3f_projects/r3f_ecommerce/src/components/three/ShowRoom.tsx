import * as THREE from "three";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader, OBJLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import { useLoader, useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

export default function ShowRoom() {
  const { raycaster, camera } = useThree();

  const glb = useLoader(GLTFLoader, "./models/custom.glb");

  console.log("glb : ", glb);

  const shoesClick = () => {
    console.log("shoesClick");
    const intersects = raycaster.intersectObjects(glb.scene.children, true);
    console.log("intersects : ", intersects);

    if (intersects.length > 0) {
      const firstObj = intersects[0].object as THREE.Mesh;
      console.log("firstObj.name : ", firstObj.name);
      const firstMat = firstObj.material as THREE.MeshStandardMaterial;
      const cloneMat = firstMat.clone();

      firstObj.material = cloneMat;
      const mat = firstObj.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color("red");
    }
  };

  return (
    <>
      <directionalLight position={[3, 3, 3]} />
      <CameraControls
        dollyToCursor={true}
        // default
        minDistance={2}
        maxDistance={10}
        onChange={() => {
          console.log("onChanage");
          console.log("camera.zoom : ", camera.zoom); // zoom은 3d 카메
          console.log(" camera position : ", camera.position);
        }}
      />
      <primitive onClick={shoesClick} object={glb.scene} />
    </>
  );
}
