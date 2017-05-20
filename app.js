'use strict';
let app = angular.module('appBodegas', ['ui.router', 'ui.bootstrap'])

app.constant('settings', {
	baseService: 'https://reqres.in/',
	clientId: 'authBodegas',
	useRefreshTokens: true
})

app.config(['$stateProvider','$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) => {

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'app/modules/login/login.html',
			controller: 'LoginCtrl'
		})
		.state('home', {
			url:'/',
			templateUrl: 'app/modules/home/home.html',
			controller: 'HomeCtrl',
			resolve: {
				cellarId:  () => { return 65335} 
			}
		})
		.state('home.cellar', {
			url: 'cellar',
			templateUrl: 'app/modules/cellar/cellar.html',
			controller: 'CellarCtrl',
			resolve: {
				cellarData:['CellarServices', (CellarServices) => {
					let page = 1
					return CellarServices.getUsers(page)
				}]
			}
		})
		.state('home.user', {
			url: 'user',
			templateUrl: 'app/modules/user/user.html',
			controller: 'UserCtrl'
		})

	$locationProvider.html5Mode(true)

}]);