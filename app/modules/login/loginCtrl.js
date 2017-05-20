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