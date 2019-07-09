"use strict";

(function () {
    app.controller("RondaCtrl", [
        "$scope",
        "$q",
        "$log",
        "$rootScope",
        "$PptClient",
        function (
            $scope,
            $q,
            $log,
            $rootScope,
            $PptClient
        ) {
            $scope.validacion = false;
            $scope.rondaActual = null;
            $scope.listMovimiento1 = {};
            $scope.listMovimiento2 = {};
            $scope.jugadas = {};
            $scope.bloquearJ1 = false;
            $scope.bloquearJ2 = true;
            loadData();


            function loadData() {
                console.log('RONDA');
                $scope.juego = JSON.parse(window.localStorage.getItem('juego'));
                $scope.contador = JSON.parse(window.localStorage.getItem('contador'));
                
                $PptClient.getmMovimientoTodos().then(function(_result){
                    $scope.listMovimiento1 = _result.data.movimiento;
                    $scope.listMovimiento2 = _result.data.movimiento;
                }, function(_error){
                    $log.error(_error);
                });

                iniciarRonda($scope.juego);
            }

            function iniciarRonda(juego) {
                if (juego.rounds.length == 0) {
                    // Es la primera ronda
                    juego.rounds.push({
                        numero: 1,
                        movimiento1: null,
                        movimiento2: null,
                        ganador: null
                    });
                    $scope.rondaActual = juego.rounds.length;
                } else {
                    // las demas rondas
                    var bandera = false;
                    $scope.juego.rounds.forEach(function(item) {
                        if (item.ganador != null){
                            bandera = true;
                        }
                        if (item.ganador == null && item.movimiento1 == null){
                            $scope.bloquearJ1 = false;
                            $scope.bloquearJ2 = true;
                        } else if (item.ganador == null && item.movimiento2 == null){
                            $scope.bloquearJ1 = true;
                            $scope.bloquearJ2 = false;
                        }
                    });

                    if (bandera){
                        juego.rounds.push({
                            numero: juego.rounds.length + 1,
                            movimiento1: null,
                            movimiento2: null,
                            ganador: null
                        });

                        $scope.bloquearJ1 = false;
                        $scope.bloquearJ2 = true;
                        $scope.rondaActual = juego.rounds.length;
                    }
                }
            }


            $scope.jugada = function(_jugador){
                if (_jugador == 1 && $scope.jugadas.jugador1 != undefined){
                    $scope.juego.rounds.forEach(function(item) {
                        if (item.ganador == null && item.movimiento1 == null){
                            item.movimiento1 = $scope.jugadas.jugador1;
                        }
                    });
                    window.localStorage.setItem('juego',JSON.stringify($scope.juego));
                    $scope.jugadas.jugador1 = null;
                    $scope.bloquearJ1 = true;
                    $scope.bloquearJ2 = false;
                } else if (_jugador == 2 && $scope.jugadas.jugador2 != undefined){
                    $scope.juego.rounds.forEach(function(item) {
                        if (item.ganador == null && item.movimiento2 == null){
                            item.movimiento2 = $scope.jugadas.jugador2;
                        }
                    });
                    
                    window.localStorage.setItem('juego',JSON.stringify($scope.juego));
                    $scope.jugadas.jugador2 = null;
                    validarGanadorPartida();
                }
            }

            function validarGanadorPartida(){
                var bandera = true;
                $scope.juego.rounds.forEach(function(item) {
                    if (item.ganador == null){

                        $scope.listMovimiento1.forEach(function(mov){
                            // Verifico si el Jugador 1 mata al Jugador 2
                            if (item.movimiento1 == mov.nombre){
                                mov.mata.forEach(function(mata){
                                    if (item.movimiento2 == mata.nombre){
                                        item.ganador = $scope.juego.jugador1;
                                        $scope.contador.jugador1 = $scope.contador.jugador1 + 1;
                                        bandera = false;
                                    }
                                })
                            } else if (item.movimiento2 == mov.nombre){
                                mov.mata.forEach(function(mata){
                                    if (item.movimiento1 == mata.nombre){
                                        item.ganador = $scope.juego.jugador2;
                                        $scope.contador.jugador2 = $scope.contador.jugador2 + 1;
                                        bandera = false;
                                    }
                                })
                            }
                        })

                        if (bandera) {
                            item.ganador = 'Sin Ganador';
                        }

                        window.localStorage.setItem('juego',JSON.stringify($scope.juego));
                        window.localStorage.setItem('contador',JSON.stringify($scope.contador));
                        
                        if (validarGanadorJuego()){
                            // hay un ganador del juego
                            $PptClient.postJuego($scope.juego).then(function(_result){
                                $('#modal').modal({ show: true });
                                console.log('Termino el juego: ' + $scope.juego.ganador);
                            }, function(_error){
                                $log.error(_error);
                            });
                        } else {
                            // Todavia no hay ganador del juego
                            iniciarRonda($scope.juego);
                        }
                        
                    }
                });

            }

            function validarGanadorJuego(){
                var retorno = false;

                if ($scope.contador.jugador1 == 3){
                    $scope.juego.ganador = $scope.juego.jugador1;
                    window.localStorage.setItem('juego',JSON.stringify($scope.juego));
                    retorno = true;
                } else if ($scope.contador.jugador2 == 3){
                    $scope.juego.ganador = $scope.juego.jugador2;
                    window.localStorage.setItem('juego',JSON.stringify($scope.juego));
                    retorno = true;
                }

                return retorno;
            }

            $scope.ir = function(_index) {
                $('#modal').modal("hide");
                switch (_index) {
                    case "inicio":
                        window.location.href = "#/";
                        break;
                    case "jugar":
                        window.location.href = "#/nuevoJuego";
                        break;
                }
            }


        }
    ]);
}.call());