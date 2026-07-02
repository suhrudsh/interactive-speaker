import { useEffect, useRef } from "react";
import {
  useGLTF,
  PerspectiveCamera,
  useAnimations,
  Helper,
} from "@react-three/drei";
import {
  CameraHelper,
  DirectionalLightHelper,
  LoopOnce,
  REVISION,
} from "three";

export function Scene(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    `${import.meta.env.BASE_URL}speaker-desk-scene-optimised.glb`,
  );

  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    setTimeout(() => {
      if (actions.CameraAction) {
        actions.CameraAction.reset() // start from beginning
          .setLoop(LoopOnce, 1).clampWhenFinished = // play once
          true; // hold the last frame
        actions.CameraAction.play();
      }
    }, 1000);
  }, [actions.CameraAction]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Room"
          castShadow
          receiveShadow
          geometry={nodes.Room.geometry}
          material={materials["Painted Plaster Wall"]}
          rotation={[0, Math.PI / 2, 0]}
          scale={5.989}
        />
        <directionalLight
          name="Starlight_Sun"
          intensity={15}
          decay={2}
          position={[-10, 5, 10]}
          color={"#ffa239"}
          castShadow
          shadow-mapSize={[2048, 2048]}
        >
          {import.meta.env.DEV && (
            <Helper type={DirectionalLightHelper} args={[5, "yellow"]} />
          )}
        </directionalLight>
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
            castShadow={false}
            receiveShadow={false}
            geometry={nodes.Cube064.geometry}
            // material={materials["1 bh6601_1_face_vidro_transparente"]}
          >
            <meshStandardMaterial transparent opacity={0.05} color="white" />
          </mesh>
          <mesh
            name="Cube064_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube064_1.geometry}
            material={materials["esquadria branca"]}
          />
          <mesh
            name="Cube064_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube064_2.geometry}
            material={materials["Borracha preta"]}
          />
          <mesh
            name="Cube064_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube064_3.geometry}
            material={materials["Plastico preto"]}
          />
          <mesh
            name="Cube064_4"
            castShadow
            receiveShadow
            geometry={nodes.Cube064_4.geometry}
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
            scale={0.053}
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
        <group
          name="Speaker"
          position={[0, 0.57, -2.303]}
          rotation={[Math.PI, 0, Math.PI]}
        >
          <mesh
            name="Action_Button"
            castShadow
            receiveShadow
            geometry={nodes.Action_Button.geometry}
            material={materials["Material.007"]}
            position={[0, 0.022, 0]}
          />
          <mesh
            name="Bottom_Panel"
            castShadow
            receiveShadow
            geometry={nodes.Bottom_Panel.geometry}
            material={materials["Material.004"]}
            position={[0, 0.022, 0]}
          />
          <mesh
            name="Light_Ring"
            castShadow
            receiveShadow
            geometry={nodes.Light_Ring.geometry}
            material={materials["Material.001"]}
            position={[0, 0.022, 0]}
          />
          <mesh
            name="Mic_Off_Button"
            castShadow
            receiveShadow
            geometry={nodes.Mic_Off_Button.geometry}
            material={materials["Material.007"]}
            position={[0, 0.022, 0]}
          />
          <mesh
            name="Speaker_Mesh"
            castShadow
            receiveShadow
            geometry={nodes.Speaker_Mesh.geometry}
            material={materials["Material.011"]}
            position={[0, 0.022, 0]}
          />
          <mesh
            name="Top_Panel"
            castShadow
            receiveShadow
            geometry={nodes.Top_Panel.geometry}
            material={materials["Material.010"]}
            position={[0, 0.022, 0]}
          />
          <mesh
            name="Volume_Down_Button"
            castShadow
            receiveShadow
            geometry={nodes.Volume_Down_Button.geometry}
            material={materials["Material.007"]}
            position={[0, 0.022, 0]}
          />
          <mesh
            name="Volume_Up_Button"
            castShadow
            receiveShadow
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
              castShadow
              receiveShadow
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
              castShadow
              receiveShadow
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
                castShadow
                receiveShadow
                geometry={nodes.Cylinder001.geometry}
                material={materials["Material.002"]}
              />
              <mesh
                name="Cylinder001_1"
                castShadow
                receiveShadow
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
              castShadow
              receiveShadow
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

        <mesh
          name="TV_Cabinet001"
          castShadow
          receiveShadow
          geometry={nodes.TV_Cabinet001.geometry}
          material={materials["Desk wood"]}
          position={[0, 0, -2.379]}
        />
        <mesh
          name="TV_Cabinet002"
          castShadow
          receiveShadow
          geometry={nodes.TV_Cabinet002.geometry}
          material={materials["Desk wood"]}
          position={[0, 0, -2.379]}
        />
        <group name="TV_Cabinet003" position={[0, 0, -2.379]}>
          <mesh
            name="Kostka003"
            castShadow
            receiveShadow
            geometry={nodes.Kostka003.geometry}
            material={materials["Desk wood"]}
          />
          <mesh
            name="Kostka003_1"
            castShadow
            receiveShadow
            geometry={nodes.Kostka003_1.geometry}
            material={materials["Glass.001"]}
          />
        </group>
        <group name="TV_Cabinet004" position={[0, 0, -2.379]}>
          <mesh
            name="Kostka004"
            castShadow
            receiveShadow
            geometry={nodes.Kostka004.geometry}
            material={materials["Desk wood"]}
          />
          <mesh
            name="Kostka004_1"
            castShadow
            receiveShadow
            geometry={nodes.Kostka004_1.geometry}
            material={materials["Glass.001"]}
          />
        </group>
        <group name="TV_Cabinet005" position={[0, 0, -2.379]} />
        <mesh
          name="TV_Cabinet006"
          castShadow
          receiveShadow
          geometry={nodes.TV_Cabinet006.geometry}
          material={materials.Metal}
          position={[0, 0, -2.379]}
        />
        <group name="TV_Cabinet007" position={[0, 0, -2.379]} />
        <mesh
          name="TV_Cabinet008"
          castShadow
          receiveShadow
          geometry={nodes.TV_Cabinet008.geometry}
          material={materials["Desk wood"]}
          position={[0, 0, -2.379]}
        />
        <group name="TV_Cabinet009" position={[0, 0, -2.379]} />
        <mesh
          name="TV_Cabinet010"
          castShadow
          receiveShadow
          geometry={nodes.TV_Cabinet010.geometry}
          material={materials.Metal}
          position={[0, 0, -2.379]}
        />
        <group name="TV_Cabinet011" position={[0, 0, -2.379]} />
        <mesh
          name="TV_Cabinet012"
          castShadow
          receiveShadow
          geometry={nodes.TV_Cabinet012.geometry}
          material={materials["Desk wood"]}
          position={[0, 0, -2.379]}
        />
        <group
          name="Table_Lamp"
          position={[-0.477, 0.57, -2.435]}
          rotation={[Math.PI, 0, Math.PI]}
        >
          <pointLight
            name="Point001"
            intensity={0.3}
            decay={2}
            position={[0, 0.131, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            color={"#ffa239"}
            castShadow
          />
          <group name="Sphere001" position={[0, 0.15, 0]} scale={1.11}>
            <mesh
              name="Sphere002"
              geometry={nodes.Sphere002.geometry}
              material={materials.Bulb}
            />
            <mesh
              name="Sphere002_1"
              castShadow
              receiveShadow
              geometry={nodes.Sphere002_1.geometry}
              material={materials["Brushed metal"]}
            />
          </group>
        </group>
        <group
          name="Simple_Television_(Wall_Mounted)"
          position={[0, 1.095, -2.579]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            name="Plane006"
            castShadow
            receiveShadow
            geometry={nodes.Plane006.geometry}
            material={materials["TV Aluminium"]}
          />
          <mesh
            name="Plane006_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane006_1.geometry}
            material={materials["TV Screen Glass"]}
          />
          <mesh
            name="TV_Back_Panel"
            castShadow
            receiveShadow
            geometry={nodes.TV_Back_Panel.geometry}
            material={materials["TV Aluminium"]}
          />
          <mesh
            name="TV_Sensor_Panel"
            castShadow
            receiveShadow
            geometry={nodes.TV_Sensor_Panel.geometry}
            material={materials["TV Aluminium"]}
            position={[0, 0.038, 0.271]}
          />
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
