import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Environment, useHelper, useTexture } from "@react-three/drei";

export default function LightTest() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Mesh>(null);

  const matcap = useTexture("./imgs/matcap1.jpg");
  const tone = useTexture("./imgs/fiveTone.jpg");

  useEffect(() => {
    const meshLength = groupRef.current!.children.length;
    for (let i = 0; i < meshLength; i++) {
      const mesh = groupRef.current!.children[i] as THREE.Mesh;
      mesh.geometry = meshRef.current!.geometry;
      mesh.position.x = (i % (meshLength / 2)) * 2 - 2;
      mesh.position.z = 0;

      if (i >= meshLength / 2) {
        mesh.position.z = 2;
      }
    }
  }, []);

  const dLight = useRef<THREE.DirectionalLight>(null!);
  useHelper(dLight, THREE.DirectionalLightHelper);

  const sLight = useRef<THREE.SpotLight>(null!);
  useHelper(sLight, THREE.SpotLightHelper);
  return (
    <>
      <directionalLight
        // castShadow 속성이 true이어야 그림자를 생성한다.
        castShadow
        // camera 속성은 빛의 영향으로 그림자가 생길 수 있는 영역이 있는데, 그 영역을 4방향으로 설정한다.
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        // mapSize는 그림자의 텍스쳐를 설정해준다. 값이 클수록 그림자가 뚜렷해진다. 기본값은 512, 512이다.
        shadow-mapSize={[1024, 1024]}
        ref={dLight}
        color={"#fff"}
        position={[0, 5, 0]}
        intensity={5}
        target-position={[0, 0, 0]}
      />

      {/* <pointLight
        color={"#fff"}
        position={[0, 0, 2]}
        intensity={50}
        distance={5}
      /> */}
      {/* <spotLight
        ref={sLight}
        color={"#fff"}
        position={[0, 5, 0]}
        intensity={300}
        distance={10}
        angle={THREE.MathUtils.degToRad(40)}
        target-position={[0, 0, 0]}
        penumbra={0.5}
      /> */}

      {/* 지면을 나타내는 mesh의 경우 그림자를 생성할 때 receiveShadow만 true로 설정한다. */}
      <mesh
        rotation-x={[THREE.MathUtils.degToRad(-90)]}
        position-y={-1}
        receiveShadow
      >
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color={"#020059"} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.2]} />
        <meshBasicMaterial color="green" visible={false} />
      </mesh>
      <group ref={groupRef}>
        {/* 오브젝트의 그림자를 표현해주기 위해서는 castShadow, receiveShadow 모두 true로 설정해야 한다. */}
        <mesh castShadow receiveShadow>
          <meshLambertMaterial
            color="red"
            visible={true}
            transparent={false}
            opacity={1}
            side={THREE.FrontSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={true}
            fog={false}
            // emissive={"yellow"} /*default #000 (black) */
          />
        </mesh>
        <mesh castShadow receiveShadow>
          <meshPhongMaterial
            color="red"
            visible={true}
            transparent={false}
            opacity={1}
            side={THREE.FrontSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={true}
            fog={false}
            emissive={"black"} /*default #000 (black) */
            specular={"#fff"}
            shininess={40}
            flatShading={true}
          />
        </mesh>
        <mesh castShadow receiveShadow>
          <meshStandardMaterial
            color="red"
            visible={true}
            transparent={false}
            opacity={1}
            side={THREE.FrontSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={true}
            fog={false}
            emissive={"black"}
            roughness={1}
            metalness={0}
            flatShading={true}
          />
        </mesh>
        <mesh castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#fff"
            visible={true}
            transparent={true}
            opacity={1}
            side={THREE.FrontSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={true}
            fog={true}
            emissive={"black"}
            roughness={0}
            metalness={0}
            clearcoat={0}
            clearcoatRoughness={0}
            transmission={1}
            thickness={0.5}
            ior={2.33} /* ior: 굴절율 max 값은 2.33이다. */
            // flatShading={true}
          />
        </mesh>
        <mesh castShadow receiveShadow>
          <meshToonMaterial gradientMap={tone} color="pink" />
        </mesh>
      </group>
    </>
  );
}
