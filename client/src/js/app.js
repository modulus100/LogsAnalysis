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
                    controller: ArticlesController,
                    templateUrl: 'articles.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                });
            }, function error(response) {
                console.log(response)
            })
        };

        $scope.showAuthors = function (ev) {
            WebService.getAuthors().then(function (response) {
                $scope.authorsResponse = response;
                $mdDialog.show({
                    controller: AuthorsController,
                    templateUrl: 'authors.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                });
            }, function error(response) {
                console.log(response)
            })
        };

        $scope.showDates = function (ev) {
            WebService.getDates().then(function (response) {
                $scope.datesResponse = response;
                $mdDialog.show({
                    controller: DatesController,
                    templateUrl: 'dates.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                });
            }, function error(response) {
                console.log(response)
            })
        };

        function ArticlesController($scope, $mdDialog) {
            var task = getTasks()[0].question;

            $scope.task = 'The' + task.substring(16, task.length);
            $scope.articles = getArticlesResponse();

            $scope.cancel = function () {
                $mdDialog.cancel();
            };
        }

        function AuthorsController($scope, $mdDialog) {
            var task = getTasks()[1].question;

            $scope.task = 'The' + task.substring(16, task.length);
            $scope.authors = getAuthorsResponse();

            $scope.cancel = function () {
                $mdDialog.cancel();
            };
        }

        function DatesController($scope, $mdDialog) {
            var task = getTasks()[2].question;

            $scope.task = 'The' + task.substring(16, task.length);
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


