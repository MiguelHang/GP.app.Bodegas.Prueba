( () => {
	app.controller('UserCtrl', userCtrl)
	userCtrl.$inject = ['$scope', '$state', 'User', 'UserServices', '$filter', 'Cellar']
	function userCtrl($scope, $state, User, UserServices, $filter, Cellar){
		console.log(User)
		$scope.user = User
		$scope.showUrl = false
		
		$scope.buscar = (user) => {

			 for (let i of Cellar.data){

			 	if(i.id === user.id){
			 		i.first_name = user.first_name
			 		i.last_name = user.last_name
			 		i.avatar = user.avatar
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
			
		}
	}
})();