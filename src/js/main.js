import { TRUE } from 'sass';
import '../scss/app.scss';
import * as THREE from 'three';
// import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);



// const geometry = new THREE.TorusGeometry(3, 0.10, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xfffffff });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);


// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(5, 5, 5);

// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);



// Background

// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;

// Avatar

const ojo = new THREE.TextureLoader().load('eye.png');


const eye = new THREE.Mesh(new THREE.SphereGeometry(1.1, 32, 32), new THREE.MeshPhongMaterial({ color: 0xfffffff }));
scene.add(eye);

const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), new THREE.MeshPhongMaterial({ color: 0x000000 }));
pupil.position.z = 1;
pupil.position.x = -0.3;
eye.add(pupil);

const area = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshPhongMaterial({ color: 0xff522f }));
area.position.z = 0.7;
area.position.x = -0.3;
eye.add(area);

const light = new THREE.DirectionalLight(0xfffffff, 3);
light.position.set(3, 1, 15).normalize();
scene.add(light);

eye.position.z = -3;
eye.position.x = 1.5;

let mouseX = 0;
let mouseY = 0;


document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 0.8 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 1.5 + 0.8;
});




function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().forEach(addStar);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.005;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  // pupil.position.x = Math.sin(Date.now() * 0.001) * 0.5;
  // pupil.position.y = Math.cos(Date.now() * 0.001) * 0.5;

  pupil.position.x = mouseX * 0.5;
  pupil.position.y = mouseY * 0.5;
  


  // controls.update();

  renderer.render(scene, camera);
}

animate();

// window.addEventListener('resize', () => {
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
// });