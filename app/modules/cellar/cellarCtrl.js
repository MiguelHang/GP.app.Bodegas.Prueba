( () => {
	app.controller('CellarCtrl', cellarCtrl)
	cellarCtrl.$inject = ['$scope', '$state', 'cellarData']

	function cellarCtrl($scope, $state, cellarData){
		console.log(cellarData)
		console.log(JSON.parse(localStorage.getItem('userData')).token)
		
		if(JSON.parse(localStorage.getItem('userData')).token){
			// $state.go('login')	
		}else{
			
		}
	}
})()