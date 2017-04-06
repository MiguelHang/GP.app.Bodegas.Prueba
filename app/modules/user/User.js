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
	}
})();