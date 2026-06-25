import './styles/global.scss'
import './styles/portfolio.scss'
import { createApp } from './app'
import { initThree } from '@scenes/ThreeScene'
import { initScroll } from '@utils/scroll'
import { registerGSAP } from '@utils/gsap'

registerGSAP()

const app = createApp()
app.mount('#app')

initThree()
initScroll()