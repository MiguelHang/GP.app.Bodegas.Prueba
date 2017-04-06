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