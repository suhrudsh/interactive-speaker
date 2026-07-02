import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";

function App() {
  return (
    <div className="h-svh w-full">
      <Canvas shadows>
        <Suspense>
          {import.meta.env.DEV && <axesHelper args={[5]} />}
          <Scene />
          <Environment
            files="EnvironmentMap.exr"
            background
            environmentIntensity={4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
