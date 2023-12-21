import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export default function MaterialTest() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Mesh>(null);

  const controls = useControls({
    thickness: { value: 0.1, min: 0.1, max: 10, step: 0.1 },
  });

  const matcap = useTexture("./imgs/matcap1.jpg");
  const tone = useTexture("./imgs/fiveTone.jpg");

  useEffect(() => {
    const meshLength = groupRef.current!.children.length;
    for (let i = 0; i < meshLength; i++) {
      const mesh = groupRef.current!.children[i] as THREE.Mesh;
      mesh.geometry = meshRef.current!.geometry;
      mesh.position.x = (i % (meshLength / 2)) * 2 - 4;
      mesh.position.z = 0;

      if (i >= meshLength / 2) {
        mesh.position.z = 2;
      }
    }
  }, []);

  return (
    <>
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* <fog attach={"fog"} args={["blue", 3, 4]} /> */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.2]} />
        <meshBasicMaterial color="green" visible={false} />
      </mesh>
      <group ref={groupRef}>
        <mesh position={[0, 0, 0]}>
          <meshBasicMaterial wireframe color="green" />
        </mesh>
        <mesh>
          <meshBasicMaterial
            color="red"
            visible={true}
            transparent={false}
            opacity={1}
            side={THREE.FrontSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={true}
            fog={false}
          />
        </mesh>
        <mesh>
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
            emissive={"yellow"} /*default #000 (black) */
          />
        </mesh>
        <mesh>
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
        <mesh>
          <meshNormalMaterial />
        </mesh>
        <mesh>
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
        <mesh>
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
            thickness={controls.thickness}
            ior={2.33} /* ior: 굴절율 max 값은 2.33이다. */
            // flatShading={true}
          />
        </mesh>
        <mesh>
          <meshDepthMaterial />
        </mesh>
        <mesh>
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
        <mesh>
          <meshToonMaterial gradientMap={tone} color="pink" />
        </mesh>
      </group>
    </>
  );
}
