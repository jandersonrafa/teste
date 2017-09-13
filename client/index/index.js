
var mainApp = angular.module('mainApp', ['ui.router']);
mainApp.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/home');

	$stateProvider.state('home', {
		url: '/home',
		template: '<home></home>',
	})

});
