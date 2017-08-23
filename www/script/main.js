//window.addEventListener('load', function() {
document.addEventListener('deviceready', function() {
	'use strict';
	
	var url = 'http://v-id.net/demo.php';
	
	var input = document.querySelector('input');
	
	var div = document.getElementById('result');
	
	div.innerHTML = 'loaded';
	
/*/	document.querySelector('button').onclick = function() {
		try {
			/// resolveLocalFileSystemURL
		//	window.resolveLocalFileSystemURI( input.value, function(entry) {
			window.resolveLocalFileSystemURL( input.value, function(entry) {
				
				try {
				
					entry.createReader().readEntries( function(e) {
						
						try {
							
							div.innerHTML = JSON.stringify( e );
						
						} catch(er) { alert( er.stack ); }
						
					}, function(e) { alert( JSON.stringify( e ) ) } );
				
				} catch(er) { alert( er.stack ); }
				
			}, function(e) { alert( JSON.stringify( e ) ) } );
		
		
		} catch(er) { alert( er.stack ); }
	};*/

	document.querySelector('button').onclick = function() {
		try {
			
			var error = function(e) { alert( JSON.stringify( e ) ) };
			
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

				alert(fs.root);
				alert( JSON.stringify( e ) );
				alert('file system open: ' + fs.root);
				
				div.innerHTML = JSON.stringify( e );
				
				return;
				
				try {
					window.resolveLocalFileSystemURL( input.value, function(entry) {
						
						try {
						
							entry.createReader().readEntries( function(e) {
								
								try {
									
									div.innerHTML = JSON.stringify( e );
								
								} catch(er) { alert( er.stack ); }
								
							}, error );
						
						} catch(er) { alert( er.stack ); }
						
					}, error );
				
				
				} catch(er) { alert( er.stack ); }
				
				
			}, error);
		
		} catch(er) { alert( er.stack ); }
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

