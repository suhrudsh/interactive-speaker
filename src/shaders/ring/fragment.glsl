uniform vec3 uColorLow;   // green
uniform vec3 uColorHigh;  // blue
uniform float uIntensity;
uniform float uRotationOffset;
varying vec3 vPosition;

void main() {
  float angle = atan(vPosition.z, vPosition.x);
  float x = fract(angle / 6.28318 + 0.5 + uRotationOffset);
  float t = abs(2.0 * x - 1.0); // linear triangle wave: 1 → 0 → 1

  vec3 color = mix(uColorHigh, uColorLow, t);
  gl_FragColor = vec4(color * uIntensity, 1.0);
}