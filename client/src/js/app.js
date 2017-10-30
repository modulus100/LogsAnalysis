var app = angular.module('dialogDemo3', ['ngMaterial', 'service'])
    .config(function ($mdIconProvider) {
        $mdIconProvider.icon('md-toggle-arrow', 'img/icons/toggle-arrow.svg', 48);
    })
    .controller('AppCtrl', function ($scope, $mdDialog, $interval, $http, WebService) {
        $scope.imagePath = 'img/washedout.png';

        $scope.showDialog = function (ev) {
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

            WebService.addSelectedId(200);
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

        $scope.messages = [{
            what: 'Task 1: Show the most popular three articles of all time'
        }, {
            what: 'Task 2: Show the most popular article authors of all time'
        }, {
            what: 'Task 3: Show the days did more than 1% of requests lead to errors'
        }];
    });


