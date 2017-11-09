var app = angular.module('dialogDemo3', ['ngMaterial', 'service'])
    .config(function ($mdIconProvider) {
        $mdIconProvider.icon('md-toggle-arrow', 'img/icons/toggle-arrow.svg', 48);
    })
    .controller('AppCtrl', function ($scope, $mdDialog, $interval, $http, WebService) {
        $scope.imagePath = 'img/washedout.png';

        $scope.showArticles = function (ev) {
            WebService.getArticles().then(function (response) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'dialog1.tmpl.html',
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
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'dialog1.tmpl.html',
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
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'dialog1.tmpl.html',
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
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }

        $scope.tasks = [{
            question: 'Task 1: Show the most popular three articles of all time'
        }, {
            question: 'Task 2: Show the most popular article authors of all time'
        }, {
            question: 'Task 3: Show the days did more than 1% of requests lead to errors'
        }];
    });


