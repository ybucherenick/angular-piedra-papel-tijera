(function() {
    this.app.config(function($routeProvider, $locationProvider, $httpProvider) {
        $locationProvider.hashPrefix("");
        $httpProvider.useApplyAsync(true);


        $routeProvider

            .when("/", {
                templateUrl: "view/Principal/principal.html",
                    controller: "PrincipalCtrl"
            })

        .otherwise({
            redirect: "/error"
        });
    });
}.call(this));