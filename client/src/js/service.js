var service = angular.module('service', [])
    .service('WebService', function ($http) {

        this.addSelectedId = function () {
            $http({
                url: "http://localhost:8000/api/authors",
                method: "GET",
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {
                console.log(response.data)
            }, function error(response) {
                console.log(response)
            });
        }
    });
