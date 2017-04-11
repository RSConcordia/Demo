document.addEventListener('deviceready', function() {
//window.addEventListener('load', function() {
	"use strict";
	
	var SERVER =  "http://chat.v-id.net/virtual-session/";
	
	document.getElementById('btn-teste').addEventListener('touchstart', function(e) {
		e.preventDefault(); e.stopPropagation();
		
		log('click: btn-teste');
		
		document.body.create('div')
			.set({
				style: {
					position:'absolute', height:'100%', width:'100%',
					margin:'auto', top:0, left:0, bottom:0, right:0,
					backgroundColor:'rgba(0,0,0,.7)', zIndex:99
				},
				onclick: function() { this.remove() }
			}).create('div')
				.set({
					style: {
						position:'absolute', height:'40%', width:'80%',
						margin:'auto', top:0, left:0, bottom:0, right:0,
						backgroundColor:'rgb(255,255,255)',
						boxShadow:'0 7px 15px rgba(0,0,0,.7)'
					}
				}).create('h1').write("CONGRATULATIONS is working!!!")
					.set({
						style: {
							position:'absolute', height:'20%', width:'80%',
							margin:'auto', top:0, left:0, bottom:0, right:0,
							color:'rgb(227,48,19)'
						}
					})
	}, false);
	
	document.getElementById('btn-start').addEventListener('touchstart', function(e) {
		e.preventDefault(); e.stopPropagation();
		
		log('click: btn-start');
		
		Session();
		
	/*	cordova.plugins.barcodeScanner.scan( function (result) {
			
			URL = result.text;
			Session();
			
			
		}, function (e) { alert("Scanning failed: " + e) }, {
			preferFrontCamera: false, // iOS and Android 
			showFlipCameraButton: false, // iOS and Android 
			formats: "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED 
			prompt: "", // supported on Android only 
			orientation: "landscape" // Android only (portrait|landscape), default unset so it rotates with the device 
		}); 
	*/	
	}, false);
	
	function ScreenImage(callback) {
		navigator.screenshot.URI(function(error, res) {
			if(error) { 
				alert( JSON.stringify(error) );
			} else {
				callback(res.URI);
			}
		}, 50);
	};
	
	function Session() {
		
		Session.send(Session.request);
		
	};
	
	Session.send = function(callback) {
		ScreenImage(function(image) {
			$.ajax({
				url:SERVER+'upload.php',
				type:"POST",
				data: {
					screen:image
				},
				success: function(e) { callback(); }, 
				error: function(e) { alert("Erro de conexão! \n Verifique se o dispositivo está conectado."); } 
			}); 
		});
	};
	
	Session.request = function() {
		$.ajax({
				url:SERVER+'callback.php',
				type:"POST",
				data: {},
				success: function(e) {
					log("Session.request: "+now());
					
					if(e != "") {
						log("Event.touchstart: x"+e.x + "y:"+e.y);
						
						e = JSON.parse(e);
						document.elementFromPoint(e.x, e.y).dispatchEvent( new Event('touchstart') );
					}
					
					
					Session.send(Session.request);
				}, 
				error: function(e) { alert("Erro de conexão! \n Verifique se o dispositivo está conectado."); } 
			}); 
	};
	
	function log(msg) {
		document.getElementById('log').create('label')
			.write(msg);
	};
	
	function now() {
		now.date = new Date();
		return now.date.getMinutes() +":"+ now.date.getSeconds()
	};
	now.date = null;
	
}, false);


/*	document.body.create('div')
			.set({
				style: {
					position:'absolute', height:'100%', width:'100%',
					margin:'auto', top:0, left:0, bottom:0, right:0,
					backgroundColor:'rgba(0,0,0,.7)', zIndex:99
				},
				onclick: function() { this.remove() }
			}).create('div')
				.set({
					style: {
						position:'absolute', height:'60%', width:'60%',
						margin:'auto', top:0, left:0, bottom:0, right:0,
						backgroundColor:'rgb(255,255,255)',
						boxShadow:'0 7px 15px rgba(0,0,0,.7)'
					}
				}).create('img')
					.set({ src: res.URI }); 
*/