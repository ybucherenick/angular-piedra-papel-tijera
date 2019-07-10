"use strict";

(function () {
  app.controller("NuevoJuegoCtrl", [
    "$scope",
    "$q",
    "$log",
    "$rootScope",
    function (
      $scope,
      $q,
      $log,
      $rootScope
    ) {
        $scope.validacion = false;
        //$rootScope.juego = {};
        loadData();

        function loadData() {
            $scope.juego = {};
            $scope.juego.jugador1 = '';
            $scope.juego.jugador2 = '';
            $scope.juego.ganador = null;
            $scope.juego.rounds = [];
            $scope.contador = {};
            $scope.contador.jugador1 = 0;
            $scope.contador.jugador2 = 0;
        }

        $scope.iniciarJuego = function (){
            if (esValido($scope.juego.jugador1) && esValido($scope.juego.jugador2)){
                //$rootScope.juego = $scope.juego;
                window.localStorage.setItem('juego',JSON.stringify($scope.juego));
                window.localStorage.setItem('contador',JSON.stringify($scope.contador));
                window.location.href = "#/nuevoJuego/ronda";
            } else {
                $scope.validacion = true;
            }
        };

        $scope.cerrar = function (){
            $scope.validacion = false;
        }

        function esValido (_text){
            var retorno = false;
            if (_text != null && _text != ''){
                retorno = true;
            }
            return retorno;
        }

        $scope.inicio = function(){
            window.location.href = "#/";
        }


    }
  ]);
}.call());