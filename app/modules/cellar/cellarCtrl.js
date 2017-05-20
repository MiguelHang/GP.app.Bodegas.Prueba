( () => {
	app.controller('CellarCtrl', cellarCtrl)
	cellarCtrl.$inject = ['$scope', '$state', 'cellarData', 'Cellar', 'CellarServices', 'UserServices', 'User']

	function cellarCtrl($scope, $state, cellarData, Cellar, CellarServices, UserServices, User){
		// console.log(cellarData)
		// console.log(JSON.parse(localStorage.getItem('userData')).token)
		
		if(JSON.parse(localStorage.getItem('userData')) == null){
			$state.go('login')	
		}else{
			  
			  if(Cellar.data == ''){
			  	Cellar.setData(cellarData.data)
			  }
			  $scope.cellar = Cellar.data
			
			  $scope.totalItems = 64
			  $scope.currentPage = 4
	  		  $scope.maxSize = 5
			  $scope.bigTotalItems = 35
			  $scope.bigCurrentPage = 1	

			  $scope.setPage =  (pageNo) => {
			    $scope.currentPage = pageNo
			    console.log($scope.currentPage)
			    CellarServices.getUsers($scope.currentPage).then( response => {
			    	
			    	$scope.cellar = response.data
			    	Cellar.setData($scope.cellar)
			    	console.log(Cellar)
			    })
			    
			  }
			  $scope.editUser = (user) => {
			  	User.setData(user)
			  	$state.go('home.user')
			  }

		}
	}
})();