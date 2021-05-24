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
var totalesRecoleccion = 14
var ganaste = false
var nivel1 = true
var nivel2 = false
var nivel3 = false
// Aqui empieza mi mugrego de pruebas----------------------------------------------------------------------------------------------------------------
let salto = false
let saltoH = false
let y1
let vi
let t
let ti
let limite

let y1H
let viH
let tH
let tiH
let limiteH
// Cosas del Firebase
var databaseService
var jugadores = []
var puntuacion = 0
var key
// PRUEBAS COLISION PISO
var alturaPiso = 0
var tipoSalto

var alturaPisoH = 0
var tipoSaltoH

var isWorldReady = [false, false]
var rayCaster

///////////////////////
var particleSystem
var particleCount = 50 //cantidad de particulas
var particles

var bala
var balas = []

var reproducirParticulas = false
var end = false
//////////////////////

var tiempoexra = 0
localStorage.setItem('tiempoexra', tiempoexra)
$(document).ready(function () {
  // createPlayerConst()
  rayCaster = new THREE.Raycaster()
  setupScene()

  // //////// ESTO ME TRAE EL ULTIMO NODO DEL FIREBASE, DONDE VOY A ESTAR ACTUALIZANDO LOS PUNTOS /////////////
  const dbRefPlayers = firebase.database().ref().child('Puntuaciones')
  dbRefPlayers.on('child_added', function (snap, prevChildKey) {
    key = snap.key
    console.log(key, prevChildKey)
  })
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  ////// Sacar los rayos para las colisiones del personaje ///////
  camera.Rayos = [
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, -1, 0),
  ]
  camera.Rayos2 = [
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, -1, 0),
  ]
  ///////////// AQUI ESTAN LOS ENGRANES QUE DEBE DE JUNTAR POR NIVEL /////////////////////////////////
  loadOBJWithMTL('assets/', 'engrane.obj', 'engrane.mtl', (muneca) => {
    scene.add(muneca)
    muneca.position.x = -5
    muneca.position.z = -5.1
    muneca.scale.set(0.25, 0.25, 0.25)
    muneca.name = '01'
    muneca.atrapada = false
    objetosColeccionables.push(muneca)
  })
  loadOBJWithMTL('assets/', 'engrane.obj', 'engrane.mtl', (muneca) => {
    scene.add(muneca)
    muneca.position.x = 9
    muneca.position.z = -5.1
    muneca.scale.set(0.25, 0.25, 0.25)
    muneca.name = '02'
    muneca.atrapada = false
    objetosColeccionables.push(muneca)
  })
  loadOBJWithMTL('assets/', 'engrane.obj', 'engrane.mtl', (muneca) => {
    scene.add(muneca)
    muneca.position.x = 6
    muneca.position.z = -6.5
    muneca.position.y = 12
    muneca.scale.set(0.25, 0.25, 0.25)
    muneca.name = '03'
    muneca.atrapada = false
    objetosColeccionables.push(muneca)
  })
  loadOBJWithMTL('assets/', 'engrane.obj', 'engrane.mtl', (muneca) => {
    scene.add(muneca)
    muneca.position.x = -16
    muneca.position.z = -6.5
    muneca.position.y = 7
    muneca.scale.set(0.25, 0.25, 0.25)
    muneca.name = '04'
    muneca.atrapada = false
    objetosColeccionables.push(muneca)
  })
  loadOBJWithMTL('assets/', 'engrane.obj', 'engrane.mtl', (muneca) => {
    scene.add(muneca)
    muneca.position.x = -2
    muneca.position.z = -6.5
    muneca.position.y = 20
    muneca.scale.set(0.25, 0.25, 0.25)
    muneca.name = '05'
    muneca.atrapada = false
    objetosColeccionables.push(muneca)
  })
  loadOBJWithMTL('assets/', 'engrane.obj', 'engrane.mtl', (muneca) => {
    scene.add(muneca)
    muneca.position.x = -16
    muneca.position.z = -6.5
    muneca.position.y = 23
    muneca.scale.set(0.25, 0.25, 0.25)
    muneca.name = '06'
    muneca.atrapada = false
    objetosColeccionables.push(muneca)
  })
  loadOBJWithMTL('assets/', 'engrane.obj', 'engrane.mtl', (muneca) => {
    scene.add(muneca)
    muneca.position.x = 16
    muneca.position.z = -6.5
    muneca.position.y = 23
    muneca.scale.set(0.25, 0.25, 0.25)
    muneca.name = '07'
    muneca.atrapada = false
    objetosColeccionables.push(muneca)
  })
  loadOBJWithMTL('assets/', 'engrane.obj', 'engrane.mtl', (muneca) => {
    scene.add(muneca)
    muneca.position.x = 2
    muneca.position.z = -5.1
    muneca.scale.set(0.25, 0.25, 0.25)
    muneca.name = '08'
    muneca.atrapada = false
    objetosColeccionables.push(muneca)
  })
  //   PowerUP BLANCAS
  loadOBJWithMTL('assets/', 'engrane.obj', 'engrane.mtl', (muneca) => {
    scene.add(muneca)
    muneca.position.x = -2
    muneca.position.z = -6.5
    muneca.position.y = 14
    muneca.scale.set(0.25, 0.25, 0.25)
    muneca.name = '09'
    muneca.atrapada = false
    objetosColeccionables.push(muneca)
  })
  loadOBJWithMTL('assets/', 'engrane.obj', 'engrane.mtl', (muneca) => {
    scene.add(muneca)
    muneca.position.x = -5
    muneca.position.z = -6.5
    muneca.position.y = 14
    muneca.scale.set(0.25, 0.25, 0.25)
    muneca.name = '10'
    muneca.atrapada = false
    objetosColeccionables.push(muneca)
  })

  // ////////////////ESTOS SON LOS PERSONAJES ////////////////////////////////////////////////////////
  var loader = new THREE.FBXLoader()
  loader.load('assets/ConejoRunning2.fbx', function (personaje) {
    personaje.mixer = new THREE.AnimationMixer(personaje)
    mixers_2.push(personaje.mixer)
    var action = personaje.mixer.clipAction(personaje.animations[0])
    action.play()
    personaje.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    personaje.name = 'conejo2Animacion'
    scene.add(personaje)

    personaje.position.x = 15
    personaje.position.z = -5.1
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

    personaje.position.x = -15
    personaje.position.z = -5.1

    // personaje.add(camera)
  })
  // si elimino este luego ya no se mueve, no se porqe :'v haha que kreisi mejor ahi lo dejo//
  loadOBJWithMTL('assets/', 'conejoEsc.obj', 'conejoEsc.mtl', (muneca) => {
    muneca.name = 'conejo1'
    muneca.position.x = -1.7
    muneca.position.z = -5.1

    isWorldReady[0] = true
  })
  ///////////////////////////////////////////////////////////////////////////////
  ///////////// ESTE ES EL ESCENARIO /////////////////////
  loadOBJWithMTL(
    'assets/Escenario3/',
    'EscenarioEsc3.obj',
    'EscenarioEsc3.mtl',
    (Escenario) => {
      Escenario.position.z = -10
      Escenario.rotation.y = THREE.Math.degToRad(-90)
      Escenario.position.y = -2
      scene.add(Escenario)
      objetosConColison.push(Escenario)

      isWorldReady[1] = true
    }
  )

  render()

  document.addEventListener('keydown', onKeyDown)
  document.addEventListener('keyup', onKeyUp)
})
// Funcion que paso el profe para cargar los .obj //
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
// /////////ESTAS SON PARA LEER EL TECLADO, QUE TECLA PRESIONASTE //////////////////////
function onKeyDown(event) {
  keys[String.fromCharCode(event.keyCode)] = true
}
function onKeyUp(event) {
  keys[String.fromCharCode(event.keyCode)] = false
}
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////
var contadorAinima = 0
var duracionParti = 3 //duracion de las particulas en la escena
//////////////////////////////////

