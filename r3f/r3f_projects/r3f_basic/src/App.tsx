import "./App.css";
import { Canvas } from "@react-three/fiber";
import MaterialTest from "./MaterialTest";
import LightTest from "./LightTest";
import { OrbitControls } from "@react-three/drei";
import InteractionTest from "./InteractionTest";

function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{
          position: [5, 5, 5],
        }}
      >
        <color attach="background" args={["black"]} />
        <OrbitControls />
        <axesHelper args={[6]} />
        <gridHelper args={[10, 10]} />
        {/* <MaterialTest /> */}
        {/* <LightTest /> */}
        <InteractionTest />
      </Canvas>
    </>
  );
}

export default App;
