import { Canvas } from "@react-three/fiber";
import ShowRoom from "@components/three/ShowRoom";
import { OrbitControls } from "@react-three/drei";

export default function Home() {
  return (
    <>
      <Canvas>
        <gridHelper />
        <axesHelper args={[5]} />
        <ShowRoom />
      </Canvas>
    </>
  );
}
