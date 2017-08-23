/*! Canvas
 *
 *	@param (Number)  w			width
 *	@param (Number)  h			height
 */
function Canvas( w, h ) {

	var width = w,
		height = h,
		canvas = document.createElement('canvas'),
		ctx = canvas.getContext("2d");
		
	canvas.width = width;
	canvas.height = height;
	
	/** clear
	 *	
	 *	@param (String) color
	 */
	function clear( color ) {
		ctx.fillStyle = color || 'rgb(0,0,0)';
		ctx.fillRect(0, 0, width, height);
	};
	
	/** resize
	 *	
	 *	@param (Number) w		width
	 *	@param (Number) h		height
	 */
	function resize( w, h ) {
		width = w;
		height = h;
		canvas.width = width;
		canvas.height = height;
	};
	
	/** getData
	 *	
	 *	@param (Number) w		width
	 *	@param (Number) h		height
	 *	@param (Number) x		x			!Default: 0
	 *	@param (Number) y		y			!Default: 0
	 *	return (Object)			ImageData
	 */
	function getData( w, h, x, y ) {
		w = (w === undefined)? width : w;
		h = (h === undefined)? height : h;
		return ctx.getImageData(x || 0, y || 0, w, h);
	};
	
	/** setData
	 *	
	 *	@param (Object) data	ImageData
	 *	@param (Number) x		x			!Default: 0
	 *	@param (Number) y		y			!Default: 0
	 */
	function setData( data, x, y ) {
		ctx.putImageData( data, x || 0, y || 0);
	};
	
	/** setImage
	 *	
	 *	@param (Element) image
	 */
	function setImage( image ) {
		resize( image.width, image.height );
		ctx.drawImage(image, 0, 0, width, height);
	};
	
	function negative() {
		var idata = getData(),
			data = idata.data, i;
		
		for( i = 0; i < data.length; i+=4 ) {
			data[i]   = 255 - data[i];
			data[i+1] = 255 - data[i+1];
			data[i+2] = 255 - data[i+2];
		}
		clear();
		setData( idata ); 
	};
	
	/** whiteTransparent
	 *	
	 *	@param (Number) min
	 */
	function whiteTransparent( min ) {
		var idata = getData(),
			data = idata.data, i;
		
		if( min == undefined || min == null ) min = 235;
		
		for(i = 0; i < data.length; i+=4) {
			if( data[i] > min && data[i+1] > min && data[i+2] > min )  data[i+3] = 0.0;
		}
		clear();
		setData( idata ); 
	};
	
	/** getPixels
	 *	
	 *	return (Array) 			Pixels hex color  
	 */
	function getPixels() {
		var data = getData().data,
			array = [], i, n;
		
		for( i = 0, n = 0; i < data.length; i += 4 ) {
			array[ n++ ] = data[i+2] | (data[i+1] << 8) | (data[i] << 16);
		}
		
		return array
	};
	
	/** setHexData
	 *	
	 *	@param (Array) array
	 */
	function setPixels( array ) {
		var idata = getData(),
			data = idata.data, i, n;
		
		for( i = 0, n = 0; i < array.length; i++ ) {
			data[ n++ ] = (array[i] >> 16) & 255;
			data[ n++ ] = (array[i] >> 8) & 255;
			data[ n++ ] = array[i] & 255;
			data[ n++ ] = 1.0;
		}
		
		setData( idata )
	};
	
	/** line
	 *	
	 *	@param (Number) a
	 *	@param (Number) b
	 *	@param (Number) c
	 *	@param (Number) d
	 *	@param (String) color
	 */
	function line( a, b, c, d, color ) {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.moveTo(a, b);
		ctx.lineTo(c, d);
		ctx.stroke();
		ctx.closePath();
	};
	
	/** rect
	 *	
	 *	@param (Number) x
	 *	@param (Number) y
	 *	@param (Number) w
	 *	@param (Number) h
	 *	@param (String) color
	 *	@param (Boolean) fill
	 */
	function rect( x, y, w, h, color, fill ) {
		ctx.beginPath();
		if( fill ) {
			ctx.fillStyle = color;
			ctx.fillRect(x, y, w, h);
		//	ctx.fill();
		} else {
			ctx.strokeStyle = color;
			ctx.strokeRect(x, y, w, h);
		//	ctx.stroke();
		}
		ctx.closePath();
	};
	
	/** circle
	 *	
	 *	@param (Number) x
	 *	@param (Number) y
	 *	@param (Number) radius
	 *	@param (String) color
	 *	@param (Boolean) fill
	 */
	function circle( x, y, radius, color, fill ) {
		ctx.beginPath();
		if( fill ) {
			ctx.fillStyle = color;
			ctx.arc( x, y, radius, 0, 2*Math.PI);
			ctx.fill();
		} else {
			ctx.strokeStyle = color;
			ctx.arc( x, y, radius, 0, 2*Math.PI);
			ctx.stroke();
		}
		ctx.closePath();
	};
	
	/** write
	 *	
	 *	@param (String) str
	 *	@param (Number) x
	 *	@param (Number) y
	 *	@param (String) color
	 */
	function write( str, x, y, color ) {
		ctx.beginPath();
		ctx.fillStyle = color || 'rgb(255,255,255)';
		ctx.fillText( str, x, y );
		ctx.fill();
		ctx.closePath();
	};
	
	/** setFont
	 *	
	 *	@param (String) str
	 */
	function setFont( str ) {
		ctx.font = str
	};
	
	Object.assign( this, {
		DOMElement: canvas,
		context2D: ctx,
		
		clear: clear,
		resize: resize,
		
		getData: getData,
		setData: setData,
		
		setImage: setImage,
		
		getPixels: getPixels,
		setPixels: setPixels,
		
		line: line,
		rect: rect,
		circle: circle,
		write: write,
		setFont: setFont,
		
		negative: negative,
		whiteTransparent: whiteTransparent
	});
	
	setFont('14px Comic Sans MS');
};