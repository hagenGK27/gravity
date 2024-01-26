// main.js

import * as THREE from 'three';

// Set up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Adjust camera position and look at the scene from a 45-degree angle to the x-axis
camera.position.set(5, 5, 0);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

// Create box (with thickness) instead of plane
const boxGeometry = new THREE.BoxGeometry(5, 0.2, 5);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, opacity: 1, transparent: false });
const box = new THREE.Mesh(boxGeometry, boxMaterial);

scene.add(box);

// Create ball
const ballGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.set(0, 1, 0);
scene.add(ball);

// Create 3D coordinate system without labeled axes
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Set up keyboard controls
const keys = { tiltUp: false, tiltDown: false, tiltLeft: false, tiltRight: false };

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            keys.tiltUp = true;
            break;
        case 'ArrowDown':
            keys.tiltDown = true;
            break;
        case 'ArrowLeft':
            keys.tiltLeft = true;
            break;
        case 'ArrowRight':
            keys.tiltRight = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            keys.tiltUp = false;
            break;
        case 'ArrowDown':
            keys.tiltDown = false;
            break;
        case 'ArrowLeft':
            keys.tiltLeft = false;
            break;
        case 'ArrowRight':
            keys.tiltRight = false;
            break;
    }
});

// Set up animation
const animate = () => {
    requestAnimationFrame(animate);

    // Update box tilt based on pressed keys
    if (keys.tiltUp) box.rotation.x += 0.02;
    if (keys.tiltDown) box.rotation.x -= 0.02;
    if (keys.tiltLeft) box.rotation.z += 0.02;
    if (keys.tiltRight) box.rotation.z -= 0.02;

    renderer.render(scene, camera);
};

// Start animation
animate();
