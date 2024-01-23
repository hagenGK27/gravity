import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a flat area (plane)
const planeGeometry = new THREE.BoxGeometry(10, 0.001, 10);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.rotation.x = -Math.PI / 2; // Rotate the plane to be flat
scene.add(plane);

// Create a ball (sphere)
const ballGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.set(0, 1, 0); // Set initial position of the ball
scene.add(ball);

// Handle keyboard input for tilting the flat area
const keyboardState = {};
document.addEventListener('keydown', (event) => {
  keyboardState[event.code] = true;
});

document.addEventListener('keyup', (event) => {
  keyboardState[event.code] = false;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Check keyboard input and tilt the plane accordingly
  if (keyboardState['KeyA']) {
    plane.rotation.z += 0.01;
  }

  if (keyboardState['KeyD']) {
    plane.rotation.z -= 0.01;
  }

  renderer.render(scene, camera);
}

// Set initial camera position
// camera.position.z = 5;
camera.position.set(0, 5, 15);

// Start the animation loop
animate();