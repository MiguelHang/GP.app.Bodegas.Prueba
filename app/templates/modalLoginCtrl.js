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

    $scope.recuperarDatos = function() {
      $uibModalInstance.dismiss('cancel');
      $state.go("home.recuperarDatos");
    };

  }
})();