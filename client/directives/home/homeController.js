var mainApp = angular.module('mainApp');

mainApp.controller('homeController', function ($scope, $http) {
	$scope.message = "$scope.message : from homeController";

	$scope.formData = {};

	// busca lista de home
	$http.get('api/find').then(
		function (response) {
			$scope.listHome = response.data;
		}, function (error) {
			console.log('Error: ' + error.data);
		});
		
		$scope.createHome = function () {
			$http.post('api/create', $scope.formData).then(
				function (response) {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.listHome = response.data;
				console.log(response);
			}, function (error) {
				console.log('Error: ' + error.data);
			});
	}

	$scope.deleteHome = function (id) {
		$http.delete('api/delete/' + id).then(
			function (response) {
				$scope.listHome = response.data;
			}, function (error) {
				console.log('Error: ' + error.data);
			});

	}
});