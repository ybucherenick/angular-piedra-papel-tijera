"use strict";

(function () {
    app.controller("HistoricoCtrl", [
        "$scope",
        "$q",
        "$log",
        "$PptClient",
        function (
            $scope,
            $q,
            $log,
            $PptClient
        ) {

            loadData();
            $scope.juego = {};
            $scope.rounds = {};

            function loadData() {
                console.log("Entro al Historico")
                $PptClient.getJuego().then(function (_result) {
                    $scope.juego = _result.data.juego;
                }, function (_error) {
                    $log.error(_error);
                })
            }

            $scope.verDetalle = function (_rounds) {
                $scope.rounds = _rounds;
                $('#modal').modal({ show: true });
            }


            $scope.inicio = function(){
                window.location.href = "#/";
            }



        }
    ]);
}.call());