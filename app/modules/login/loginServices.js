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