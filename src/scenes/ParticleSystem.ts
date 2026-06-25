import * as THREE from 'three'
import { ThreeContext } from '@utils/three'

export class ParticleSystem {
  private scene: THREE.Scene
  private particles!: THREE.Points
  private count = 1500
  private positions: Float32Array
  private velocities: Float32Array
  private sizes: Float32Array
  private colors: Float32Array
  private material!: THREE.ShaderMaterial

  constructor(context: ThreeContext) {
    this.scene = context.scene
    this.positions = new Float32Array(this.count * 3)
    this.velocities = new Float32Array(this.count * 3)
    this.sizes = new Float32Array(this.count)
    this.colors = new Float32Array(this.count * 3)

    this.init()
  }

  private init() {
    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3

      this.positions[i3] = (Math.random() - 0.5) * 100
      this.positions[i3 + 1] = (Math.random() - 0.5) * 100
      this.positions[i3 + 2] = (Math.random() - 0.5) * 100

      this.velocities[i3] = (Math.random() - 0.5) * 0.02
      this.velocities[i3 + 1] = (Math.random() - 0.5) * 0.02
      this.velocities[i3 + 2] = (Math.random() - 0.5) * 0.02

      this.sizes[i] = Math.random() * 2 + 0.5

      const isAccent = Math.random() > 0.7
      this.colors[i3] = isAccent ? 0 : 0.94
      this.colors[i3 + 1] = isAccent ? 0.83 : 0.94
      this.colors[i3 + 2] = isAccent ? 0.67 : 0.96
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
    geometry.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1))
    geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3))

    this.material = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float aSize;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = smoothstep(100.0, 20.0, -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
          gl_FragColor = vec4(vColor, alpha * 0.6);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    this.particles = new THREE.Points(geometry, this.material)
    this.scene.add(this.particles)
  }

  update(_delta: number, elapsed: number) {
    const positions = this.particles.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3

      positions[i3] += this.velocities[i3] + Math.sin(elapsed * 0.5 + i) * 0.005
      positions[i3 + 1] += this.velocities[i3 + 1] + Math.cos(elapsed * 0.3 + i) * 0.005
      positions[i3 + 2] += this.velocities[i3 + 2]

      if (Math.abs(positions[i3]) > 50) this.velocities[i3] *= -1
      if (Math.abs(positions[i3 + 1]) > 50) this.velocities[i3 + 1] *= -1
      if (Math.abs(positions[i3 + 2]) > 50) this.velocities[i3 + 2] *= -1
    }

    this.particles.geometry.attributes.position.needsUpdate = true
    this.particles.rotation.y = elapsed * 0.02
  }

  dispose() {
    this.particles.geometry.dispose()
    this.material.dispose()
    this.scene.remove(this.particles)
  }
}