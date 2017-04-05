( () => {
	app.controller('HomeCtrl', homeCtrl)

	homeCtrl.$inject = ['$scope','$state', 'cellarId']

	function homeCtrl($scope, $state, cellarId) {

		localStorage.setItem('cellarId', JSON.stringify(cellarId))

		// $state.go('home.cellar')
	}
})();