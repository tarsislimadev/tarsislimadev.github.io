import * as THREE from '../../assets/js/libs/three/index.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { getWidth, getHeight } from '../../assets/js/utils/window.js'
import { createCamera, radian } from '../../assets/js/utils/3d.js'
import { createNewPeer } from '../../assets/js/utils/peer.js'
import * as COLORS from '../../assets/js/utils/colors.js'

const state = { cam: 0 }

const scene = new THREE.Scene()

const lawn = new THREE.Mesh(
  new THREE.PlaneGeometry(+100.0, +40.0),
  new THREE.MeshBasicMaterial({ color: COLORS.GREEN_2, side: THREE.DoubleSide }),
)
lawn.rotation.set(+radian(+90.0), +0.0, +0.0)
scene.add(lawn)

const centralBall = new THREE.Mesh(
  new THREE.RingGeometry(+0.0, +0.5, +16.0, +1.0),
  new THREE.MeshBasicMaterial({ color: COLORS.WHITE_1, side: THREE.DoubleSide }),
)
centralBall.rotation.set(+radian(+90.0), +0.0, +0.0)
centralBall.position.set(+0.0, +0.01, +0.0)
scene.add(centralBall)

const centralCircle = new THREE.Mesh(
  new THREE.RingGeometry(+4.75, +5.0, +32.0, +1.0),
  new THREE.MeshBasicMaterial({ color: COLORS.WHITE_1, side: THREE.DoubleSide }),
)
centralCircle.rotation.set(+radian(+90.0), +0.0, +0.0)
centralCircle.position.set(+0.0, +0.01, +0.0)
scene.add(centralCircle)

const createLine = ({ w = +1.0, rx = +radian(+90.0), ry = +0.0, rz = +0.0, px = +0.0, py = +0.01, pz = +0.0, } = {}) => {
  const line = new THREE.Mesh(
    new THREE.PlaneGeometry(+w, +0.1),
    new THREE.MeshBasicMaterial({ color: COLORS.WHITE_1, side: THREE.DoubleSide }),
  )
  line.rotation.set(rx, ry, rz)
  line.position.set(px, py, pz)
  return line
}

scene.add(createLine({ w: +40.0, rz: +radian(+90.0) }))
scene.add(createLine({ w: +40.0, rz: +radian(+90.0), px: +50.0 }))
scene.add(createLine({ w: +40.0, rz: +radian(+90.0), px: -50.0 }))
scene.add(createLine({ w: +100.0, pz: +20.0 }))
scene.add(createLine({ w: +100.0, pz: -20.0 }))

const createAreaLine = ({ c = new THREE.Color(COLORS.WHITE_1), rx = +radian(90), ry = +0.0, rz = +radian(90), px = +0.0, py = +0.01, pz = +0.0, } = {}) => {
  const leftPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(+1.0, +10.0),
    new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }),
  )
  leftPlane.position.set(+9.5, +5.0, +0.0)

  const topPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(+1.0, +20.0),
    new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }),
  )
  topPlane.position.set(+0.0, +10.0, +0.0)
  topPlane.rotation.set(+0.0, +0.0, +radian(90))

  const rightPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(+1.0, +10.0),
    new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }),
  )
  rightPlane.position.set(-9.5, +5.0, +0.0)

  const group = new THREE.Group()
  group.position.set(px, py, pz)
  group.rotation.set(rx, ry, rz)
  group.add(leftPlane)
  group.add(topPlane)
  group.add(rightPlane)

  return group
}

scene.add(createAreaLine({ px: +50.0 }))
scene.add(createAreaLine({ px: -50.0, rz: +radian(270) }))

const renderer = new THREE.WebGLRenderer({ precision: 'lowp' })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(getWidth(), getHeight())

document.body.appendChild(renderer.domElement)
document.body.style.margin = '0rem'

const cameras = [createCamera({ py: +30.0, pz: +30.0 }), createCamera()]
Array.from(cameras).map((c) => scene.add(c))

const getCamera = (ix = state.cam) => cameras[ix]

const controls = Array.from(cameras).map((c) => new OrbitControls(c, renderer.domElement))

const getControl = (cam = state.cam) => controls[cam]

// getControl().update()

renderer.setAnimationLoop(() => {
  getControl().update()
  renderer.render(scene, getCamera())
})

const params = {}

const peer = createNewPeer('lawn', true)

peer.on('connection', function (conn) {
  conn.on('data', function ({ text, fn } = {}) {
    console.log('conn data', { peer, text, fn })
    params[fn]?.()
  })
})
