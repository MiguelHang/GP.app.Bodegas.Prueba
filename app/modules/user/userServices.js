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