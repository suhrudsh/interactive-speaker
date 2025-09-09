import { useEffect, useRef } from "react";
import {
  useGLTF,
  PerspectiveCamera,
  useAnimations,
  Helper,
  ContactShadows,
} from "@react-three/drei";
import { CameraHelper, DirectionalLightHelper, LoopOnce } from "three";

export function Scene(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/speaker-desk-scene.glb");

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
          intensity={5}
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
        <pointLight
          name="Point"
          intensity={10}
          decay={2}
          position={[0, 2.403, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          color={"#ffa239"}
        />
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
          name="Individual_Book_Collection_1"
          position={[0.385, 0.57, -2.451]}
          rotation={[0, -1.571, 0]}
        >
          <group name="factfullness" position={[0, 0, -0.032]}>
            <mesh
              name="Cube013"
              castShadow
              receiveShadow
              geometry={nodes.Cube013.geometry}
              material={materials.factful}
            />
            <mesh
              name="Cube013_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube013_1.geometry}
              material={materials["edge paper"]}
            />
            <mesh
              name="Cube013_2"
              castShadow
              receiveShadow
              geometry={nodes.Cube013_2.geometry}
              material={materials["factful.001"]}
            />
          </group>
          <group
            name="green"
            position={[0, 0, 0.074]}
            scale={[0.625, 0.84, 0.833]}
          >
            <mesh
              name="Cube012"
              castShadow
              receiveShadow
              geometry={nodes.Cube012.geometry}
              material={materials.greenbook}
            />
            <mesh
              name="Cube012_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube012_1.geometry}
              material={materials["edge paper.001"]}
            />
          </group>
          <group name="how_to">
            <mesh
              name="Cube011"
              castShadow
              receiveShadow
              geometry={nodes.Cube011.geometry}
              material={materials["how to"]}
            />
            <mesh
              name="Cube011_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube011_1.geometry}
              material={materials["edge paper"]}
            />
          </group>
          <group
            name="hygge"
            position={[0.049, 0.014, 0.606]}
            rotation={[Math.PI / 2, 0, 1.921]}
          >
            <mesh
              name="Cube010"
              castShadow
              receiveShadow
              geometry={nodes.Cube010.geometry}
              material={materials.hygge}
            />
            <mesh
              name="Cube010_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube010_1.geometry}
              material={materials["edge paper.002"]}
            />
          </group>
          <group name="sapiens" position={[0, 0, 0.143]}>
            <mesh
              name="Cube007"
              castShadow
              receiveShadow
              geometry={nodes.Cube007.geometry}
              material={materials.sapiens}
            />
            <mesh
              name="Cube007_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube007_1.geometry}
              material={materials["edge paper"]}
            />
          </group>
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
              material={materials.Glass}
            />
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
                name="Mesh"
                castShadow
                receiveShadow
                geometry={nodes.Mesh.geometry}
                material={materials["Material.002"]}
              />
              <mesh
                name="Mesh_1"
                castShadow
                receiveShadow
                geometry={nodes.Mesh_1.geometry}
                material={materials["Material.005"]}
              />
              <mesh
                name="Mesh_2"
                castShadow
                receiveShadow
                geometry={nodes.Mesh_2.geometry}
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
              material={materials.Glass}
            />
          </group>
        </group>
        <group name="TV_Cabinet" position={[0, 0, -2.379]}>
          <mesh
            name="Kostka"
            castShadow
            receiveShadow
            geometry={nodes.Kostka.geometry}
            material={materials["Desk wood"]}
          />
          <mesh
            name="Kostka_1"
            castShadow
            receiveShadow
            geometry={nodes.Kostka_1.geometry}
            material={materials["Glass.001"]}
          />
          <mesh
            name="Kostka_2"
            castShadow
            receiveShadow
            geometry={nodes.Kostka_2.geometry}
            material={materials.Metal}
          />
          <mesh
            name="Kostka_3"
            castShadow
            receiveShadow
            geometry={nodes.Kostka_3.geometry}
            material={materials["Metal.001"]}
          />
          <mesh
            name="Kostka_4"
            castShadow
            receiveShadow
            geometry={nodes.Kostka_4.geometry}
            material={materials["Desk wood.001"]}
          />
        </group>
        <group
          name="Table_Lamp"
          position={[-0.477, 0.57, -2.435]}
          rotation={[Math.PI, 0, Math.PI]}
        >
          <pointLight
            name="Point001"
            intensity={0.2}
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
      </group>
    </group>
  );
}

useGLTF.preload("/speaker-desk-scene.glb");
