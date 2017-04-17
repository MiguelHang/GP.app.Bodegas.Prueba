( () => {
	app.controller('UserCtrl', userCtrl)
	userCtrl.$inject = ['$scope', '$state', 'User', 'UserServices', '$filter', 'Cellar']
	function userCtrl($scope, $state, User, UserServices, $filter, Cellar){
		if(JSON.parse(localStorage.getItem('userData')) == null){
			$state.go('login')	
		}else{
			
		$scope.user = User
		$scope.showUrl = false
		$scope.nombre = $scope.user.first_name
		$scope.apellido = $scope.user.last_name
		$scope.foto = $scope.user.avatar
		
		$scope.buscar = (user) => {

			 for (let i of Cellar.data){

			 	if(i.id === user.id){
			 		i.first_name = $scope.nombre
			 		i.last_name = $scope.apellido
			 		i.avatar = $scope.user.avatar
			 	}
			 }
		}
		$scope.guardar = (user) => {
			UserServices.putUser(user).then( response => {
				if(response.updatedAt){
			       swal({
			       	title: 'Cambios guardados correctamente',
			       	text: 'Ultima modificación ' + $filter('date')(response.updatedAt, 'short') , 
			       	type:'success'},() => {

			       	$scope.buscar(user)
			       	$state.go('home.cellar')
			       })
				}else{
					swal('Error al guardar los cambios', 'error')
				}
			})
		}
		$scope.cancelar = () => {
			$state.go('home.cellar')
		}
	}


	}
})();