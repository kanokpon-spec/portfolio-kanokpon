import * as THREE from 'three'
import { ThreeContext } from '@utils/three'

export class GridSystem {
  private scene: THREE.Scene
  private grid: THREE.LineSegments
  private material: THREE.LineBasicMaterial

  constructor(context: ThreeContext) {
    this.scene = context.scene
    this.material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    })
    this.grid = this.createGrid()
    this.scene.add(this.grid)
  }

  private createGrid(): THREE.LineSegments {
    const size = 100
    const divisions = 30
    const step = size / divisions
    const halfSize = size / 2

    const vertices: number[] = []
    const colors: number[] = []

    for (let i = 0; i <= divisions; i++) {
      const pos = -halfSize + i * step
      const isCenter = pos === 0
      const isNearCenter = Math.abs(pos) < step * 3

      let r: number, g: number, b: number
      if (isCenter) {
        r = 0; g = 0.83; b = 0.67
      } else if (isNearCenter) {
        r = 0.04; g = 0.06; b = 0.08
      } else {
        r = 0.06; g = 0.06; b = 0.09
      }

      vertices.push(-halfSize, 0, pos, halfSize, 0, pos)
      colors.push(r, g, b, r, g, b)

      vertices.push(pos, 0, -halfSize, pos, 0, halfSize)
      colors.push(r, g, b, r, g, b)
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    return new THREE.LineSegments(geometry, this.material)
  }

  update(_delta: number, elapsed: number) {
    this.grid.position.y = -15 + Math.sin(elapsed * 0.2) * 0.5
    this.material.opacity = 0.15 + Math.sin(elapsed * 0.5) * 0.05
  }

  dispose() {
    this.grid.geometry.dispose()
    this.material.dispose()
    this.scene.remove(this.grid)
  }
}