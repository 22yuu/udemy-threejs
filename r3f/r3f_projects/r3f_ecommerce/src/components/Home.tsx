import { Canvas } from "@react-three/fiber";
import ShowRoom from "@components/three/ShowRoom";
import AppBar from "@components/AppBar";

export default function Home() {
  return (
    <>
      <AppBar />
      <Canvas shadows>
        <color attach={"background"} args={["#b7f2f1"]} />
        {/* <gridHelper /> */}
        {/* <axesHelper args={[5]} /> */}
        <ShowRoom />
      </Canvas>
    </>
  );
}
