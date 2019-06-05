//Factoria con el cual 
app.factory("getFilesFasta", ['$cookies', '$location',
    function ($cookies, $location) {
        return {
            getAllData : function () {
            	var objeto = null;
                $.ajax({
                    url: "http://localhost:8080/bioinformatica/v.1/archivo/",
                    method: 'get',
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    async: false,
                    success: function (result, textStatus, jqXHR) {
                    	if(jqXHR.status == "204"){
                    		alert('No hay resultados');
                    		objeto = [];
                    	}else{
                    		objeto = result;
                    	}
                    }
                });
                return objeto;
            },
            uploadFile : function(){
            	var objeto = null;
            	$.ajax({
                    url: "http://localhost:8080/bioinformatica/v.1/file/",
                    method: 'get',
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    async: false,
                    success: function (result, textStatus, jqXHR) {
                    	objeto = result;
                    }
                });
            	return objeto;
            },
            byId : function(id){
            	var objeto = null;
            	$.ajax({
                    url: "http://localhost:8080/bioinformatica/v.1/archivo/"+id+"/",
                    method: 'get',
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    async: false,
                    success: function (result, textStatus, jqXHR) {
                    	objeto = result;
                    }
                });
            	return objeto;
            },
            getSecuencia : function (idPrin, idSec){
            	var objeto = null;
            	$.ajax({
                    url: "http://localhost:8080/bioinformatica/v.1/file/algorithm/"+idPrin+"/" + idSec + "/",
                    method: 'get',
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    async: false,
                    success: function (result, textStatus, jqXHR) {
                    	objeto = result;
                    }
                });
            	return objeto;
            },
            getSecuenciaById : function (id){
            	var objeto = null;
            	$.ajax({
                    url: "http://localhost:8080/bioinformatica/v.1/secuenciacion/"+id+"/" ,
                    method: 'get',
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    async: false,
                    success: function (result, textStatus, jqXHR) {
                    	objeto = result;
                    }
                });
            	return objeto;
            },
            getMatrizEquivalencias : function (){
            	var objeto = [];
            	var filaPrinc =['..','A','G','C','T'];
            	var filaUno   =['A','10','-1','-3','-4'];
    			var filaDos   =['G','-1','7' ,'-5','-3'];
    			var filaTres  =['C','-3','-5','9' ,'0'];
    			var filaCuatro=['T','-4','-3','0' ,'8'];
    			objeto.push(filaPrinc);
    			objeto.push(filaUno);
    			objeto.push(filaDos);
    			objeto.push(filaTres);
    			objeto.push(filaCuatro);
            	return objeto;
            },
            getValorLetras : function (letra){
            	if(letra == 'A'){
            		return '1';
            	}else if(letra == 'G'){
            		return '2';
            	}else if(letra == 'C'){
            		return '3';
            	}else if(letra == 'T'){
            		return '4';
            	}
            },
            deleteById : function (id){
            	var objeto = null;
            	$.ajax({
                    url: "http://localhost:8080/bioinformatica/v.1/archivo/"+id+"/" ,
                    method: 'delete',
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    async: false,
                    success: function (result, textStatus, jqXHR) {
                    	objeto = result;
                    }
                });
            	return objeto;
            },
            insertArchivo : function (objeto){
            	var valida = false;
            	var datos = JSON.stringify( objeto );
            	console.log(datos);
            	$.ajax({
                    url: "http://localhost:8080/bioinformatica/v.1/archivo/",
                    method: 'POST',
                    dataType: 'json',
                    data : datos,
                    cache: false,
                    contentType : 'application/json',
//                    contentType: false,
//                    processData: false,
                    async: false,
                    success: function (result, textStatus, jqXHR) {
                    	valida = result;
                    }
                });
            	return valida;
            }
        };
    }
]);