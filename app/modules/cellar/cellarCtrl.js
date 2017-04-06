( () => {
	app.controller('CellarCtrl', cellarCtrl)
	cellarCtrl.$inject = ['$scope', '$state', 'cellarData', 'Cellar', 'CellarServices']

	function cellarCtrl($scope, $state, cellarData, Cellar, CellarServices){
		// console.log(cellarData)
		// console.log(JSON.parse(localStorage.getItem('userData')).token)
		
		if(JSON.parse(localStorage.getItem('userData')) == null){
			$state.go('login')	
		}else{
			Cellar.setData(cellarData.data)
			$scope.cellar = Cellar.data
			
		  $scope.totalItems = 64
		  $scope.currentPage = 4

		  $scope.setPage = function (pageNo) {
		    $scope.currentPage = pageNo
		    console.log($scope.currentPage)
		    CellarServices.getUsers($scope.currentPage).then( response => {
		    	
		    	$scope.cellar = response.data
		    	Cellar.setData($scope.cellar)
		    	console.log(Cellar)
		    })
		    
		  }

		  $scope.maxSize = 5
		  $scope.bigTotalItems = 35
		  // $scope.bigCurrentPage = 1	

		}
	}
})();