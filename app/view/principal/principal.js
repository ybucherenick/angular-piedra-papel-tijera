"use strict";

(function () {
  app.controller("PrincipalCtrl", [
    "$scope",
    "$q",
    "$log",
    "$NodoClient",
    function (
      $scope,
      $q,
      $log,
      $NodoClient
    ) {
        
      loadData();

      function loadData() {
        console.log("Entro a la P. Principal")
      }

   


    }
  ]);
}.call());