function App() {
//	this.header  = document.body.get('header');
	this.screens = new Object;
	this.previous = new Array();
	this.current  = null;
	
	var sections = document.querySelectorAll('section'),
		element, i;
	
	for( i = 0; i < sections.length; i++ ) {
		element = sections[ i ];
		element.style.display = 'none';
		this.screens[ element.id ] = new APP.Screen( element )
	};
};

Object.assign( App.prototype, {
	
	back: function() {
		
		if(this.previous.length == 0) return;
	
		try {
		
			this.screens[ this.current ].close();
			this.current = this.previous.pop();
			this.screens[ this.current ].open();
			
		//	this.btn_back.style.display = (this.previous.length == 0)? 'none' : 'block';
			
		} catch(e) { 
			console.warn('APP.toReturn(Error)', e);
			this.back();
		}
		
	},
	
	open: function( id, param ) {
		if(this.current == id) return;
	
		if(this.current) {
			this.screens[ this.current ].close();
			this.previous.push( this.current );
		}
		
	//	this.btn_back.style.display = (this.previous.length == 0)? 'none' : 'block';

		this.screens[ id ].open( param );
		this.current = id;
	}
	
});

App.Screen = function( element ) {
	this.view = element
};

Object.assign( App.Screen.prototype, {
	
	open: function(param) {
		if(typeof this.beforeOpen == 'function') this.beforeOpen(param);
		this.view.style.display = "block";
		if(typeof this.afterOpen == 'function') this.afterOpen(param);
	},
	
	close: function(param) {
		if(typeof this.beforeClose == 'function') this.beforeClose(param);
		this.view.style.display = "none";
		if(typeof this.afterClose == 'function') this.afterClose(param);
	},
	
	beforeOpen: null,
	afterOpen: null,
	beforeClose: null,
	afterClose: null
	
});
