//window.addEventListener('load', function() {
document.addEventListener('deviceready', function() {
	'use strict';
	
	var url = 'http://v-id.net/demo.php';
	
	var input = document.querySelector('input');
	
	var div = document.getElementById('result');
	
	document.querySelector('button').onclick = function() {
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
	};

/*	document.querySelector('button').onclick = function() {
		try {
			
			var onErrorLoadFs = function(e) { alert( JSON.stringify( e ) ) };
			
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

				alert('file system open: ' + fs.name);
				
				div.innerHTML = JSON.stringify( e );
				
				getSampleFile(fs.root);

			}, onErrorLoadFs);
		
		} catch(er) { alert( er.stack ); }
	};
*/	
	
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

