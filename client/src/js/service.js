var service = angular.module('service', [])
    .service('WebService', function ($http) {

        this.addSelectedId = function (id) {
            if (id) {
                $http({
                    url: "http://localhost:8000/api",
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    data: {id: id}
                }).then(function (response) {
                    console.log(response.data)
                }, function error(response) {
                    console.log(response)
                });
            }
        }
    });
