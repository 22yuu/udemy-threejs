import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export default function InteractionTest() {
  const { camera, scene, raycaster, pointer } = useThree();

  const groupClickFunc = (e: any) => {
    console.log("GroupClickFunc e : ", e);

    raycaster.setFromCamera(pointer, camera); // -> raycaster를 만들건데 어떤 포인터에서 보고 있는 카메라로 만들거냐

    // const intersects = raycaster.intersectObject(scene, true); // scene을 넣게되면 scene 안에 있는 모든 요소들을 잡아버린다.(mesh, axes helper, grid helper 등);
    const intersects = raycaster.intersectObject(e.eventObject, true); // 하지만 우리가 원하는건 group 안에 있는 mesh 정보만 레이캐스터로 가져오고 싶을 때 e.eventObject를 넘겨주면 된다.

    console.log("intersects : ", intersects);

    if (intersects.length > 0) {
      console.log("intersects[0] : ", intersects[0]);

      const mesh = intersects[0].object as any;
      mesh.material.color = new THREE.Color("red");
    }
  };

  return (
    <>
      <ambientLight />
      <directionalLight intensity={5} />
      <group onClick={(e) => groupClickFunc(e)}>
        <mesh
          // onClick={(e) => clickFunc(e)}
          position={[-2, 0, 0]}
        >
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <mesh
          // onClick={(e) => clickFunc(e)}
          position={[0, 0, 0]}
        >
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <mesh
          // onClick={(e) => clickFunc(e)}
          position={[2, 0, 0]}
        >
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </group>
    </>
  );
}
