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
			url:'',
			templateUrl: 'app/modules/home/home.html',
			controller: 'HomeCtrl',
			resolve: {
				cellarId:  () => { return 65335} 
			}
		})
		.state('home.cellar', {
			url: '/cellar',
			templateUrl: 'app/modules/cellar/cellar.html',
			controller: 'CellarCtrl',
			resolve: {
				cellarData:['CellarServices', (CellarServices) => {
					let id = localStorage.getItem('cellarId')
					console.log(id)
					// return CellarServices.getCellar(JSON.parse(id))
					return 
				}]
			}
		})

	$locationProvider.html5Mode(true)

}]);