( () => {
	app.service('CellarServices', cellarServices)

	cellarServices.$inject = ['$http', 'settings']

	function cellarServices($http, settings) {
		let url = settings.baseService + 'api/bodega/'

		this.getCellar = (idCellar) => {
			let urlGet = url + 'contenido/temp/' + idCellar
			return $http.get(urlGet).then(response => {
				return response.data
			})
		}
	}
})();