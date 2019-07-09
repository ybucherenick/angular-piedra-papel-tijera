(function() {
    this.app.config(function($routeProvider, $locationProvider, $httpProvider) {
        $locationProvider.hashPrefix("");
        $httpProvider.useApplyAsync(true);


        $routeProvider

            .when("/", {
                templateUrl: "view/Principal/principal.html",
                    controller: "PrincipalCtrl"
            })

            .when("/nuevoJuego", {
                templateUrl: "view/nuevoJuego/nuevoJuego.html",
                    controller: "NuevoJuegoCtrl"
            })

            .when("/nuevoJuego/ronda", {
                templateUrl: "view/ronda/ronda.html",
                    controller: "RondaCtrl"
            })

            .when("/historico", {
                templateUrl: "view/historico/historico.html",
                    controller: "HistoricoCtrl"
            })

            .when("/configuraciones", {
                templateUrl: "view/configuraciones/configuraciones.html",
                    controller: "ConfiguracionesCtrl"
            })

        .otherwise({
            redirect: "/error"
        });
    });
}.call(this));