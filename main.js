import './style.css'
import WebGL from './WebGL';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
//camera- field wiew,aspect ratio,view frustum==most common data based on eyeball persepective

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//to render out actual graphic:canvas that we want to use, here id=bg element
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio); //pixelratio to deviceratio
renderer.setSize(window.innerWidth, window.innerHeight); //fullscreen
camera.position.setZ(30); //bttr perspective along z-axis


//1.geimetry to define that vector
//2.material to give color:wrapping that shape
//3.mesh=combine geometry with material
//const Texture = new THREE.TextureLoader().load('/img/new.jpg');
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xDC143C });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

//populating scene with RANDOMLY generated MULTIPLE STARS
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  //randomly generating by a const of three values
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

//no of stars displaying
Array(200).fill().forEach(addStar);

//SPACE
const spaceTexture = new THREE.TextureLoader().load('sp.jpg');
scene.background = spaceTexture;

//CUBE TEXTURE & MESH(=GEOMETRY+MATERIAL)
    //const meTexture = new THREE.TextureLoader().load('/img/one.jpg');
    //const me = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: meTexture }));
//ADDING DIFF TEXT ON EACH SIDE
const me_geo = new THREE.BoxGeometry(3, 3, 3);
const me_mat = [
  new THREE.MeshBasicMaterial({ map:  new THREE.TextureLoader().load("/img/one.jpg") }),//x +ve

  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("/img/two.jpg") }),//x -ve
  
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("/img/three.jpg") }),//y +ve
  
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("/img/four.jpg") }),//y -ve

  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("/img/five.jpg") }),//z +ve
  
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("/img/six.jpg") })//z -ve
  

];
const me = new THREE.Mesh(me_geo, me_mat);

scene.add(me);

//MOON
const moonTexture = new THREE.TextureLoader().load('/img/moon.png');
const normalTexture = new THREE.TextureLoader().load('/img/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
   normalMap: normalTexture,
  })
);

scene.add(moon);

//POSITION
moon.position.z = 25;
moon.position.setX(-12);
moon.position.setY(-4);

me.position.z = -5;
me.position.x = 2;




// const heartShape = new THREE.Shape();

// heartShape.moveTo( 25, 25 );
// heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
// heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
// heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
// heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
// heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
// heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

// const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

// const ge = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );

// const mesh = new THREE.Mesh( ge, new THREE.MeshPhongMaterial() );
// scene.add(mesh);


//MOVE CAMERA ON SCROLLING
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  me.rotation.y += 0.01;
  me.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

// document.body.onscroll = moveCamera;
// moveCamera();


//as we need renderer to run again so we r creating infinte loop to avoid multiple times writing that
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.04;
  torus.rotation.z += 0.01;

  controls.update(); //to update controls-mouse controlling 
  
  renderer.render(scene, camera);
}

animate();


