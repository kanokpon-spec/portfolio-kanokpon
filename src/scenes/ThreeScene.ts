import { createThreeContext } from '@utils/three'
import { ParticleSystem } from '@scenes/ParticleSystem'
import { GridSystem } from '@scenes/GridSystem'
import { OrbSystem } from '@scenes/OrbSystem'
import { ScrollController } from '@scenes/ScrollController'

let threeContext: ReturnType<typeof createThreeContext> | null = null
let particleSystem: ParticleSystem | null = null
let gridSystem: GridSystem | null = null
let orbSystem: OrbSystem | null = null
let scrollController: ScrollController | null = null
let animationId: number | null = null

export function initThree() {
  if (typeof window === 'undefined') return

  const canvas = document.createElement('canvas')
  canvas.id = 'three-canvas'
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.zIndex = '1'
  canvas.style.pointerEvents = 'none'
  document.body.prepend(canvas)

  threeContext = createThreeContext(canvas)
  threeContext.scene.background = null

  particleSystem = new ParticleSystem(threeContext)
  gridSystem = new GridSystem(threeContext)
  orbSystem = new OrbSystem(threeContext)
  scrollController = new ScrollController(threeContext, particleSystem, gridSystem, orbSystem)

  animate()
}

function animate() {
  if (!threeContext) return

  animationId = requestAnimationFrame(animate)

  const delta = threeContext.clock.getDelta()
  const elapsed = threeContext.clock.getElapsedTime()

  particleSystem?.update(delta, elapsed)
  gridSystem?.update(delta, elapsed)
  orbSystem?.update(delta, elapsed)
  scrollController?.update(delta, elapsed)

  threeContext.composer.render()
}

export function getThreeContext() {
  return threeContext
}

export function disposeThree() {
  if (animationId) cancelAnimationFrame(animationId)
  particleSystem?.dispose()
  gridSystem?.dispose()
  orbSystem?.dispose()
  threeContext?.dispose()
  threeContext = null
}