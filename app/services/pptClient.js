'use strict';

(function() {
    this.app.factory('$PptClient', ['$http', '$q',
        function($http, $q) {

            const API = 'http://localhost:8080';
            return {
                /** JUEGOS */
                getJuego: function() {
                    let defer = $q.defer();
                    $http({
                        url: `${API}/juego`,
                        method: 'GET',
                        cache: false
                    }).then(function(_response) {
                        defer.resolve(_response);
                    }, function(_error) {
                        defer.reject(_error);
                    });
                    return defer.promise;
                },

                postJuego: function(params) {
                    debugger;
                    let defer = $q.defer();
                    $http({
                        url: `${API}/juego`,
                        method: 'POST',
                        cache: false,
                        data: params
                    }).then(function(_response) {
                        defer.resolve(_response);
                    }, function(_error) {
                        defer.reject(_error);
                    });
                    return defer.promise;
                },

                /** MOVIMIENTOS */
                getmMovimiento: function(params) {
                    let defer = $q.defer();
                    $http({
                        url: `${API}/movimiento`,
                        method: 'GET',
                        cache: false,
                        params: params
                    }).then(function(_response) {
                        defer.resolve(_response);
                    }, function(_error) {
                        defer.reject(_error);
                    });
                    return defer.promise;
                },

                getMovimientoTodos: function() {
                    let defer = $q.defer();
                    $http({
                        url: `${API}/movimiento/todos`,
                        method: 'GET',
                        cache: false
                    }).then(function(_response) {
                        defer.resolve(_response);
                    }, function(_error) {
                        defer.reject(_error);
                    });
                    return defer.promise;
                },

                postMovimiento: function(params) {
                    let defer = $q.defer();
                    $http({
                        url: `${API}/movimiento`,
                        method: 'POST',
                        cache: false,
                        params: params
                    }).then(function(_response) {
                        defer.resolve(_response);
                    }, function(_error) {
                        defer.reject(_error);
                    });
                    return defer.promise;
                },

                putMovimiento: function(params) {
                    let defer = $q.defer();
                    $http({
                        url: `${API}/movimiento`,
                        method: 'PUT',
                        cache: false,
                        params: params
                    }).then(function(_response) {
                        defer.resolve(_response);
                    }, function(_error) {
                        defer.reject(_error);
                    });
                    return defer.promise;
                }

            };
        }
    ]);
}).call(this);