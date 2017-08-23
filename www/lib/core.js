/*! Object.assign
 *	
 *	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */
if( Object.assign === undefined ) {
	
	Object.assign = function ( target ) {

		if( target === undefined || target === null ) {
			
			throw new TypeError( 'Object.assign: @param target can\'t null or undefined.' );
			
		}

		var	i, key, obj;

		for( i = 1; i < arguments.length; i++ ) {
			
			obj = arguments[ i ];

			if( obj !== undefined && obj !== null ) {
				
				for( key in obj ) {
					
					if( Object.prototype.hasOwnProperty.call( obj, key ) ) {
						target[ key ] = obj[ key ];
					}
					
				}
				
			}
			
		}

		return target
	}
	
}