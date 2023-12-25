import * as THREE from "three";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader, OBJLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { CameraControls, ContactShadows } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export default function ShowRoom() {
  const { raycaster, camera } = useThree();
  const cameraControlsRef = useRef<CameraControls>(null);

  const glb = useLoader(GLTFLoader, "./models/custom.glb");
  const [isFitting, setIsFitting] = useState(false);

  console.log("glb : ", glb);

  window.addEventListener("keydown", (e) => {
    console.log("e.key: ", e.key);

    switch (e.key) {
      case "a":
        cameraControlsRef.current?.setLookAt(-2, 0, 2, 0, 0, 0, true);
        break;
      case "b":
        cameraControlsRef.current?.setLookAt(0, 3, 0, 0, 0, 0, true);
        break;
    }
  });

  useEffect(() => {
    // glb.scene.children.forEach((shoes) => {
    //   shoes.children.forEach((mesh) => {
    //     mesh.castShadow = true;
    //   });
    // });

    cameraControlsRef.current?.setTarget(0, 0, 0, false);
    cameraControlsRef.current?.addEventListener("sleep", () => {
      console.log("sleep");
      setIsFitting(true);
    });
    cameraControlsRef.current?.addEventListener("control", () => {
      setIsFitting(false);
    });
  });

  let angle = 0;
  let dis = 3;
  useFrame(() => {
    console.log("isFitting : ", isFitting);

    if (!isFitting) {
      cameraControlsRef.current?.setPosition(
        dis * Math.sin(angle),
        0.8,
        dis * Math.cos(angle),
        true
      );
      angle = angle + 0.01;
    }

    const rightShoes = glb.scene.children[0];
    const leftShoes = glb.scene.children[1];

    // leftShoes.rotation.y = THREE.MathUtils.degToRad(300);
    // leftShoes.position.z = 0.3;

    rightShoes.rotation.y = THREE.MathUtils.degToRad(10);
    leftShoes.rotation.y = THREE.MathUtils.degToRad(335);
    leftShoes.rotation.z = THREE.MathUtils.degToRad(-30);
    leftShoes.position.x = -0.25;
    leftShoes.position.z = 0.37;
    leftShoes.position.y = 0.44;
  });

  const shoesClick = () => {
    console.log("shoesClick");
    const intersects = raycaster.intersectObjects(glb.scene.children, true);
    console.log("intersects : ", intersects);

    if (intersects.length > 0) {
      const firstObj = intersects[0].object as THREE.Mesh;
      // console.log("firstObj.name : ", firstObj.name);
      const firstMat = firstObj.material as THREE.MeshStandardMaterial;
      const cloneMat = firstMat.clone();

      firstObj.material = cloneMat;
      const mat = firstObj.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color("red");

      cameraControlsRef.current?.fitToBox(firstObj, true);
    }
  };

  return (
    <>
      <directionalLight position={[3, 3, 3]} />
      <pointLight position={[0, 1, 0]} intensity={3} />
      <CameraControls
        ref={cameraControlsRef}
        dollyToCursor={true}
        // default
        minDistance={0.5}
        maxDistance={10}
        onChange={() => {
          // console.log("onChanage");
          // console.log("camera.zoom : ", camera.zoom); // zoom은 3d 카메
          // console.log(" camera position : ", camera.position);
        }}
      />

      <mesh scale={5} position={[0, -0.51, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.2, 0.2, 50]} />
        <meshStandardMaterial />
      </mesh>
      <primitive onClick={shoesClick} object={glb.scene} />
      <ContactShadows
        position={[0, 0, 0]}
        scale={5}
        color="#000"
        resolution={512}
        opacity={0.8}
        blur={0.5}
      />
    </>
  );
}
