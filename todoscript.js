var scene
var camera
var renderer
var controls
var clock
var deltaTime
var keys = {}
var objetosConColison = []
var mixers = []
var mixers_2 = []
var objetosColeccionables = []
var totalesRecoleccion = 0
// var nivel = 1
var ganaste = false
var nivel1 = true
var nivel2 = false
var nivel3 = false
// Aqui empieza mi mugrego de pruebas----------------------------------------------------------------------------------------------------------------
let salto = false,
  y1,
  vi,
  t,
  ti,
  limite
// var deltaTime = clock.getDelta()

var isWorldReady = [false, false]
var rayCaster
$(document).ready(function () {
  rayCaster = new THREE.Raycaster()
  setupScene()

  // Sacar los rayos para las colisiones
  camera.Rayos = [
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0),
  ]
  camera.RayoPsio = [new THREE.Vector3(0, -1, 0)]

  camera.RayosTecho = [new THREE.Vector3(0, 1, 0)]

  var loader = new THREE.FBXLoader()
  loader.load('assets/ConejoRunning2.fbx', function (personaje) {
    personaje.mixer = new THREE.AnimationMixer(personaje)
    mixers_2.push(personaje.mixer)
    var action = personaje.mixer.clipAction(personaje.animations[0])
    action.play()

    // persona.position.set(personaje.position.x, 2, personaje.position.z)
    personaje.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    personaje.name = 'conejo2Animacion'
    scene.add(personaje)

    personaje.position.x = 2
    personaje.position.z = -5.1

    // personaje.add(camera)
  })
  var geometria = new THREE.BoxGeometry(1, 1, 1)

  // var material = new THREE.MeshLambertMaterial({
  //   color: new THREE.Color(0.7, 0.0, 0.0),
  // })

  // var material_2 = new THREE.MeshLambertMaterial({
  //   color: new THREE.Color(0.0, 0.0, 0.7),
  // })

  // var cubo01 = new THREE.Mesh(geometria, material)
  // cubo01.position.x = 15
  // cubo01.position.z = -6.1
  // scene.add(cubo01)
  // objetosColeccionables.push(cubo01)

  // var cubo02 = new THREE.Mesh(geometria, material_2)
  // cubo02.position.x = -15
  // cubo02.position.z = -6.1
  // scene.add(cubo02)
  // objetosColeccionables.push(cubo02)

  loadOBJWithMTL('assets/', 'LovelyChair.obj', 'LovelyChair.mtl', (muneca) => {
    // muneca.name = 'conejo1'

    scene.add(muneca)
    // muneca.add(camera)
    muneca.position.x = -10
    muneca.position.z = -5.1
    muneca.scale.set(0.25, 0.25, 0.25)
    objetosColeccionables.push(muneca)
    // objetosConColison.push(muneca)

    // isWorldReady[0] = true
  })
  loadOBJWithMTL('assets/', 'LovelyChair.obj', 'LovelyChair.mtl', (muneca) => {
    // muneca.name = 'conejo1'

    scene.add(muneca)
    // muneca.add(camera)
    muneca.position.x = 10
    muneca.position.z = -29
    muneca.scale.set(0.25, 0.25, 0.25)
    objetosColeccionables.push(muneca)
    // objetosConColison.push(muneca)

    // isWorldReady[0] = true
  })
  var loader = new THREE.FBXLoader()
  loader.load('assets/AnimacionesConejo.fbx', function (personaje) {
    personaje.mixer = new THREE.AnimationMixer(personaje)
    mixers.push(personaje.mixer)
    var action = personaje.mixer.clipAction(personaje.animations[0])
    action.play()

    // persona.position.set(personaje.position.x, 2, personaje.position.z)
    personaje.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    personaje.name = 'conejoAnimacion'
    scene.add(personaje)

    personaje.position.x = -1.7
    personaje.position.z = -5.1

    // personaje.add(camera)
  })
  loadOBJWithMTL('assets/', 'conejoEsc.obj', 'conejoEsc.mtl', (muneca) => {
    muneca.name = 'conejo1'

    // scene.add(muneca)
    // muneca.add(camera)
    muneca.position.x = -1.7
    muneca.position.z = -5.1

    // objetosConColison.push(muneca)

    isWorldReady[0] = true
  })

  loadOBJWithMTL(
    'assets/Escenario/',
    'EscenarioEsc.obj',
    'EscenarioEsc.mtl',
    (Escenario) => {
      // Escenario.name = 'nina'
      // Escenario.scale(1)
      Escenario.position.z = -10
      Escenario.rotation.y = THREE.Math.degToRad(-90)
      Escenario.position.y = -2
      scene.add(Escenario)

      // objetosConColison.push(muneca)
      objetosConColison.push(Escenario)

      isWorldReady[1] = true
    }
  )

  loadOBJWithMTL(
    'assets/Escenario2/',
    'EscenarioEsc2.obj',
    'EscenarioEsc2.mtl',
    (Escenario) => {
      // Escenario.name = 'nina'
      // Escenario.scale(1)
      Escenario.position.z = -33
      Escenario.rotation.y = THREE.Math.degToRad(-90)
      Escenario.position.y = -2
      scene.add(Escenario)

      // objetosConColison.push(muneca)
      objetosConColison.push(Escenario)

      isWorldReady[1] = true
    }
  )

  loadOBJWithMTL(
    'assets/Escenario3/',
    'EscenarioEsc3.obj',
    'EscenarioEsc3.mtl',
    (Escenario) => {
      // Escenario.name = 'nina'
      // Escenario.scale(1)
      Escenario.position.z = -63
      Escenario.rotation.y = THREE.Math.degToRad(-90)
      Escenario.position.y = -2
      scene.add(Escenario)

      // objetosConColison.push(muneca)
      objetosConColison.push(Escenario)

      isWorldReady[1] = true
    }
  )

  render()

  document.addEventListener('keydown', onKeyDown)
  document.addEventListener('keyup', onKeyUp)
})

