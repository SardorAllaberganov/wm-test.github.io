var SEPARATION = 80, AMOUNTX = 60, AMOUNTY = 60;
var container, stats;
var camera, scene, renderer;
var particles, particle, count = 0;
var mouse = new THREE.Vector2();
var mouseX = 350, mouseY = -300;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 1;
init();
animate();

function init() {
  
  container = document.getElementById( 'waves' );
  camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 100;
  scene = new THREE.Scene();
  var material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true});
  particles = new Array();
  var PI2 = Math.PI * 2;


  var material = new THREE.SpriteCanvasMaterial( {
    color: 0x757575,
    program: function ( context ) {
      context.beginPath();
      context.arc(5, 0, 0.4, 5, PI2, true );
      context.fill();
    }
  } );
  var i = 0;
  for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
      particle = particles[ i ++ ] = new THREE.Sprite( material );
      particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
      particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
      scene.add( particle );
    }
  }
  renderer = new THREE.CanvasRenderer({ alpha: true }); // Set alpha `true` for transparency
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  
  // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  // document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  // document.addEventListener( 'touchmove', onDocumentTouchMove, false );
  
  window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
  windowHalfX = window.innerWidth / 4;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
//
function onDocumentMouseMove( event ) {
  // mouseX = window.innerHeight
  mouseX = event.clientX + 100;
  mouseY = event.clientY - 400;
}
function onDocumentTouchStart( event ) {
  if ( event.touches.length === 1 ) {
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}
function onDocumentTouchMove( event ) {
  if ( event.touches.length === 1 ) {
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}
//
function animate() {
  requestAnimationFrame( animate );
  render();
  // stats.update();
}

function render() {
  camera.position.x += ( mouseX - camera.position.x ) * .55;
  camera.position.y += ( - mouseY - camera.position.y ) * .55;
  camera.lookAt( scene.position );
  var i = 0;
  for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
      particle = particles[ i++ ];
      particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
      ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
      particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
      ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;
    }
  }
  renderer.render( scene, camera );
  count += 0.1;
}
