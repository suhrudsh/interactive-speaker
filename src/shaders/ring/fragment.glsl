uniform vec3 uColorOne;
uniform vec3 uColorTwo;
uniform float uIntensity;
uniform float uRotationOffset;
uniform float uAudioLevel;
uniform float uPowerProgress;
varying vec3 vPosition;

void main() {
  float angle = atan(vPosition.z, vPosition.x);
  float x = fract(angle / 6.28318 + 0.5 + uRotationOffset);
  float t = abs(2.0 * x - 1.0);

  vec3 color = mix(uColorTwo, uColorOne, t);

  // distance from a fixed center point on the ring, wrapped (max possible = 0.5)
  float center = 0.5;
  float dist = abs(x - center);
  dist = min(dist, 1.0 - dist);

  float edgeWidth = 0.1;
  float mask = smoothstep(0.0, edgeWidth, uPowerProgress * (0.5 + edgeWidth) - dist);

  vec3 finalColor = mix(vec3(0.8), color * uIntensity * uAudioLevel, mask);
gl_FragColor = vec4(finalColor, 1.0);
}