// // SON VALORES QUE DECLARO PARA EL BRINCO DE LOS PERSONAJES (H valores del jugador 2)//////////////////////////////////////
y1 = 5
vi = 4.5
limite = 2

y1H = 5
viH = 4.5
limiteH = 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////

function render() {
  requestAnimationFrame(render)
  deltaTime = clock.getDelta()
  if (!end) {
    var yaw = 0
    var forward = 0
    var yaw_2 = 0
    var forward_2 = 0

    // Aca hace la referencia del ultimo hujo del firebase para sacar la clave de hijos y que modifique ese mero.
    //  despues de que arriba consegui la llave (key) que mando como parametro
    //  busca de mi tabla puntuaciones/{la key que obtuve arriba}
    const referencia = firebase.database().ref().child(`Puntuaciones/${key}`)

    // variables para modificar las posiciones de mis pesonajes
    var nina_Mov = scene.getObjectByName('conejoAnimacion')
    var nina_Mov_2 = scene.getObjectByName('conejo2Animacion')
    var objetoCol = scene.getObjectByName('01')
    /////////////////////////////////////////////////////////////

    // ESTO ES PARA QUE CORRA LA ANIMACION DE LOS PERSONAJES ///////////////////////////////
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
    //////////////////////////////////////////////////////////////////////////////////////
    // AQUI CHECO EL ESTADO DEL SALTO, SI ESTA ACTIVADO O NO
    //  Inicializo el tiempo actual para que haga la 'animacion' ; vi es la altura maxima ; tipo salto es para saber
    // si esta cayendo, salto es para saber que va pa arriba
    // F es para el jugador 1 y H es para el jugador 2
    if (keys['F']) {
      if (salto == false) {
        ti = Date.now()
        salto = true
        vi = 4.5
        tipoSalto = 1
      }
    }

    if (keys['H']) {
      if (saltoH == false) {
        tiH = Date.now()
        saltoH = true
        viH = 4.5
        tipoSaltoH = 1
      }
    }

    // TECLAS PARA MOVER AL PERSONAJE ///////////////////////////////////////////////////////////////////
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
    ///////////////////////////////////////////////////////////////////////////////////////////

    // ACA COMIENZA LA MAGIA cuando el mundo se carga entra aqui
    if (isWorldReady[0] && isWorldReady[1]) {
      // esto mueve a los personajes
      nina_Mov.translateZ(forward * deltaTime)
      nina_Mov.rotation.y += yaw * deltaTime

      nina_Mov_2.translateZ(forward_2 * deltaTime)
      nina_Mov_2.rotation.y += yaw_2 * deltaTime
      // ///////////////////////////////////////////////////////

      // Aca estoy checando los rayos de las colisiones del personaje 1
      for (var i = 0; i < camera.Rayos.length; i++) {
        var rayo = camera.Rayos[i]
        // personaje 1 rayos para checar colisiones
        rayCaster.set(nina_Mov.position, rayo)
        //  aca creo arreglos con los objetos que quiero que colisione
        // Colisiones es el arreglo del escenario para que choque
        var colisiones = rayCaster.intersectObjects(objetosConColison, true)
        // colisionesRe son donde guarde todos los engranes y que colisione con ellos tenga otro comportamiento
        var colisionesRe = rayCaster.intersectObjects(
          objetosColeccionables,
          true
        )
        // SI colisiones(escenario) aca siempre va a entrar porque nomas hay un modelo
        if (colisiones.length > 0) {
          // 'i'  es el arreglo actual del rayo, checho si es igual a 4 , porque en esa posicion del arreglo es
          // mi rayo del piso, paraa saber la plataforma
          if (i == 4) {
            // si la altura piso (que inicia en 0) es igual a la posion actual del pesonaje menos la distancia del
            // objeto mas cercano + 0.01 (le sumo 0.01 porque el pivote del modelo queda muy pegado)
            // altura piso es para saber la posion de plataforma de mi personaje , que usare para checar el salto
            alturaPiso = nina_Mov.position.y - colisiones[0].distance + 0.01

            // Si la distancia de la colion mas cercana es menor a 2 ,y no estoy saltando (salto== false) significa que estoy cayendo
            if (colisiones[0].distance > 2 && salto == false) {
              // y si estoy cayendo activo los valores que usare para activar la 'animacion' de caida.
              // actualizo mi valor de tipo salto
              //  y y1 es la posicion actual de mi personaje
              ti = Date.now()
              salto = true
              tipoSalto = 2

              vi = 0
              y1 = nina_Mov.position.y
            }
          } else {
            // si estoy faltando entra a este if que dice que si distancia a la colicion mas cercana es menor a 1
            //  ya no deje que se mueva mi personaje
            if (colisiones[0].distance < 1) {
              nina_Mov.translateZ(-(forward * deltaTime))
            }
          }
        }
        // Este if es para recolectar los engranes
        // recorro primero todos los objetos en mi arreglo de ColisionesRE
        if (colisionesRe.length > 0) {
          if (
            colisionesRe[0].distance < 1 &&
            colisionesRe[0].object.parent.atrapada == false
          ) {
            if (
              colisionesRe[0].object.parent.name == '09' ||
              colisionesRe[0].object.parent.name == '10'
            ) {
              tiempoexra = tiempoexra + 1
              console.log('holis', tiempoexra)
              localStorage.setItem('tiempoexra', tiempoexra)
            }
            for (var i = 0; i < objetosColeccionables.length; i++) {
              if (
                objetosColeccionables[i].name ==
                colisionesRe[0].object.parent.name
              ) {
                objetosColeccionables[i].atrapada = true
              }
            }
            reproducirParticulas = true
            spawnParticulas(colisionesRe[0].object.parent.position)
            // quito el objeto de la escena
            scene.remove(colisionesRe[0].object.parent)
            // sumo los puntos que va recolectando
            totalesRecoleccion = totalesRecoleccion + 1
            //  Con esto actualiza la puntuacion cuando topas con la colision
            // Con esto actualizo en la base de datos de Firebase
            // referencia esta declarada arriba, es donde ya busque la ruta a que hijo de la tabla puntuaciones
            // le voy a actualizar los puntos
            // Guardo los puntos en el local storage
            localStorage.setItem('totalesRecoleccion', totalesRecoleccion)
            referencia.update({
              PuntuacionEquipo: totalesRecoleccion,
            })
          }
        }
      }
      // aca checho el estado del salto del personaje 1
      // Si estoy saltando osea presionando la tecla F entro en este if
      if (salto) {
        // Aqui declaro el tiempo para hace el salto (es como si creara frames por ejemplo , por cada segundo un frame)
        t = ((Date.now() - ti) / 1000) * 2
        //  esta va a ser la posision que voy a actualizar de la altura que este ganando mi personaje
        // con esta funcion estoy cayendo
        let yDis = y1 + vi * t - 6 * Math.pow(t, 2)
        // con esta funcion hago lo mismo, pero con esta es para la animacion del salto, abarca mas espacio
        if (tipoSalto == 1) {
          yDis = y1 + vi * t - (0.5 * 9.8 + Math.pow(t, 2))
        }

        // actualizo el valor actual a la posision de mi personaje 1
        nina_Mov.position.y = yDis

        // Si la posicion de mi personaje ya es menor o igual a la del suelo, entonces el salto acabo
        // y la posicion de altura de mi personaje cambio a ser la altura actual del piso de la platadorma
        // le sumo mas 5 a y1 ya que es la diferencia que tiene el modelo del y=0 en el mundo en general
        if (nina_Mov.position.y <= alturaPiso) {
          salto = false
          nina_Mov.position.y = alturaPiso
          y1 = alturaPiso + 5
        }
        // esta validacion es para checar cuando esta en la primera plataforma, en el suelo inicial, y que no se caiga al
        // vacio cuando se sale el escenario
        if (nina_Mov.position.y <= 0) {
          alturaPiso = 0.01
          salto = false
          nina_Mov.position.y = alturaPiso
          y1 = alturaPiso + 5
        }
      }

      //
      for (var i = 0; i < camera.Rayos2.length; i++) {
        var rayo = camera.Rayos2[i]
        rayCaster.set(nina_Mov_2.position, rayo)
        var colisiones = rayCaster.intersectObjects(objetosConColison, true)
        var colisionesRe = rayCaster.intersectObjects(
          objetosColeccionables,
          true
        )
        if (colisiones.length > 0) {
          if (i == 4) {
            alturaPisoH = nina_Mov_2.position.y - colisiones[0].distance + 0.01
            if (colisiones[0].distance > 2 && saltoH == false) {
              tiH = Date.now()
              saltoH = true
              tipoSaltoH = 2

              viH = 0
              y1H = nina_Mov_2.position.y
            }
          } else {
            if (colisiones[0].distance < 1) {
              nina_Mov_2.translateZ(-(forward_2 * deltaTime))
            }
          }
        }

        if (colisionesRe.length > 0) {
          if (
            colisionesRe[0].distance < 1 &&
            colisionesRe[0].object.parent.atrapada == false
          ) {
            if (
              colisionesRe[0].object.parent.name == '09' ||
              colisionesRe[0].object.parent.name == '10'
            ) {
              tiempoexra = tiempoexra + 1
              console.log('holis', tiempoexra)
              localStorage.setItem('tiempoexra', tiempoexra)
            }
            if (reproducirParticulas == false) {
              for (var i = 0; i < objetosColeccionables.length; i++) {
                if (
                  objetosColeccionables[i].name ==
                  colisionesRe[0].object.parent.name
                ) {
                  objetosColeccionables[i].atrapada = true
                }
              }
              reproducirParticulas = true
              spawnParticulas(colisionesRe[0].object.parent.position)
              scene.remove(colisionesRe[0].object.parent)
              totalesRecoleccion = totalesRecoleccion + 1
              localStorage.setItem('totalesRecoleccion', totalesRecoleccion)
              referencia.update({
                PuntuacionEquipo: totalesRecoleccion,
              })
            }
          }
        }
      }

      if (saltoH) {
        tH = ((Date.now() - tiH) / 1000) * 2

        let yDisH = y1H + viH * tH - 6 * Math.pow(tH, 2)

        if (tipoSaltoH == 1) {
          yDisH = y1H + viH * tH - (0.5 * 9.8 + Math.pow(tH, 2))
        }

        nina_Mov_2.position.y = yDisH

        if (nina_Mov_2.position.y <= alturaPisoH) {
          saltoH = false
          nina_Mov_2.position.y = alturaPisoH
          y1H = alturaPisoH + 5
        }

        if (nina_Mov_2.position.y <= 0) {
          alturaPisoH = 0.01
          saltoH = false
          nina_Mov.position_2.y = alturaPisoH
          y1H = alturaPisoH + 5
        }
      }
    }
  }
  //ANIMACION DE LAS PARTICULAS//
  if (reproducirParticulas == true) {
    contadorAinima += deltaTime
    particleSystem.rotation.y += 0.001

    if (contadorAinima >= duracionParti) {
      contadorAinima = 0
      // end = true
      reproducirParticulas = false
      scene.remove(particleSystem)
    }
  }
  /////////////////////////////////
  //   console.log(totalesRecoleccion, 'totalesRecoleccion')
  renderer.render(scene, camera)
}

