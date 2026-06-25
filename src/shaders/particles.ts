export const particleVertexShader = `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aLife;

  varying vec3 vColor;
  varying float vLife;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    vLife = aLife;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vAlpha = smoothstep(0.0, 0.2, aLife) * smoothstep(1.0, 0.8, aLife);
  }
`

export const particleFragmentShader = `
  varying vec3 vColor;
  varying float vLife;
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float glow = smoothstep(0.5, 0.0, dist);
    float core = smoothstep(0.2, 0.0, dist);

    vec3 color = mix(vColor * 0.5, vColor, core);
    float alpha = (glow * 0.5 + core * 0.5) * vAlpha;

    gl_FragColor = vec4(color, alpha);
  }
`

export const gridVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const gridFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  uniform float uTime;
  uniform vec3 uColor;

  void main() {
    vec2 grid = abs(fract(vUv * 30.0 - 0.5) - 0.5) / fwidth(vUv * 30.0);
    float line = min(grid.x, grid.y);
    float gridAlpha = 1.0 - min(line, 1.0);

    float dist = length(vPosition.xz);
    float fade = smoothstep(50.0, 10.0, dist);

    float pulse = sin(uTime * 0.5 + dist * 0.1) * 0.2 + 0.8;

    vec3 color = uColor * pulse;
    float alpha = gridAlpha * fade * 0.3;

    gl_FragColor = vec4(color, alpha);
  }
`

export const orbVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const orbFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;

  void main() {
    float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);

    float pulse = sin(uTime * 2.0 + vPosition.y * 0.5) * 0.1 + 0.9;

    vec3 color = uColor * pulse;
    float alpha = fresnel * uOpacity * pulse;

    gl_FragColor = vec4(color, alpha);
  }
`