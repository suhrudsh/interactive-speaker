// RingEmissiveMaterial.jsx
import { useMemo } from "react";
import * as THREE from "three";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

export function RingEmissiveMaterial({ ref, ...props }) {
  const uniforms = useMemo(
    () => ({
      uColorLow: { value: new THREE.Color("#00C2FF") },
      uColorHigh: { value: new THREE.Color("#1500CA") },
      uIntensity: { value: 2.0 },
      uRotationOffset: { value: 0 },
    }),
    [],
  );

  return (
    <shaderMaterial
      ref={ref}
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      {...props}
    />
  );
}
