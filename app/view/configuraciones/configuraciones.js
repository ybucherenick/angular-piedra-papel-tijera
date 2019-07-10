"use strict";

(function () {
    app.controller("ConfiguracionesCtrl", [
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
            $scope.movimientos = {};
            $scope.nuevoMovimientos = {};
            $scope.mataMovimientos = {};
            $scope.validacionS = false;
            $scope.validacionE = false;

            $scope.nuevoAux = {};
            $scope.nuevoAux.nuevo = 'input';
            $scope.nuevoAux.mata = 'input';

            function loadData() {
                $PptClient.getMovimientoTodos().then(function (_result) {
                    $scope.movimientos = _result.data.movimiento;
                    $scope.nuevoMovimientos = _result.data.movimiento;
                    $scope.mataMovimientos = _result.data.movimiento;
                }, function (_error) {
                    $log.error(_error);
                })


            }

            $scope.mataA = function (_mov) {
                $scope.mov = {};
                $scope.mov.nombre = _mov.nombre;
                $scope.mov.mata = [];

                _mov.mata.forEach(function (item) {
                    $scope.mov.mata.push({
                        nombre: item.nombre
                    });
                });
                $('#modalMata').modal({
                    show: true
                });
            }

            $scope.inicio = function () {
                window.location.href = "#/";
            }

            $scope.eliminar = function(_item){
                $scope.mov.mata.forEach(function(item){
                    if (item.nombre == _item){
                        var index = $scope.mov.mata.indexOf(item);
                        $scope.mov.mata.splice(index, 1);
                    }
                })
                $PptClient.putMovimiento($scope.mov).then(function(_result){
                    console.log('Se actualizo con exito');
                    loadData();
                }, function(_error){
                    console.log(_error);
                })
            }

            $scope.nuevoMov = function(){
                $('#modalMovimiento').modal({
                    show: true
                });
                $scope.nuevoAux_input = null;
                $scope.mataAux_select = null;
            }

            $scope.guardar = function(){
                var nuevo = {};
                nuevo.mata = [];

                debugger;
                if ($scope.nuevoAux.nuevo == 'input' && $scope.nuevoAux.mata == 'input'){
                    nuevo.nombre = $scope.nuevoAux_input;
                    nuevo.mata.push({ nombre: $scope.mataAux_input});
                    save(nuevo);
                } else if ($scope.nuevoAux.nuevo == 'input' && $scope.nuevoAux.mata == 'select'){
                    nuevo.nombre = $scope.nuevoAux_input;
                    nuevo.mata.push({ nombre: $scope.mataAux_select});
                    save(nuevo);
                } else if ($scope.nuevoAux.nuevo == 'select' && $scope.nuevoAux.mata == 'input'){
                    nuevo.nombre = $scope.nuevoAux_select;
                    $scope.movimientos.forEach(function (item) {
                        if (item.nombre == $scope.nuevoAux_select){
                            nuevo.mata = item.mata;
                            nuevo.mata.push({ nombre: $scope.mataAux_input});
                        }
                    });
                    update(nuevo);
                } else if ($scope.nuevoAux.nuevo == 'select' && $scope.nuevoAux.mata == 'select'){
                    // obtengo el objeto completo al que mata, para ver si este no mata al otro
                    var bandera = true;
                    $scope.movimientos.forEach(function (item) {
                        if (item.nombre == $scope.mataAux_select){
                            item.mata.forEach(function(itemM){
                                if (itemM.nombre == $scope.nuevoAux_select){
                                    bandera = false;
                                }
                            })
                        }
                    });
                    // obtengo el objeto completo y le hago push al array de mata
                    if (bandera){
                        nuevo.nombre = $scope.nuevoAux_select;
                        $scope.movimientos.forEach(function (item) {
                            if (item.nombre == $scope.nuevoAux_select){
                                nuevo.mata = item.mata;
                                nuevo.mata.push({ nombre: $scope.mataAux_select});
                            }
                        });
                        //llamo a la funcion que modifica
                        update(nuevo);
                    } else {
                        console.log('No se puede guardar este movimiento porque el movimiento ' + $scope.mataAux_select + ' ya mata ' + $scope.nuevoAux_select);
                        $('#modalMovimiento').modal('hide');
                        $scope.validacionE = true;
                    }
                }

            }

            function save(_obj){
                $PptClient.postMovimiento(_obj).then(function(_result){
                    console.log('Se actualizo con exito');
                    loadData();
                    $('#modalMovimiento').modal('hide');
                    $scope.validacionS = true;
                }, function(_error){
                    console.log(_error);
                    $('#modalMovimiento').modal('hide');
                    $scope.validacionE = true;
                })
            }

            function update(_obj){
                $PptClient.putMovimiento(_obj).then(function(_result){
                    console.log('Se actualizo con exito');
                    loadData();
                    $('#modalMovimiento').modal('hide');
                    $scope.validacionS = true;
                }, function(_error){
                    console.log(_error);
                    $('#modalMovimiento').modal('hide');
                    $scope.validacionE = true;
                })
            }

            $scope.cerrar = function (_index){
                if (_index == 'S'){
                    $scope.validacionS = false;
                } else {
                    $scope.validacionE = false;
                }
            }




        }
    ]);
}.call());