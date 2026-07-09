uniform vec3 uColorOne;   // green
uniform vec3 uColorTwo;  // blue
uniform float uIntensity;
uniform float uRotationOffset;
uniform float uAudioLevel;
varying vec3 vPosition;

void main() {
  float angle = atan(vPosition.z, vPosition.x);
  float x = fract(angle / 6.28318 + 0.5 + uRotationOffset);
  float t = abs(2.0 * x - 1.0); // linear triangle wave: 1 → 0 → 1

  vec3 color = mix(uColorTwo, uColorOne, t);
  gl_FragColor = vec4(color * uIntensity * uAudioLevel, 1.0);
}