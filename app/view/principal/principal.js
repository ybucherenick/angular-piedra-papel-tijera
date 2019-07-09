"use strict";

(function () {
  app.controller("PrincipalCtrl", [
    "$scope",
    "$q",
    "$log",
    function (
      $scope,
      $q,
      $log
    ) {

      loadData();

      function loadData() {
        console.log("Entro a la P. Principal")
      }

      $scope.ir = function (_index) {
        switch (_index) {
          case "nuevo_juego":
            window.location.href = "#/nuevoJuego";
            break;
          case "historico":
            window.location.href = "#/historico";
            break;
          case "configuraciones":
            window.location.href = "#/configuraciones";
            break;
        }
      };



    }
  ]);
}.call());