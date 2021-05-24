// function reloadpage() {
//   document.location.href = 'pantallaJuegoNivel1.html'
// }

function createPlayerConst(nombre1, nombre2) {
  //   var nombre = $('#txtName').val()
  //   userName = nombre
  var jugador1 = nombre1
  var jugador2 = nombre2
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

function traerPuntuacion() {
  var puntuaciones = []
  const dbRefPlayers = firebase.database().ref('Puntuaciones')
  dbRefPlayers.orderByValue().on('child_added', function (snapshot) {
    var prop = {
      nombre: snapshot.val().userName,
      puntuacion: snapshot.val().PuntuacionEquipo,
    }
    puntuaciones.push(prop)
  })
  for (var i = 0; i < puntuaciones.length; i++) {
    $('.Tablapuntuaciones').append(
      ' <h5 style="margin-top: 10px">' +
        puntuaciones[i].nombre +
        ' ...................' +
        puntuaciones[i].puntuacion +
        ' pts</h5>'
    )
  }
}
