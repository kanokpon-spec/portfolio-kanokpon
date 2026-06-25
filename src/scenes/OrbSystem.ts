import * as THREE from 'three'
import { ThreeContext } from '@utils/three'

interface Orb {
  mesh: THREE.Mesh
  speed: number
  amplitude: number
  phase: number
}

export class OrbSystem {
  private scene: THREE.Scene
  private orbs: Orb[] = []
  private orbCount = 5

  constructor(context: ThreeContext) {
    this.scene = context.scene
    this.createOrbs()
  }

  private createOrbs() {
    const colors = [0x00d4aa, 0x6366f1, 0xf59e0b, 0x00d4aa, 0x6366f1]

    for (let i = 0; i < this.orbCount; i++) {
      const geometry = new THREE.IcosahedronGeometry(1 + Math.random() * 2, 4)

      const material = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.15,
        wireframe: true,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30 - 10
      )

      this.scene.add(mesh)
      this.orbs.push({
        mesh,
        speed: 0.2 + Math.random() * 0.3,
        amplitude: 5 + Math.random() * 10,
        phase: Math.random() * Math.PI * 2,
      })
    }
  }

  update(delta: number, elapsed: number) {
    this.orbs.forEach((orb) => {
      orb.mesh.rotation.x += delta * orb.speed * 0.5
      orb.mesh.rotation.y += delta * orb.speed

      orb.mesh.position.x += Math.sin(elapsed * orb.speed + orb.phase) * 0.01
      orb.mesh.position.y += Math.cos(elapsed * orb.speed * 0.7 + orb.phase) * 0.01

      const scale = 1 + Math.sin(elapsed * 0.5 + orb.phase) * 0.1
      orb.mesh.scale.set(scale, scale, scale)
    })
  }

  dispose() {
    this.orbs.forEach((orb) => {
      orb.mesh.geometry.dispose()
      ;(orb.mesh.material as THREE.Material).dispose()
      this.scene.remove(orb.mesh)
    })
  }
}