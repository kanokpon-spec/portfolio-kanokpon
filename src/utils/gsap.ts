import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function registerGSAP() {
  gsap.registerPlugin(ScrollTrigger)

  gsap.config({
    nullTargetWarn: false,
  })

  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  })

  gsap.defaults({
    ease: 'power3.out',
    duration: 1,
  })

  return { gsap, ScrollTrigger }
}

export { gsap } from 'gsap'
export { ScrollTrigger } from 'gsap/ScrollTrigger'