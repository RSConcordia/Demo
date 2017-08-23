//window.addEventListener('load', function() {
document.addEventListener('deviceready', function() {
	'use strict';
	
	var url = 'http://v-id.net/demo.php';
	
	var input = document.querySelector('input');
	
	var div = document.getElementById('result');
	
	div.innerHTML = 'loaded';
	
/*	document.querySelector('button').onclick = function() {
		try {
			window.resolveLocalFileSystemURI( input.value, function(entry) {
				
				try {
					
					alert( JSON.stringify( entry ) )
					
					entry.createReader().readEntries( function(e) {
						
						try {
							
							div.innerHTML = JSON.stringify( e );
						
						} catch(er) { alert( er.stack ); }
						
					}, function(e) { alert( JSON.stringify( e ) ) } );
				
				} catch(er) { alert( er.stack ); }
				
			}, function(e) { alert( JSON.stringify( e ) ) } );
		
		
		} catch(er) { alert( er.stack ); }
	};
*/
	document.querySelector('button').onclick = function() {
		try {
			
			var error = function(e) { alert( JSON.stringify( e ) ) };
			
			window.resolveLocalFileSystemURL( input.value, function (fs) {
				
				alert( JSON.stringify( fs ) );
				
				div.innerHTML = JSON.stringify( fs );
				div.innerHTML += '<br><br><br><br>';
				
				div.innerHTML = JSON.stringify( fs.__proto__ );
				
			}, error );
		
		} catch(er) { alert( er.stack ); }
	};
	
/*	document.querySelector('button').onclick = function() {
		try {
			
			var error = function(e) { alert( JSON.stringify( e ) ) };
			
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

				alert( JSON.stringify( fs.root ) );
				
				div.innerHTML = JSON.stringify( fs.root );
				
				return;
				
				try {
					
				
						fs.root.getDirectory(dirName, {}, function(dirEntry) {
							
							fileEntry.moveTo(dirEntry);
							
						}, error);

				
				} catch(er) { alert( er.stack ); }
				
				
			}, error);
		
		} catch(er) { alert( er.stack ); }
	};
/*	
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
*/
}, false);

