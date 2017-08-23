/** 
 *	
 */
function selectFile( element, callback ) {
	
	var data = [{name:'Android'},{name:'Download'},{name:'Pictures'}];
	
	var paths = {
		Android: [ {name:'data'},  {name:'data'},  {name:'data'},  {name:'data'},  {name:'data'},  {name:'data'},  {name:'data'},  {name:'data'},  {name:'data'},  {name:'data'},  {name:'data'},  {name:'data'},  {name:'data'},  {name:'data'},  {name:'data'}, {name:'obb'} ],
		Download: [ ],
		Pictures: [  ]
	};
	
	
	var background = document.body.create('div');
		background.className = 'filechooser';
		background.onclick = function(e) {
			e.preventDefault(); e.stopPropagation();
			if(e.target.className == background.className) background.remove();
		}
		
	var frame = background.create('div');
	
	var header = frame.create('header');
		header.create('big').write('Selecione um Arquivo');
	
	var index = header.create('div');
	
	var main = frame.create('main');
	
	var footer = frame.create('footer');
	
	footer.create('button').write('Cancel').onclick = function() {
		background.remove();
	};
	
	main.style.height = (frame.clientHeight - header.clientHeight - footer.clientHeight - 40) + 'px';
	
	
	
	function toDirectory( str ) {
		
		window.resolveLocalFileSystemURI( str, function(entry) {
			
			entry.createReader().readEntries( success, error );
			
		}, error );
		
		
	}
	
	function listPaths( dir, entries ) {
		
		index.create('button').write( dir );
		
		var ul = document.querySelector('#file-chooser-ul') + dir;
		
		if( typeof ul != 'element' ) { 
			ul = main.create('ul'); 
			ul.id = 'file-chooser-ul-' + dir;
		} else {
			ul.parentNode.style.display = 'block';
		}
		
		
		for(var i = 0; i < entries.length; i++) {
			
			ul.create('li').write( entries[i].name ).onclick = function() {
				this.parentNode.style.display = 'none';
				listPaths( this.innerHTML, paths[this.innerHTML] );
			};
			
		}
	};
	
	
	function error( err ) { alert( JSON.stringify( err ) ); }
	
	listPaths( 'data', data );
	
};
