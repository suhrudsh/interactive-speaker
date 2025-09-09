import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { Environment } from "@react-three/drei";

function App() {
  return (
    <div className="h-svh w-full">
      <Canvas shadows>
        {import.meta.env.DEV && <axesHelper args={[5]} />}
        <Scene />
        <Environment files="EnvironmentMap.exr" background />
      </Canvas>
    </div>
  );
}

export default App;
