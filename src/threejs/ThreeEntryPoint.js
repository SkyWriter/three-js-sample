// Import dependencies
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader  } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function ThreeEntryPoint(sceneRef) {
  // Create Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x282c34);

  // Define a camera, set it to fill the browser window and position it
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.z = 5;

  // Define a renderer, and set it to fill the browser window
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Get an element from the DOM and append renderer.domElement to it
  sceneRef.appendChild(renderer.domElement);

  // Add controls, targetting the same DOM element
  let controls = new OrbitControls(camera, sceneRef);
  controls.target.set(0, 0, 0);
  controls.rotateSpeed = 0.5;
  controls.update();

  // Define (or import) your object's geometry
  const geometry = new THREE.TorusKnotGeometry(10, 1.3, 500, 6, 6, 20);

  // Define your object's material
  const material = new THREE.MeshStandardMaterial({
    color: 0xfcc742,
    emissive: 0x111111,
    specular: 0xffffff,
    metalness: 1,
    roughness: 0.55
  });

  // Create lights, position them, and add them to the scene
  const frontSpot = new THREE.SpotLight(0xeeeece, 2);
  const frontSpot2 = new THREE.SpotLight(0xddddce, 2);

  frontSpot.position.set(1000, 1000, 1000);
  frontSpot2.position.set(-500, -500, -500);

  scene.add(frontSpot);
  scene.add(frontSpot2);

  var mesh;

  // Create an animate function, which will allow you to render your scene and define any movements
  const animate = function () {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;
    mesh.rotation.z += 0.005;

    renderer.render(scene, camera);
  };

  {
    const loader = new GLTFLoader();

    loader.load( '/dick.glb', function ( gltf ) {
      mesh = gltf.scene.children[0];
      mesh.scale.set( 0.02, 0.02, 0.02 );
      scene.add(mesh);
      animate();
    } );

  }
}
