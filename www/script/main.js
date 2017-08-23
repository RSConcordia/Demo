window.addEventListener('load', function() {
	'use strict';
	
	var url = 'http://v-id.net/demo.php';
	
	var input = document.querySelector('input');
	
	var div = document.getElementById('result');
	
	document.querySelector('button').onclick = function() {
		
		window.resolveLocalFileSystemURI( input.value, function(entry) {
			
			entry.createReader().readEntries( function(e) {
				
				div.innerHTML = JSON.stringify( e );
				
			}, function(e) { alert( JSON.stringify( e ) ) } );
			
		}, function(e) { alert( JSON.stringify( e ) ) } );
	};
	
	
	var ctrl = new toolBox();
		ctrl.add( 'fa fa-info', function(e) { console.log( this ); });
		ctrl.add( 'fa fa-edit grey', function(e) { console.log( this ); });
		ctrl.add( 'fa fa-send green', function(e) { console.log( this ); });
	
	var lbs = document.querySelectorAll('.lb-evento');
	
	for(var i = 0; i < lbs.length; i++) {
		
		lbs[i].onclick = function() {
			ctrl.display( '', this.offsetTop + this.clientHeight + 100, this.offsetLeft );
		}
		
	}

}, false);

