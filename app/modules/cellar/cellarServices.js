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