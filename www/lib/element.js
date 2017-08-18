/*! Element.prototype 
 *	 
 */ 
Object.assign( Element.prototype, {
	
	/** create
	 *
	 *	@param (String)	 str
	 *	@param (Number)	 index		(!Optional)
	 *	return (Element)
	 */
	create: function( str, index ) {
		return this.append( document.createElement(str), index );
	},
	
	/** append
	 *
	 *	@param (Element) element
	 *	@param (Number)	 index		(!Optional)
	 *	return (Element)
	 */
	append: function( element, index ) {
		if( index ) {
			this.insertBefore(element, this.querySelectorAll('*')[ index ] );
		} else {
			this.appendChild( element );
		}
		
		return element
	},
	
	/** remove
	 * 
	 */
	remove: function() {
		if(this.parentNode) {
			this.parentNode.removeChild( this );
		}
	},
	
	/** write
	 *	
	 *	@param (String)	 str
	 *	return (Element)
	 */
	write: function( str ) { 
		this.appendChild( document.createTextNode( str ) ); 
		return this 
	},
		
	/** set
	 *	
	 *	@param (Object)	attr	
	 *	return (Element)
	 */
	set: function( attr ) {
		if( attr.style ) {
			Object.assign( this.style, attr.style );
			delete attr.style
		}
		
		if( attr.dataset ) {
			Object.assign( this.dataset, attr.dataset );
			delete attr.dataset
		}
		
		return Object.assign( this, attr );
	}
		
});