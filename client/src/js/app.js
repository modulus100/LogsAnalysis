var app = angular.module('dialogDemo3', ['ngMaterial', 'service'])
    .config(function ($mdIconProvider) {
        $mdIconProvider.icon('md-toggle-arrow', 'img/icons/toggle-arrow.svg', 48);
    })
    .controller('AppCtrl', function ($scope, $mdDialog, $interval, $http, WebService) {
        $scope.tasks = getTasks();

        $scope.showArticles = function (ev) {
            WebService.getArticles().then(function (response) {
                $scope.articlesResponse = response;
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'articles.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                }).then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
                console.log(response);
            }, function error(response) {
                console.log(response)
            })
        };

        $scope.showAuthors = function (ev) {
            WebService.getAuthors().then(function (response) {
                $scope.authorsResponse = response;
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'articles.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                }).then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
                console.log(response);
            }, function error(response) {
                console.log(response)
            })
        };

        $scope.showDates = function (ev) {
            WebService.getDates().then(function (response) {
                $scope.datesResponse = response;
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'articles.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                }).then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
                console.log(response);
            }, function error(response) {
                console.log(response)
            })
        };

        function DialogController($scope, $mdDialog) {
            $scope.tasks = getTasks();
            $scope.authors = getAuthorsResponse();
            $scope.articles = getArticlesResponse();
            $scope.dates = getDatesResponse();

            $scope.cancel = function () {
                $mdDialog.cancel();
            };
        }

        function getTasks() {
            return [{
                question: 'Task 1: Show the most popular three articles of all time'
            }, {
                question: 'Task 2: Show the most popular article authors of all time'
            }, {
                question: 'Task 3: Show the days did more than 1% of requests lead to errors'
            }];
        }

        function getAuthorsResponse() {
            return $scope.authorsResponse;
        }

        function getArticlesResponse() {
            return $scope.articlesResponse;
        }

        function getDatesResponse() {
            return $scope.datesResponse;
        }
    });


