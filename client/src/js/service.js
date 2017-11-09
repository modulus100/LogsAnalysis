var service = angular.module('service', [])
    .service('WebService', function ($http) {
        this.getArticles = function () {
            return $http({
                url: "http://localhost:8000/api/articles",
                method: "GET",
                headers: {'Content-Type': 'application/json'}
            });
        };

        this.getAuthors = function () {
            return $http({
                url: "http://localhost:8000/api/authors",
                method: "GET",
                headers: {'Content-Type': 'application/json'}
            });
        };

        this.getDates = function () {
            return $http({
                url: "http://localhost:8000/api/dates",
                method: "GET",
                headers: {'Content-Type': 'application/json'}
            });
        };
    });
