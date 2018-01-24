var app = angular.module("app", ["ui.router"]);

// main  controller
app.controller("mainCon", ["$scope", "$http", function($scope, $http) {
    $scope.msg = "Hello";
    $scope.ols = ["吃", "喝", "玩", "乐"];
    $http({
        url: "http://localhost:3006/data"
    }).then(function(result) {
        $scope.data = result.data;
    }, function(error) {
        throw error;
    })
}])

app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("main", ({
            url: "/main",
            templateUrl: "App/html/main.html",
            controller: "mainCon"
        }))
        .state("detail", ({
            url: "/detail/:id",
            templateUrl: "App/html/detail.html",
            controller: "detailCon"
        }))
    $urlRouterProvider.otherwise("main")
}])



//detail controller
app.controller("detailCon", ["$scope", "$http", "$stateParams", function($scope, $http, $stateParams) {
    $scope.par = $stateParams.id;
    $http({
            url: "http://localhost:3006/" + $scope.par,
        })
        .then(function(result) {
            $scope.datas = result.data;
        }, function(error) {
            throw error;
        })
}])