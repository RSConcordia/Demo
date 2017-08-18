if( !Object.assign ) {
	/** 
	 * Object.assign
	 *	
	 *	@param [(Object), (Object) ]
	 *	return (Object)
	 */
	Object.assign = function() {
		var obj = arguments[0],
			i, key;
		
		for( i = 0; i < arguments.length; i++ ) {
			for( key in arguments[i] ) {
				obj[ key ] = arguments[i][key];
			}
		}
		
		return obj;
	}
};