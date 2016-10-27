var camera, scene,renderer;
var cube,group;
var groups = [];
var pointLight;

// data file
var dataSets;
var scale = 0.002; //   scale/n

// fly over control
var controls;
var clock = new THREE.Clock();

init();
animatedRender();


function init() {
    dataSets = {
      farmerMarketsCords,
      waterQualityComplaints,
      greenthumbCommunityGardens,
      coolRoofs,
      foodScrapSites,
      projectsInConstruction,
      nycDomainRegistrations,
      wholesaleMarkets,
      publicRecyclingBins,
      healthHospitalFacilities
    };
    console.log(dataSets);

    var viewAngle = 75;
    var aspectRatio = window.innerWidth / window.innerHeight;
    var near = 0.1;
    var far = 10000;
    camera = new THREE.PerspectiveCamera(viewAngle, aspectRatio, near, far);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);

    container = document.createElement( 'div' );
    document.body.appendChild( container );
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);

    // light
    pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.z = 10;
    camera.position.x = 20380.988243112966;
    camera.position.y = -36974.9998374725;
    camera.position.z = -100;
    camera.rotation.x = Math.PI;
    camera.rotation.z = -Math.PI/2;

    controls = new THREE.FlyControls( camera );
    controls.movementSpeed = 30;
    controls.domElement = container;
    controls.rollSpeed = 0.2;
    controls.autoForward = false;
    controls.dragToLook = false;

    // fog and background
    scene.fog = new THREE.Fog(0xffffff, near, 600);
    var skyColor = new THREE.Color(1.0, 1.0, 1.0);
    renderer.setClearColor(skyColor, 1.0);

    // create geometries out of data
    generateData01();
    generateData10();

    // add in all the geopmtery groups
    for (var i = 0; i < groups.length; i++) {
      scene.add(groups[i]);
    }

    scene.add(pointLight);
    scene.add(camera);
}


function animatedRender() {
    requestAnimationFrame(animatedRender);
    var delta = clock.getDelta();
    controls.update(delta);

    renderer.render(scene, camera);

}

function generateData10() {

  // specify data set
  var data = dataSets.farmerMarketsCords;
  console.log("Data Lenght: " + data.length);
  var geometry;
  var material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    emissiveIntensity: 0.6,
    vertexColors: THREE.FaceColors,
    wireframe: false
  });

  var group = new THREE.Group();
  for (var i = 0; i < data.length; i++) {
    geometry = new THREE.BoxGeometry(1, 4, 1);
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = data[i].lat/scale;
    cube.position.y = data[i].lng/scale;
    cube.position.z = 0;

    group.add(cube);

    geometry = new THREE.BoxGeometry(4, 1, 1);
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = data[i].lat/scale;
    cube.position.y = data[i].lng/scale;
    cube.position.z = 0;

    group.add(cube);
  }
  groups.push(group);
}

function generateData01() {

  // specify data set
  var data = dataSets.healthHospitalFacilities;
  console.log("Data Lenght: " + data.length);
  var geometry;
  var material = new THREE.MeshStandardMaterial({
    emissive: 0x8de564,
    emissiveIntensity: 0.5,
    vertexColors: THREE.FaceColors,
    wireframe: false
  });

  var group = new THREE.Group();
  var coneHeight = 10;
  for (var i = 0; i < data.length; i++) {
    geometry = new THREE.ConeBufferGeometry( 2, coneHeight, 20 );

    cube = new THREE.Mesh(geometry, material);
    cube.rotation.x = -Math.PI/2;
    cube.position.x = data[i].lat/scale;
    cube.position.y = data[i].lng/scale;
    cube.position.z = -coneHeight/2;

    // cube.updateMatrix();
    group.add(cube);
  }
  groups.push(group);
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
