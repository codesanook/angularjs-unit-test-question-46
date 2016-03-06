var app = angular.module('game', ['ui.bootstrap']);

app.factory('Game', function ($q, $http) {

    var service = {};

    service.list = function () {
        var deferred = $q.defer();

        //real implementation to get game list HTTP request
        $http({
            method: 'GET',
            url: '/someUrl'
        }).then(function successCallback(response) {
            var gameList = response;
            deferred.resolve({games: gameList});
        }, function errorCallback(response) {
            deferred.reject(response);
        });

        return deferred.promise;
    };

    return service;
});


app.controller("GameListController", function ($scope, Game) {

    $scope.onLoad = false;
    $scope.games = [];

    $scope.loadGames = function () {
        console.log("loading game");
        Game.list().then(function (resp) {
            console.log("game list");
            console.log(resp);
            $scope.games = resp.games;
            $scope.onLoad = true;
        });
    };

    //$scope.loadGames();

});


describe('GameListController', function () {

    var $controller = null;
    var gameService = null;
    var gameListController = null;
    var scope = null;
    var $q = null;
    var $rootScope;
    beforeEach(function () {
        //load module
        angular.mock.module('game');

        //get controller service
        angular.mock.inject(function (_$controller_, Game, _$q_, _$rootScope_) {
            $controller = _$controller_;
            gameService = Game;
            $q = _$q_;
            $rootScope = _$rootScope_;
        });


        scope = {};
        gameListController = $controller('GameListController', {$scope: scope, Game: gameService});
    });


    it('should be defined', function () {
        expect(gameListController).toBeDefined();
    });


    it('Game service list return 2 games, scope.game.length return 2', function () {

        var deferred = $q.defer();
        spyOn(gameService, 'list').and.returnValue(deferred.promise);

        scope.loadGames();

        var games = ["Game A", "Game B"];
        deferred.resolve({games: games});
        $rootScope.$apply(); /**** need to called ****/

        expect(scope.games.length).toBe(games.length);
        expect(gameService.list).toHaveBeenCalledTimes(1);
        expect(scope.onLoad).toBe(true);
    });

});



