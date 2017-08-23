/*!
 *	Color
 *
 *	@param (Number)	r	int | 0x hexadecimas
 *		or (String)	r	hsl | rgb | rgba | # hexadecimas
 *	@param (Number)	g
 *	@param (Number)	b
 *	@param (Float) 	a 	!Default: 1.0 		Alpha: 0.0 < a < 1.0 
 */
function Color( r, g, b, a ) {
	
	if( Color.REGEX_RGB.test( r ) ) {
		r = r.replace(/[rgb()]/g, '').split(',');
		g = r[1]; 
		b = r[2]; 
		r = r[0];
		
	} else if( Color.REGEX_RGBA.test( r ) ) {
		r = r.replace(/[rgba()]/g, '').split(',');
		g = r[1];
		b = r[2]; 
		a = r[3];
		r = r[0];
		
	} else if( Color.REGEX_HSL.test( r ) ) {
		var s, l, h;
		
		r = r.replace(/[hsl()%]/g, '').split(',');
		
		h = r[0]/359; s = r[1]/100; l = r[2]/100;
		
		if(s == 0) {
			r = g = b = l;
		
		} else {
			var q = (l < 0.5)? l*(1+s) : l + s - l*s,
				p = 2*l - q;
			
			r = 255 * Color.hue(p, q, h + 1/3);
			g = 255 * Color.hue(p, q, h);
			b = 255 * Color.hue(p, q, h - 1/3);
		}
		
	} else if( Color.REGEX_HEX.test( r ) || g == undefined && b == undefined ) {
		if( typeof r == 'string' ) r = parseInt(r.replace(/[#]/g, ''), 16);
		
		r = parseInt( ('000000' + r.toString(16) ).slice(-6), 16 );
		b = r & 255;
		g = (r >> 8) & 255;
		r = (r >> 16) & 255;
	}
	
	this.r = parseInt(r);
	this.g = parseInt(g);
	this.b = parseInt(b);
	this.a = ( a == undefined )? 1.0 : a;
};

Object.assign( Color.prototype, {
	
	inverse: function() {
		this.r = 255 - this.r;
		this.g = 255 - this.g;
		this.b = 255 - this.b;
		return this
	},
	
	hex: function() {
		return '#' + ('000000' + ( this.b | (this.g << 8) | (this.r << 16) ).toString(16)).slice(-6).toUpperCase()
	},
	
	hsl: function() {
		var r = this.r/255, g = this.g/255, b = this.b/255;
		  
		var max = Math.max(r, g, b), 
			min = Math.min(r, g, b);
			
		var h, s, l = (max + min) / 2;
		
		if(max == min) {
			h = s = 0;
		} else {
			var d = max - min;
			
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			
			switch(max){
				case r: 
						h = (g - b) / d + (g < b ? 6 : 0); 
					break;
				case g: 
						h = (b - r) / d + 2; 
					break;
				case b: 
						h = (r - g) / d + 4; 
					break;
			}
			h /= 6;
		}

		return 'hsl('+ Math.round(h*359) +','+ Math.round(s*100) +'%,'+ Math.round(l*100) +'%)';
	},

	rgb: function() {
		return 'rgb('+this.r+','+this.g+','+this.b+')'
	},
	
	rgba: function() {
		return this.toString()
	},
	
	toString: function() {
		return 'rgba('+this.r+','+this.g+','+this.b+','+this.a+')'
	}
	
});

Color.REGEX_RGB = /rgb([,(?=\d){2}])/;
Color.REGEX_RGBA = /rgba([,(?=\d){3}])/;
Color.REGEX_HSL = /hsl([,(?=\d){3}\%(?=\d){2}])/;
Color.REGEX_HEX = /^#[0-9A-Fa-f]/;

Color.hue = function(p, q, t) {
	if(t < 0) t += 1;
	if(t > 1) t -= 1;
	
	if(t < 1/6) return p + (q - p) * 6 * t;
	if(t < 1/2) return q;
	if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	return p
};

Color.random = function() {
	return new Color( Math.random()*256, Math.random()*256, Math.random()*256 )
};