// A ESTO NO LE MOVI, LO DEJE TAL CUAL EL PROFE EN LA PLANTILLA QUE PASO , PERO ES PARA INICIAR LA ESCENA.
function setupScene() {
  var visibleSize = {
    width: 1150,
    height: 725,
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
  $('#scene-section').append(renderer.domElement)
}

// Esto es para cuando se crea hijos ; que guarde los nombres en la base de firebase
function createPlayerConst() {
  //   var nombre = $('#txtName').val()
  //   userName = nombre
  var jugador1 = localStorage.getItem('Jugador1')
  var jugador2 = localStorage.getItem('Jugador2')
  // var nombre = $('#txtName').val()
  userName = jugador1 + ' y ' + jugador2
  // $('#container').hide()

  var PuntuacionEquipo = 0
  const dbRefPlayers = firebase.database().ref().child('Puntuaciones')

  var newPlayer = dbRefPlayers.push()
  newPlayer.set({
    userName,
    PuntuacionEquipo,
  })
}

function spawnParticulas(target) {
  ////////////////PARTICULAS///////////////////////

  // create the particle variables

  ;(particles = new THREE.Geometry()),
    (pMaterial = new THREE.PointsMaterial({
      /* color: 0xFFFFFF, */
      size: 1, //tamaño de las particulas
      map: THREE.ImageUtils.loadTexture('particula2.png'), //cargamos la imagen de nuestra particula
      blending: THREE.AdditiveBlending,
      transparent: true,
    }))

  // now create the individual particles
  for (var p = 0; p < particleCount; p++) {
    // create a particle with random
    // posicion de las pariculas random para que aparezcan en lugares diferentes
    var pX = getRandomArbitrary(target.x - 3, target.x + 3),
      pY = getRandomArbitrary(target.y - 3, target.y + 3),
      pZ = getRandomArbitrary(target.z - 3, target.z + 3),
      particle = new THREE.Vector3(pX, pY, pZ)

    // create a velocity vector
    particle.velocity = new THREE.Vector3(0, -Math.random(), 0)

    // add it to the geometry
    particles.vertices.push(particle)
  }

  // create the particle system
  particleSystem = new THREE.Points(particles, pMaterial)
  particleSystem.sortParticles = true

  // add it to the scene
  scene.add(particleSystem)

  /////////////////////////////////////////////////////
}

// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

////////////////////////////////////////////////////////////////////////

// Esta trae las puntuaciones del firebase
function traerPuntuacion() {
  var puntuaciones = []
  const dbRefPlayers = firebase.database().ref('Puntuaciones')
  dbRefPlayers.orderByValue().on('child_added', function (snapshot) {
    var prop = {
      nombre: snapshot.val().nombre,
      puntuacion: snapshot.val().PuntuacionEquipo,
    }
    puntuaciones.push(prop)
  })
  //////////////////////////////////////////////////////////////
}
