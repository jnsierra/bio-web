app.controller('homeController', ['$scope', 'getFilesFasta',function ($scope, getFilesFasta) {
		$scope.listFiles = getFilesFasta.getAllData();
		
		$scope.principal = 'nicolas';
		$scope.princ = new Object();
		$scope.secun = new Object();
		$scope.cargarArchivo = function(){
			var uploadFile = getFilesFasta.uploadFile();
			alert('Archivo subido correctamente');
		};
		$scope.seleccionarPrincipal = function(id){
			$scope.principal  =  getFilesFasta.byId(id);
			document.getElementById("nombrePrimaria").innerHTML = $scope.principal.id; 
			console.log($scope.principal);
		};
		$scope.seleccionarSecundario = function(id){
			$scope.secun =  getFilesFasta.byId(id);
			$('#nombreSecundaria').html($scope.secun.id);
			console.log($scope.secun);
		};
}]);