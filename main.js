import './style.css'
import * as THREE from 'three'
import { Vector3 } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { MapControls } from 'three/addons/controls/MapControls.js'

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Scene
const scene = new THREE.Scene()
scene.fog = new THREE.Fog(0xcccccc, 500, 800);
scene.background = new THREE.Color(0xdddddd)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
camera.position.set(0, 50, 100)


// Light
const light = new THREE.HemisphereLight(0xffffff, 0x080820, 4)
scene.add(light)

// Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

// Controls
const controls = new MapControls(camera, renderer.domElement)
controls.enableDamping = true
controls.minPolarAngle = Math.PI / 2.7
controls.maxPolarAngle = Math.PI / 2.7

// 3D Scene Loader
const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
loader.setDRACOLoader(dracoLoader)

loader.load('models/map26.glb', function (gltf) {
  scene.add(gltf.scene)
}, undefined, function (error) {
  console.error(error)
})

// Main Loop
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate();
