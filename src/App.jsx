import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { SongDetails } from "./components/SongDetails";
import { useSpeakerAudio } from "./utils/useSpeakerAudio";

function App() {
  const {
    handleAudioToggle,
    getLevel,
    isPlaying,
    audioEl,
    audioContext,
    currentTrack,
  } = useSpeakerAudio();

  return (
    <>
      <SongDetails
        audioEl={audioEl}
        track={currentTrack}
        isPlaying={isPlaying}
      />
      <div className="h-svh w-full">
        <Canvas shadows>
          <Suspense>
            {import.meta.env.DEV && <axesHelper args={[5]} />}
            <Scene
              handleAudioToggle={handleAudioToggle}
              getLevel={getLevel}
              isPlaying={isPlaying}
              audioEl={audioEl}
              audioContext={audioContext}
            />
            <Environment
              files="EnvironmentMap.exr"
              background
              environmentIntensity={4}
            />
          </Suspense>
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </>
  );
}

export default App;
