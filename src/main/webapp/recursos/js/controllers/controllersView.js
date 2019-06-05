app.controller('homeController', ['$scope', 'getFilesFasta',function ($scope, getFilesFasta) {
		$scope.listFiles = getFilesFasta.getAllData();
		$scope.matrizBase = null;
		
		$scope.secUnoAlin = [];
		$scope.secDosAlin = [];
		
		$scope.puntaje = '';
		
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
				
				var matrizDosAux = JSON.parse(matrizAux.jsonMatriz);
				matrizDosAux = adicionoClasesMatriz(matrizDosAux);
				
				matrizDosAux = multiplosCinco(matrizDosAux);
				
				matrizDosAux = creaRuta(matrizDosAux);
				
				matrizDosAux = modificarMatrizSecPrinc(matrizAux.secuenciaPrinc,matrizDosAux);
				matrizDosAux = modificarMatrizSecSecundaria(matrizAux.secuenciaSec,matrizDosAux);
				
				$scope.matrizBase = JSON.parse(matrizAux.jsonMatriz);
				$scope.matriz = matrizDosAux;
				
				console.log($scope.matriz);
				$scope.generaSecuenciacion();
			}
		};
		
		$scope.generaSecuenciacion = function(){
			//Iteramos la matriz desde la posicion mas abajo y a la derecha
			var maxY = $scope.matriz.length - 1;
			var maxX = $scope.matriz[0].length - 1;
			$scope.puntaje = $scope.matriz[maxY][maxX].valor;
			var secuenciaUno = [];
			var secuenciaDos = [];
			while(maxX >= 1 && maxY >= 1 ){
				console.log('Secuencia Uno:' + $scope.matriz[0][maxX] );
				console.log('Secuencia Dos:' + $scope.matriz[maxY][0] );
				console.log('Valor de la coordenada X: '+ maxX + '  Y: '+maxY +' '+  $scope.matriz[maxY][maxX].valor );
				if($scope.matriz[maxY][maxX].movimiento == 'Diagonal'){
					//Tomo uno de arriba y uno de abajo
					secuenciaUno.unshift( $scope.matriz[0][maxX].valor );
					secuenciaDos.unshift( $scope.matriz[maxY][0].valor );
					maxX--;
					maxY--;
				}else if($scope.matriz[maxY][maxX].movimiento == 'Izquierda' && !(maxY == 1 && maxX == 1)  ){
					//Tomo uno de arriba y uno de abajo
					secuenciaUno.unshift( $scope.matriz[0][maxX].valor );
					secuenciaDos.unshift( '*' );
					maxX--;
				}else if($scope.matriz[maxY][maxX].movimiento == 'Arriba' && !(maxY == 1 && maxX == 1)  ) {
					secuenciaUno.unshift( '*' );
					secuenciaDos.unshift( $scope.matriz[maxY][0].valor );
					maxY--;
				}else{
					break;
				}
			}
			
			$scope.secUnoAlin = secuenciaUno;
			$scope.secDosAlin = secuenciaDos;
			console.log('maxX: ' + maxX + ' maxY: ' + maxY);
			console.log('.:: ' + secuenciaUno + ' ::.' );
			console.log('.:: ' + secuenciaDos + ' ::.' );
		};
		
}]);

function crearObjeto(value, colorClass){
	var aux = new Object();
	aux.valor = value;
	aux.color = colorClass;
	return aux;
}

function modificarMatrizSecPrinc(secPrincVec, matriz){
	var secuenciaPrinc = createObject(secPrincVec)
	matriz.unshift(secuenciaPrinc);
	return matriz;
}

function modificarMatrizSecSecundaria(secSecundariaVec, matriz){
	var secuenciaSecund = createObject(secSecundariaVec);
	
	matriz[0].unshift(crearObjeto('...'));
	matriz[0].unshift(crearObjeto('...'));
	
	matriz[1].unshift(crearObjeto('...'));
	
	for(var i = 2 ; i < matriz.length ; i++){
		matriz[i].unshift(secuenciaSecund[i-2]);
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

function multiplosCinco(matriz){
	var vector = [];
	//Adiciono los multipos de cinco en el la primera fila
	for(var i = 0; i <= matriz[0].length ; i++){
		var aux = new Object();
		aux.movimiento = '-1';
		aux.valor = -i*5;
		aux.color = 'yellow-class';
		aux.movimiento = 'Izquierda';
		vector.push(aux);
	}
	matriz.unshift(vector);
	//Adiciono los multipos de cinco en la primera columna
	for(var i = 1 ; i < matriz.length ; i++){
		var aux = new Object();
		aux.movimiento = '-1';
		aux.valor = -i*5;
		aux.color = 'yellow-class';
		aux.movimiento = 'Arriba';
		matriz[i].unshift(aux);
	}
	return matriz;
}

function adicionoClasesMatriz(matriz){
	for(var i = 0; i < matriz.length;i++){
		for(var j = 0 ; j < matriz[0].length ; j++ ){
			matriz[i][j].color = 'azul-class';
			if(matriz[i][j].movimiento == '1'){
				matriz[i][j].movimiento = 'Diagonal';
			}else if(matriz[i][j].movimiento == '2'){
				matriz[i][j].movimiento = 'Izquierda';
			}else if(matriz[i][j].movimiento == '3'){
				matriz[i][j].movimiento = 'Arriba';
			}
		}
	}
	return matriz;
}


function creaRuta(matriz){
	var maxX = matriz.length - 1 ;
	var maxY = matriz[0].length - 1;
	
	while(maxX >= 0 && maxY >= 0 ){
		matriz[maxX][maxY].color = 'red-class';
		console.log('Movimiento: '+ matriz[maxX][maxY].movimiento);
		if(matriz[maxX][maxY].movimiento == 'Diagonal'){
			maxX--;
			maxY--;
		}else if(matriz[maxX][maxY].movimiento == 'Izquierda'){
			maxY--;
		}else{
			maxX--;
		} 
		
	}
	
	console.log("X: " + maxX);
	console.log("Y: " + maxY);
	return matriz;
}