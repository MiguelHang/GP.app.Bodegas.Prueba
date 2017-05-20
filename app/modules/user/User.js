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