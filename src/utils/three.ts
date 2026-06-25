import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'

export interface ThreeContext {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  composer: EffectComposer
  clock: THREE.Clock
  resize: () => void
  dispose: () => void
}

export function createThreeContext(canvas?: HTMLCanvasElement): ThreeContext {
  const clock = new THREE.Clock()

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas ?? undefined,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: false,
    logarithmicDepthBuffer: true,
  })

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  scene.background = null

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 50)

  const renderTarget = new THREE.WebGLRenderTarget(
    window.innerWidth * renderer.getPixelRatio(),
    window.innerHeight * renderer.getPixelRatio()
  )

  const composer = new EffectComposer(renderer, renderTarget)

  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.3,
    0.5,
    0.85
  )
  bloomPass.threshold = 0.8
  bloomPass.strength = 0.5
  bloomPass.radius = 0.4
  composer.addPass(bloomPass)

  const fxaaPass = new ShaderPass(FXAAShader)
  fxaaPass.material.uniforms['resolution'].value.set(
    1 / (window.innerWidth * renderer.getPixelRatio()),
    1 / (window.innerHeight * renderer.getPixelRatio())
  )
  composer.addPass(fxaaPass)

  const resize = () => {
    const width = window.innerWidth
    const height = window.innerHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    composer.setSize(width, height)
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    fxaaPass.material.uniforms['resolution'].value.set(
      1 / (width * renderer.getPixelRatio()),
      1 / (height * renderer.getPixelRatio())
    )
  }

  const dispose = () => {
    renderer.dispose()
    composer.dispose()
    renderTarget.dispose()
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose()
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose())
        } else {
          obj.material.dispose()
        }
      }
    })
    window.removeEventListener('resize', resize)
  }

  window.addEventListener('resize', resize, { passive: true })

  return { renderer, scene, camera, composer, clock, resize, dispose }
}

export { THREE }