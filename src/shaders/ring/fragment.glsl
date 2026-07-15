uniform vec3 uColorOne;
uniform vec3 uColorTwo;
uniform float uIntensity;
uniform float uRotationOffset;
uniform float uAudioLevel;
uniform float uPowerProgress;
uniform float uAudioVolume;
uniform float uVolumeMode; // 0 = power-reveal mask, 1 = volume-level mask
varying vec3 vPosition;

void main() {
  float angle = atan(vPosition.z, vPosition.x);

  // rotating angle — drives color only now
  float x = fract(angle / 6.28318 + 0.5 + uRotationOffset);
  float t = abs(2.0 * x - 1.0);
  vec3 color = mix(uColorTwo, uColorOne, t);

  // static angle — drives both masks, so the reveal center never rotates
  float xStatic = fract(angle / 6.28318 + 0.5);

  float center = 0.5;
  float edgeWidth = 0.1;

  float distStatic = abs(xStatic - center);
  distStatic = min(distStatic, 1.0 - distStatic);

  float powerMask = smoothstep(0.0, edgeWidth, uPowerProgress * (0.5 + edgeWidth) - distStatic);
  float volumeMask = smoothstep(0.0, edgeWidth, uAudioVolume * (0.5 + edgeWidth) - distStatic);

  float mask = mix(powerMask, volumeMask, uVolumeMode);

  vec3 finalColor = mix(vec3(0.8), color * uIntensity * uAudioLevel, mask);
  gl_FragColor = vec4(finalColor, 1.0);
}