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
            }
            
        };
    }
]);