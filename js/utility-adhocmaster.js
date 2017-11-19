/**
 * version 1.0
 * @author Muktadir
 * @contributor Alam
 */

var mApp = mApp || {
	
	loadingOverlay : "#loadingOverlay",

	loadingOverlayAction : function() {
		
		this.show = function() {

			if( undefined != this.loadingOverlay ) {
				
				$( this.loadingOverlay ).css( "display", "show" );
			}
		};
		this.hide = function() {

			if( undefined != this.loadingOverlay ) {
				
				$( this.loadingOverlay ).css( "display", "none" );
			}
		};
		
		return this;
		
	}
};

mApp.uploadMedia=function(data,otherData,object,callback){
	
	
	$.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "/data-api/extra/media",
        data: data, //$(data).attr('file'),
        dataType: 'json',
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {
        	
        	data["mediaId"]=data.id;
        	        	
        	var res=JSON.stringify(data);
        	
        	otherData=otherData+"&mediaId="+data.id;
        	
        	//alert("Successful!!"+ res+ " HIIIIIIIIIIII "+otherData) ;
          
            console.log("SUCCESS: ", data);
          
            object[callback](otherData);
           
        },
        error: function (e) {
        	alert("error in upload media!!!"+" hello "+e.responseText);
           // $("#result").text(e.responseText);
           // console.log("ERROR : ", e);
         

        }
    });
}

mApp.callAjaxText = function ( url,params, method, object, callback ) {
	
	$.ajax({
		type: method,
		url: url,
		data: params,
		dataType: 'text',
		traditional: 'true',
		async: false,
		success: function (data) {
			
			console.log("data loaded");
			object[callback](data);
			
		},
		
		error: function (jqXHR, textStatus, errorThrown) {
			
			/*
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error Code: " + jqXHR.status + ", Type:" + textStatus + ", Message: " + errorThrown);
			*/

			console.log(jqXHR);
			object[callback]( jqXHR.responseJSON );
			
			console.log("mara khaise");
			
			
		}
	});
	
}


mApp.callAjax = function ( url,params, method, object, callback ) {
	
	$.ajax({
		type: method,
		url: url,
		data: params,
		dataType: 'json',
		traditional: 'true',
		async: false,
		success: function (data) {
			
			console.log("act add hoise");
			object[callback](data);
			
		},
		
		error: function (jqXHR, textStatus, errorThrown) {
			
			/*
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error Code: " + jqXHR.status + ", Type:" + textStatus + ", Message: " + errorThrown);
			*/

			console.log(jqXHR);
			object[callback]( jqXHR.responseJSON );
			
			console.log("mara khaise");
			
			
		}
	});
	
}

mApp.isResponseValid = function ( response ) {
	
	
	if ( undefined == response.error || response.error == false )
		return true;

	
	console.log( response );
	
	return false;
	
}

mApp.isJson = function ( str ) {
	
    try {
    	
        JSON.parse(str);
        
    } catch (e) {
    	
    	console.log( str );
    	console.log( e );
        return false;
        
    }
    return true;
    
}


mApp.setUpRestPaths = function ( container, controllerPaths, needleStr, replaceStr ) {
	console.log( "3 inside setupRestpaths" );
	
	if ( undefined ==  controllerPaths ) {
		
		alert( "controller paths undefined");
		
	}
	
	for ( var key in controllerPaths ) {
		
		if( controllerPaths.hasOwnProperty( key ) ) {
			
			container.restPaths[key] = controllerPaths[key].replace( /\?.*/, "" ).replace( needleStr, replaceStr );
			
			
		}
		
	}
	console.log( "4. controller paths has been replaed" );
	
}

mApp.getLoadingHtml = function() {
	
	var html = '<div id="ballsWaveG">'+
					'<div id="ballsWaveG_1" class="ballsWaveG"></div>'+
					'<div id="ballsWaveG_2" class="ballsWaveG"></div>'+
					'<div id="ballsWaveG_3" class="ballsWaveG"></div>'+
					'<div id="ballsWaveG_4" class="ballsWaveG"></div>'+
					'<div id="ballsWaveG_5" class="ballsWaveG"></div>'+
					'<div id="ballsWaveG_6" class="ballsWaveG"></div>'+
					'<div id="ballsWaveG_7" class="ballsWaveG"></div>'+
					'<div id="ballsWaveG_8" class="ballsWaveG"></div>'+
				'</div>';
	
	return html;	
	
}

mApp.showErrorModal = function ( errorMessage ) {
	
	$('#error-modal .modal-body').html( errorMessage );
	
	$('#error-modal').modal();
	
}

mApp.showSuccessModal = function ( successMessage ) {
	
	$('#success-modal .modal-body').html( successMessage +". <i>Please reload the page.</i>");
	
	$('#success-modal').modal();
	
}

mApp.redirect = function ( url, timeout ) {
	
	setTimeout( function() {
		
		window.location.href = url ;
				
	}, timeout );
	
}

mApp.sleepFor = function ( sleepDuration ){
	
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
    
}
mApp.isInt = function ( value ) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}