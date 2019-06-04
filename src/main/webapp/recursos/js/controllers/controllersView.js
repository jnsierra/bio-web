app.controller('homeController', ['$scope', 'getFilesFasta',function ($scope, getFilesFasta) {
		$scope.listFiles = getFilesFasta.getAllData();
		console.log('Entro...');
		if($scope.listFiles.length > 0){
			$scope.checked = false; 
		}else{
			$scope.checked = true;
		}
		$scope.princ = new Object();
		$scope.secun = new Object();
		$scope.matriz = [];
		$scope.cargarArchivo = function(){
			var uploadFile = getFilesFasta.uploadFile();
			alert('Archivo subido correctamente');
		};
		$scope.seleccionarPrincipal = function(id){
			$scope.princ  =  getFilesFasta.byId(id);
			console.log($scope.princ);
		};
		$scope.seleccionarSecundario = function(id){
			$scope.secun =  getFilesFasta.byId(id);
			console.log($scope.secun);
		};
		$scope.generarSecuencia = function(){
			if($scope.princ.id == undefined || $scope.secun.id == undefined ){
				alert('Por favor seleccione las secuencias');
			}else{
				var idSecuencia = getFilesFasta.getSecuencia($scope.princ.id,$scope.secun.id );
				var matrizAux = getFilesFasta.getSecuenciaById(idSecuencia);
				//Convierto las secuencias en vector
				
				var matrizDosAux = JSON.parse(matrizAux.jsonMatriz);
				
				matrizDosAux = modificarMatrizSecPrinc(matrizAux.secuenciaPrinc,matrizDosAux);
				matrizDosAux = modificarMatrizSecSecundaria(matrizAux.secuenciaSec,matrizDosAux);

				var secDos = createObject(matrizAux.secuenciaSec);
				
				$scope.matriz = matrizDosAux;
				console.log($scope.matriz);
			}
		};
		
}]);

function modificarMatrizSecPrinc(secPrincVec, matriz){
	var secuenciaPrinc = createObject(secPrincVec)
	matriz.unshift(secuenciaPrinc);
	return matriz;
}

function modificarMatrizSecSecundaria(secSecundariaVec, matriz){
	var secuenciaSecund = createObject(secSecundariaVec);
	
	var primera = new Object();
	primera.movimiento = '-2';
	primera.valor = 'X';

	matriz[0].unshift(primera);
	for(var i = 1 ; i < matriz.length ; i++){
		matriz[i].unshift(secuenciaSecund[i-1]);
	}
	return matriz;
}

function createObject(secuencia){
	var vectorObjeto = [];
	var vector = Array.from(secuencia);
	for(var i = 0; i < vector.length; i++){
		var aux = new Object();
		aux.movimiento = '-1';
		aux.valor = vector[i];
		vectorObjeto.push(aux);
	}
	return vectorObjeto;
}