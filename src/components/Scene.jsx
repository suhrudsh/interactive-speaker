import {
  Helper,
  PerspectiveCamera,
  useAnimations,
  useCursor,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { createNoise2D } from "simplex-noise";
import {
  CameraHelper,
  DirectionalLightHelper,
  DoubleSide,
  LoopOnce,
  SpotLightHelper,
  Vector3,
} from "three";
import { RingEmissiveMaterial } from "../shaders/ring/RingEmissiveMaterial";
import { useSpeakerAudio } from "../utils/useSpeakerAudio";
import gsap from "gsap";

export function Scene(props) {
  const group = useRef();
  const leafTexture = useTexture(`${import.meta.env.BASE_URL}leaf-gobo.webp`);
  const leafPlaneRef = useRef();
  const lightRingMaterialRef = useRef();
  const playButtonRef = useRef();
  const powerButtonRef = useRef();
  const volumeUpButtonRef = useRef();
  const volumeDownButtonRef = useRef();

  const [isPowerOn, setIsPowerOn] = useState(false);
  const [volume, setVolume] = useState(1);

  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const { nodes, materials, animations } = useGLTF(
    `${import.meta.env.BASE_URL}speaker-desk-scene-optimised.glb`,
  );

  const { actions, mixer } = useAnimations(animations, group);
  useEffect(() => {
    if (!actions.CameraAction) return;

    const timeoutId = setTimeout(() => {
      actions.CameraAction.reset().setLoop(LoopOnce, 1);
      actions.CameraAction.clampWhenFinished = true;
      actions.CameraAction.play();
      mixer.addEventListener("finished", handlePowerToggle);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const noise2D = useMemo(() => createNoise2D(), []);
  const basePosition = useRef(new Vector3(-3.5, 2, 0.8));

  useFrame((state) => {
    if (!leafPlaneRef.current) return;
    const t = state.clock.elapsedTime;

    const noiseX = noise2D(t * 0.15, 0);
    const noiseRotZ = noise2D(t * 0.15, 200);

    leafPlaneRef.current.position.x = basePosition.current.x + noiseX * 0.01;
    leafPlaneRef.current.rotation.z = noiseRotZ * 0.03;
  });

  const { handleAudioToggle, getLevel, isPlaying, audioEl } = useSpeakerAudio();

  useFrame((state, delta) => {
    if (!lightRingMaterialRef.current || !isPowerOn) return;
    const level = getLevel();
    lightRingMaterialRef.current.uniforms.uRotationOffset.value +=
      delta * 0.02 * (level + 10);
    lightRingMaterialRef.current.uniforms.uAudioLevel.value = 1 + level;
  });

  function handleVolumeUp() {
    setVolume((prevVolume) =>
      Math.min(Math.round((prevVolume + 0.1) * 10) / 10, 1),
  );
  }

  function handleVolumeDown() {
  setVolume((prevVolume) =>
    Math.max(Math.round((prevVolume - 0.1) * 10) / 10, 0),
);
  }

useEffect(() => {
  if (!audioEl) return;
  audioEl.volume = volume;
}, [audioEl, volume]);

  function handlePowerToggle() {
    if (isPowerOn) setIsPowerOn(false);
    if (isPlaying) handleAudioToggle();
    gsap.to(lightRingMaterialRef.current.uniforms.uPowerProgress, {
      value: isPowerOn ? 0 : 1,
      duration: 1.2,
      ease: isPowerOn ? "power2.in" : "power2.out",
      onComplete: () => {
        if (!isPowerOn) setIsPowerOn(true);
      },
    });
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Room"
          castShadow
          receiveShadow
          geometry={nodes.Room.geometry}
          material={materials["Painted Plaster Wall"]}
        />
        <directionalLight
          name="Starlight_Sun"
          intensity={15}
          decay={2}
          position={[-10, 5, 10]}
          color={"#ffa239"}
          castShadow
          shadow-mapSize={[1024 * 8, 1024 * 8]}
          shadow-bias={-0.00002}
          shadow-normalBias={0.0027}
        >
          {import.meta.env.DEV && (
            <Helper type={DirectionalLightHelper} args={[5, "yellow"]} />
          )}
        </directionalLight>
        <mesh
          ref={leafPlaneRef}
          position={[-3.5, 2, 0.8]}
          rotation={[-Math.PI / 10, -Math.PI / 6, 0]}
          castShadow
        >
          <planeGeometry args={[1.25, 1.25]} />
          <meshBasicMaterial
            alphaMap={leafTexture}
            alphaTest={0.5}
            transparent
            side={DoubleSide}
          />
        </mesh>
        <PerspectiveCamera
          name="Camera"
          makeDefault
          far={100}
          near={0.1}
          fov={22.037}
          position={[0, 1.116, -2.29]}
          rotation={[-1.541, 0, 0]}
        >
          {import.meta.env.DEV && (
            <Helper type={CameraHelper} args={[5, "yellow"]} />
          )}
        </PerspectiveCamera>
        <group
          name="Sliding_window"
          position={[-2.654, 1.054, 0.75]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <mesh
            name="Cube064"
            castShadow
            receiveShadow
            geometry={nodes.Cube064.geometry}
            material={materials["esquadria branca"]}
          />
          <mesh
            name="Cube064_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube064_1.geometry}
            material={materials["Borracha preta"]}
          />
          <mesh
            name="Cube064_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube064_2.geometry}
            material={materials["Plastico preto"]}
          />
          <mesh
            name="Cube064_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube064_3.geometry}
            material={materials.Vermelho3425}
          />
        </group>
        <mesh
          name="Succulent_plant"
          castShadow
          receiveShadow
          geometry={nodes.Succulent_plant.geometry}
          material={materials.porcelain}
          position={[0.149, 0.57, -2.501]}
          rotation={[Math.PI, 0, Math.PI]}
        >
          <mesh
            name="ground_real"
            castShadow
            receiveShadow
            geometry={nodes.ground_real.geometry}
            material={materials["Mud and grass"]}
            position={[0, 0.025, 0]}
          />
          <mesh
            name="succulent_plant"
            castShadow
            receiveShadow
            geometry={nodes.succulent_plant.geometry}
            material={materials["succulent material"]}
            position={[0, 0.076, 0]}
          />
        </mesh>
        <group name="Speaker" position={[0, 0.57, -2.303]}>
          <mesh
            name="Bottom_Panel"

            geometry={nodes.Bottom_Panel.geometry}
            material={materials["Material.004"]}
            position={[0, 0.022, 0]}
          />
          <mesh
            name="Light_Ring"
            castShadow
            receiveShadow
            geometry={nodes.Light_Ring.geometry}
            // material={materials["Material.001"]}
            position={[0, 0.022, 0]}
          >
            <RingEmissiveMaterial ref={lightRingMaterialRef} />
          </mesh>
          <mesh
            ref={playButtonRef}
            name="PlayPause_Button"
            onClick={isPowerOn && handleAudioToggle}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            geometry={nodes.PlayPause_Button.geometry}
            material={materials["Material.007"]}
            position={[0, 0.022, 0]}
          />
          <mesh
            ref={powerButtonRef}
            name="Power_Button"
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={handlePowerToggle}
            geometry={nodes.Power_Button.geometry}
            material={materials["Material.007"]}
            position={[0, 0.022, 0]}
          />
          <mesh
            name="Speaker_Mesh"
            castShadow
            geometry={nodes.Speaker_Mesh.geometry}
            material={materials["Fabric mesh"]}
            position={[0, 0.022, 0]}
          />
          <mesh
            name="Top_Panel"
            geometry={nodes.Top_Panel.geometry}
            material={materials["Material.010"]}
            position={[0, 0.022, 0]}
          />
          <mesh
            ref={volumeDownButtonRef}
            name="Volume_Down_Button"
            onClick={handleVolumeDown}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            geometry={nodes.Volume_Down_Button.geometry}
            material={materials["Material.007"]}
            position={[0, 0.022, 0]}
          />
          <mesh
            ref={volumeUpButtonRef}
            name="Volume_Up_Button"
            onClick={handleVolumeUp}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            geometry={nodes.Volume_Up_Button.geometry}
            material={materials["Material.007"]}
            position={[0, 0.022, 0]}
          />
        </group>
        <group
          name="Black_Ballpen"
          position={[0.157, 0.57, -2.325]}
          rotation={[0, -1.212, 0]}
        >
          <group name="Pen_Body" position={[-0.003, 0.005, 0]}>
            <mesh
              name="Cylinder008"
              geometry={nodes.Cylinder008.geometry}
              // material={materials.Glass}
            >
              <meshPhysicalMaterial
                color="#ffffff"
                transparent
                opacity={0.16}
                roughness={0.08}
                metalness={0}
                envMapIntensity={1.2}
              />
            </mesh>
            <mesh
              name="Cylinder008_1"

              geometry={nodes.Cylinder008_1.geometry}
              material={materials["Material.005"]}
            />
            <mesh
              name="Cylinder008_2"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder008_2.geometry}
              material={materials["Material.006"]}
            />
            <group name="Cylinder005" position={[0.027, 0, 0]}>
              <mesh
                name="Cylinder001"

                geometry={nodes.Cylinder001.geometry}
                material={materials["Material.002"]}
              />
              <mesh
                name="Cylinder001_1"

                geometry={nodes.Cylinder001_1.geometry}
                material={materials["Material.005"]}
              />
              <mesh
                name="Cylinder001_2"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder001_2.geometry}
                material={materials["Material.006"]}
              />
            </group>
          </group>
          <group
            name="Pen_Cap"
            position={[-0.042, 0.006, -0.054]}
            rotation={[Math.PI, -1.079, Math.PI]}
          >
            <mesh
              name="Cylinder005_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005_1.geometry}
              material={materials["Material.006"]}
            />
            <mesh
              name="Cylinder005_2"

              geometry={nodes.Cylinder005_2.geometry}
              // material={materials.Glass}
            >
              <meshPhysicalMaterial
                color="#ffffff"
                transparent
                opacity={0.16}
                roughness={0.08}
                metalness={0}
                envMapIntensity={1.2}
              />
            </mesh>
          </group>
        </group>
        <mesh
          name="TV_Cabinet"
          castShadow
          receiveShadow
          geometry={nodes.TV_Cabinet.geometry}
          material={materials["Cabinet Body_Wood"]}
          position={[0, 0, -2.379]}
        />
        <group name="Table_Lamp" position={[-0.477, 0.57, -2.435]}>
          <pointLight
            name="Point001"
            intensity={2}
            decay={2}
            position={[0, 0.131, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            color={"#ffa239"}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-normalBias={0.002}
          />
          <group name="Sphere001" position={[0, 0.15, 0]}>
            <mesh
              name="Sphere002"
              geometry={nodes.Sphere002.geometry}
              material={materials.Bulb}
              castShadow
            />
            <mesh
              name="Sphere002_1"

              geometry={nodes.Sphere002_1.geometry}
              material={materials["Brushed metal"]}
            />
          </group>
        </group>
        <group
          name="Books001"
          position={[0.347, 0.57, -2.466]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <group
            name="green001"
            position={[0.084, 0.009, 0.55]}
            rotation={[0, 1.302, 0]}
          >
            <mesh
              name="Cube001"
              castShadow
              receiveShadow
              geometry={nodes.Cube001.geometry}
              material={materials.paper}
            />
            <mesh
              name="Cube001_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube001_1.geometry}
              material={materials.green}
            />
          </group>
          <group name="green002" position={[0, 0, 0.306]}>
            <mesh
              name="Cube002"
              castShadow
              receiveShadow
              geometry={nodes.Cube002.geometry}
              material={materials.paper}
            />
            <mesh
              name="Cube002_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube002_1.geometry}
              material={materials.green}
            />
          </group>
          <group name="green004" position={[0, 0, 0.306]}>
            <mesh
              name="Cube004"
              castShadow
              receiveShadow
              geometry={nodes.Cube004.geometry}
              material={materials.paper}
            />
            <mesh
              name="Cube004_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube004_1.geometry}
              material={materials.brown}
            />
          </group>
          <group name="green006" position={[0, 0, 0.306]}>
            <mesh
              name="Cube008"
              castShadow
              receiveShadow
              geometry={nodes.Cube008.geometry}
              material={materials.paper}
            />
            <mesh
              name="Cube008_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube008_1.geometry}
              material={materials.green}
            />
          </group>
          <group name="green007" position={[0, 0, 0.306]}>
            <mesh
              name="Cube009"
              castShadow
              receiveShadow
              geometry={nodes.Cube009.geometry}
              material={materials.paper}
            />
            <mesh
              name="Cube009_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube009_1.geometry}
              material={materials.blue}
            />
          </group>
          <group name="green009" position={[0, 0, 0.306]}>
            <mesh
              name="Cube015"
              castShadow
              receiveShadow
              geometry={nodes.Cube015.geometry}
              material={materials.paper}
            />
            <mesh
              name="Cube015_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube015_1.geometry}
              material={materials.blue}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(`${import.meta.env.BASE_URL}speaker-desk-scene-optimised.glb`);
