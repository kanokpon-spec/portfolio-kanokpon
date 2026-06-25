import * as THREE from 'three'
import { ThreeContext } from '@utils/three'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

export class ScrollController {
  private context: ThreeContext
  private scrollProgress = 0
  private targetScrollProgress = 0
  private cameraTarget = new THREE.Vector3()

  constructor(
    context: ThreeContext,
    _particleSystem: unknown,
    _gridSystem: unknown,
    _orbSystem: unknown
  ) {
    this.context = context
    this.setupScrollListener()
  }

  private setupScrollListener() {
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      this.targetScrollProgress = window.scrollY / scrollHeight
    }, { passive: true })
  }

  update(_delta: number, _elapsed: number) {
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.05

    const scrollY = this.scrollProgress

    this.context.camera.position.x = Math.sin(scrollY * Math.PI * 2) * 2
    this.context.camera.position.y = scrollY * -10
    this.context.camera.position.z = 50 - scrollY * 30

    this.cameraTarget.set(0, scrollY * -10, 0)
    this.context.camera.lookAt(this.cameraTarget)

    const bloomStrength = 0.3 + scrollY * 0.4
    const bloomPass = this.context.composer.passes[1]
    if (bloomPass instanceof UnrealBloomPass) {
      bloomPass.strength = bloomStrength
    }
  }
}