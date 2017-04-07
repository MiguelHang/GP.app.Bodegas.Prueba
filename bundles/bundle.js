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
( () => {
	app.factory('Cellar', cellar)
	cellar.$inject = ['CellarServices']
	function cellar(CellarServices, User) {
		let cellar = {
			data: []
		}
		cellar.setData = data => {
			cellar.data = data
		}
		return cellar
	}
})();
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
( () => {
	app.service('CellarServices', cellarServices)

	cellarServices.$inject = ['$http', 'settings']

	function cellarServices($http, settings) {
		let url = settings.baseService + 'api/'

		this.getCellar = (idCellar) => {
			let urlGet = url + 'contenido/temp/' + idCellar
			return $http.get(urlGet).then(response => {
				return response.data
			})
		}

		this.getUsers = (page) => {
			let urlGetUs = url + 'users?page=' + page
			return $http.get(urlGetUs).then(response => {
				console.log(urlGetUs)
				console.log(response)
				return response.data
			})
		}
	}
})();
( () => {
	app.controller('HomeCtrl', homeCtrl)

	homeCtrl.$inject = ['$scope','$state', 'cellarId']

	function homeCtrl($scope, $state, cellarId) {

		localStorage.setItem('cellarId', JSON.stringify(cellarId))

		// $state.go('home.cellar')
		$scope.logOut = () => {
		  	localStorage.removeItem('userData')
		  	$state.go('login')
		 }
		 $scope.change = (params) => {
		 	$state.go('home.' + params)
		 }
	}
		
})();
( () => {
	app.controller('LoginCtrl', loginCtrl)

	loginCtrl.$inject = ['$scope', '$uibModal', '$state', '$timeout']

	function loginCtrl($scope, $uibModal, $state, $timeout) {
				$uibModal.open({
				animation: true,
				templateUrl: 'app/templates/modalLogin.html',
				size: 'lg',
				controller: 'ModalLoginCtrl'
			});

	}
})();
( () => {
	app.service('LoginServices', loginServices)

	loginServices.$inject = ['$http', 'settings']

	function loginServices($http, settings) {
		let url = settings.baseService + 'api'

		this.auth = (params) => {
			let urlLog = url + '/login'
			return $http.post(urlLog, params).then( response =>{
				console.log(response.data)
				let userStorage = {token: response.data.token, email: params.email} 
				localStorage.setItem('userData', JSON.stringify(userStorage))
				return true
			}, error => {
				console.log(error.status)
				if(error.status == '400'){
				return false
				}
			})
		}
	}
})();
( () => {
	app.factory('User',user)
	user.$inject = ['UserServices']
	function user(UserServices) {
		let user = {
			id: '',
			first_name: '',
			last_name: '',
			avatar: ''
		}

		user.setData = data => {
			user.id = data.id
			user.first_name = data.first_name
			user.last_name = data.last_name
			user.avatar = data.avatar
		}
		return user
	}
})();
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

			       	$state.buscar(user)
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
( () => {
	app.service('UserServices', userServices)
	userServices.$inject = ['$http', 'settings']
	
	function userServices($http, settings){
		let url = settings.baseService + 'api/'
		
		this.getUser = (id) => {
			let urlGet = url + 'users/' + id
			return $http.get(urlGet).then(response => {
				console.log(response.data)
				return response.data
			})
		}
		this.putUser = params => {
			let urlPut = url + 'users/' + params.id 
			return $http.put(urlPut).then(response => {
				console.log(response.data)
				return response.data
			})
		}
	}
})();
( () => {
  app.controller('ModalLoginCtrl', modalLogin);
  modalLogin.$inject = ['$scope', '$uibModalInstance', '$state', '$rootScope', '$window', 'LoginServices'];
  function modalLogin($scope, $uibModalInstance, $state, $rootScope, $window, LoginServices) {
    $scope.user = {

    };

    $scope.login = function() { 
      LoginServices.auth($scope.user).then( response => {

        if (response == false) {
          console.log('fallo')
          swal('Inicio de sesión incorrecto', 'error')
        }
        if (response == true) {
          swal({
            title: 'Inicio de sesión correcto', 
            text: '¡Bienvenido de nuevo ' + $scope.user.email + '!',
            type: 'success'
            }, () => {
              $uibModalInstance.close()
              $state.go('home.cellar')
            })
        }
      })

    };

    $scope.cerrarModal = function() {
      $uibModalInstance.dismiss('cancel');
    };

  }
})();