function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
  var mtlLoader = new THREE.MTLLoader()
  mtlLoader.setPath(path)
  mtlLoader.load(mtlFile, (materials) => {
    var objLoader = new THREE.OBJLoader()
    objLoader.setMaterials(materials)
    objLoader.setPath(path)
    objLoader.load(objFile, (object) => {
      onLoadCallback(object)
    })
  })
}

function onKeyDown(event) {
  keys[String.fromCharCode(event.keyCode)] = true
}
function onKeyUp(event) {
  keys[String.fromCharCode(event.keyCode)] = false
}
y1 = 5
vi = 4.5
limite = 2

document.addEventListener('keyup', (e) => {
  // nina_Mov.rotation.y += yaw * deltaTime
  switch (e.keyCode) {
    // A
    case 32:
      ti = Date.now()
      salto = true
      // console.log('patata', salto)
      break
  }
})

function render() {
  requestAnimationFrame(render)
  deltaTime = clock.getDelta()
  // console.log(salto, 'puta')
  var yaw = 0
  var forward = 0
  var yaw_2 = 0
  var forward_2 = 0

  var nina_Mov = scene.getObjectByName('conejoAnimacion')
  var nina_Mov_2 = scene.getObjectByName('conejo2Animacion')

  if (mixers.length > 0) {
    for (var i = 0; i < mixers.length; i++) {
      mixers[i].update(deltaTime)
    }
  }

  if (mixers_2.length > 0) {
    for (var i = 0; i < mixers_2.length; i++) {
      mixers_2[i].update(deltaTime)
    }
  }
  if (keys['A']) {
    yaw = 5
  } else if (keys['D']) {
    yaw = -5
  }
  if (keys['W']) {
    forward = 5
  } else if (keys['S']) {
    forward = -5
  }

  if (keys['J']) {
    yaw_2 = 5
  } else if (keys['L']) {
    yaw_2 = -5
  }
  if (keys['I']) {
    forward_2 = 5
  } else if (keys['K']) {
    forward_2 = -5
  }

  if (isWorldReady[0] && isWorldReady[1]) {
    // camera.rotation.y += yaw * deltaTime
    // camera.translateZ(forward * deltaTime)
    nina_Mov.translateZ(forward * deltaTime)
    nina_Mov.rotation.y += yaw * deltaTime

    nina_Mov_2.translateZ(forward_2 * deltaTime)
    nina_Mov_2.rotation.y += yaw_2 * deltaTime
    // console.log(
    //   nina_Mov.position.x,
    //   nina_Mov.position.z,
    //   nina_Mov.position.y,
    //   'aqui esta la morrita x,z,y'
    // )

    for (var i = 0; i < camera.Rayos.length; i++) {
      var rayo = camera.Rayos[i]

      rayCaster.set(nina_Mov.position, rayo)

      var colisiones = rayCaster.intersectObjects(objetosConColison, true)
      var colisionesRe = rayCaster.intersectObjects(objetosColeccionables, true)
      // console.log(objetosConColison, 'colisiones')

      if (colisiones.length > 0) {
        // console.log('PAPA')
        if (colisiones[0].distance < 1) {
          console.log('colisiono')
          nina_Mov.translateZ(-(forward * deltaTime))
          // console.log(nina_Mov.position)

          // nina_Mov.translateY(-(forward * deltaTime))
        }
      }

      if (colisionesRe.length > 0) {
        // console.log('PAPA')
        if (colisionesRe[0].distance < 2) {
          // console.log('Tope con objeto')
          scene.remove(colisionesRe[0].object.parent)
          totalesRecoleccion = +1
        }
      }
    }

    for (var i = 0; i < camera.RayoPsio.length; i++) {
      var rayoSuelo = camera.RayoPsio[i]

      rayCaster.set(nina_Mov.position, rayoSuelo)

      var colisiones = rayCaster.intersectObjects(objetosConColison, true)

      if (colisiones.length > 0) {
        // console.log('Topo lo piso')
        if (colisiones[0].distance < 1) {
          // variable que cuando este muy junta se cambie a true
          nina_Mov.translateY(-(forward * deltaTime))
          // console.log('toy ´pisando')
        }
      }
    }

    if (salto) {
      t = ((Date.now() - ti) / 1000) * 2
      let yDis = y1 + vi * t - (0.5 * 9.8 + Math.pow(t, 2))
      // if (yDis <= y1) {
      //   salto = false
      // }
      if (nina_Mov.position.y <= 0)
        //   // console.log('putos')
        salto = false
      // nina_Mov.position.y = 0

      nina_Mov.position.y = yDis
    }
  }
  console.log(totalesRecoleccion, 'puntos')
  if (totalesRecoleccion == 1) {
    alert('-----PASASTE NIVEL 2------')
    ganaste = true
  }
  if (ganaste == true && nivel1 == true) {
    ganaste = false
    totalesRecoleccion = 0
    camera.position.z = -10
    nina_Mov.position.z = -29
    nina_Mov.position.x = -10
    yaw = 0
    forward = 0

    nina_Mov_2.position.z = -29
    nina_Mov_2.position.x = 10
    yaw_2 = 0
    forward_2aaa = 0
    // nivel = 2
    nivel1 = false
    nivel2 = true
  }
  if (nivel2 == true && ganaste == true) {
    ganaste = false
    totalesRecoleccion = 0
    camera.position.z = -40
    nina_Mov.position.z = -59
    nina_Mov.position.x = -10
    yaw = 0
    forward = 0

    nina_Mov_2.position.z = -59
    nina_Mov_2.position.x = 10
    yaw_2 = 0
    forward_2aaa = 0
    nivel2 = false
    nivel1 = false
    nivel3 = true
  }

  renderer.render(scene, camera)
}

function setupScene() {
  var visibleSize = {
    width: '1300',
    height: '700',
  }
  clock = new THREE.Clock()
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    75,
    visibleSize.width / visibleSize.height,
    0.1,
    100
  )
  camera.position.z = 13
  camera.position.y = 12

  renderer = new THREE.WebGLRenderer({ precision: 'mediump' })
  renderer.setClearColor(new THREE.Color(0.064, 0.0142, 0.153))
  renderer.setPixelRatio(visibleSize.width / visibleSize.height)
  renderer.setSize(visibleSize.width, visibleSize.height)

  var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 1.0)
  scene.add(ambientLight)

  var directionalLight = new THREE.DirectionalLight(
    new THREE.Color(1, 1, 0),
    0.4
  )
  directionalLight.position.set(0, 0, 1)
  scene.add(directionalLight)

  // var grid = new THREE.GridHelper(50, 10, 0xffffff, 0xffffff)
  // grid.position.y = -1
  // scene.add(grid)

  $('#scene-section').append(renderer.domElement)
}
