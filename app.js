// set the scene size
var WIDTH = 150,
  HEIGHT = 300;

// set some camera attributes
var VIEW_ANGLE = 45,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 10000;

// get the DOM element to attach to
// - assume we've got jQuery to hand
var containerEl = document.querySelector('.container');




// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
var camera =
  new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);

camera.position.z = 300;
camera.position.y = 80;

var scene = new THREE.Scene();
scene.add(camera);




var colour = 'rgb(0, 200, 255)';
var wireframeMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: colour
});

var group = new THREE.Object3D();//create an empty container

var cubeWidth = 50;
var cube = new THREE.Mesh(
  new THREE.CubeGeometry( cubeWidth, cubeWidth, cubeWidth),
  wireframeMaterial
);

cube.position.x = -cubeWidth/2;
cube.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( cubeWidth/2, cubeWidth/2, 0 ) );




//cube.applyMatrix(matrix );
group.add(cube);




var plane = new THREE.Mesh(
  new THREE.PlaneGeometry(cubeWidth, cubeWidth, 1, 1),
  wireframeMaterial
);
plane.overdraw = true;
plane.rotation.x = Math.PI * 0.5;
group.add(plane);


var plane2 = new THREE.Mesh(
  new THREE.PlaneGeometry(cubeWidth, cubeWidth, 1, 1),
  wireframeMaterial
);
plane2.overdraw = true;
plane2.rotation.x = Math.PI * 0.5;
plane2.position.x = cubeWidth;
group.add(plane2);




// create a point light
var pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;
scene.add(pointLight);



containerEl.appendChild(renderer.domElement);
renderer.setSize(WIDTH, HEIGHT);


var speed = 1;

scene.add(group);

function anim() {
  cube.rotateZ( (Math.PI / 180) * speed);
  group.translateX(speed/1.8);

  if (this.cube.rotation.z > ((Math.PI / 180) * 90)) {
    this.cube.rotation.z = 0
    group.position.x = 0;
  }


  renderer.render(scene, camera);
  requestAnimationFrame(anim);
}
//cube.rotateZ( (Math.PI / 180) * 80.4);
//renderer.render(scene, camera);

anim();