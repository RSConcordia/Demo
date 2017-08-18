/*! mat2 Matrix2x2
 *								 		   identity
 *		m11 m12		m[0]  m[1]				1	0
 *		m21 m22		m[3]  m[4]				0	1
 *
 *	@param (Float32Array[4]) 	m			!Default mat2.DEFAULT [ 0,0, 0,0 ]
 * 		or (Float32Array[9])	m
 *	return (Float32Array[4])
 */
function mat2() {
	if( m.length === 9 ) return new Float32Array([ m[0], m[1], m[4], m[5] ]);
	return new Float32Array( m )
};

Object.assign( mat2, {
	
	DEFAULT: new Float32Array([ 0,0, 0,0 ]),
	IDENTITY: new Float32Array([ 1,0, 0,1 ]),
	
	/** determinant
	 *
	 *	@param (Float32Array[4]) m
	 *	return (Number)
	 */
	det: function( m ) {
		return m[0] * m[3] - m[1] * m[2]
	}
	
});

/*! mat3 Matrix3x3
 *												 identity
 *		m11 m12 m13		m[0]  m[1]  m[2]		1	0	0
 *		m21 m22 m23		m[3]  m[4]  m[5]		0	1	0
 *		m31 m32 m33		m[6]  m[7]  m[8]		0	0	1
 *
 *	@param (Float32Array[4]) 	m				!Default mat3.DEFAULT [ 0,0,0, 0,0,0, 0,0,0 ]
 * 		or (Float32Array[9])	m
 * 		or (Float32Array[16])	m
 *	return (Float32Array[9])
 */
function mat3( m = mat3.DEFAULT ) {
	if( m.length === 4 ) return new Float32Array([ m[0], m[1], 0, m[2], m[4], 0, 0, 0, 1 ]);
	if( m.length === 16 ) return new Float32Array([ m[0], m[1], m[2], m[4], m[5], m[6], m[8], m[9], m[10] ]);
	return new Float32Array( m )
};

Object.assign( mat3, {
	
	DEFAULT: new Float32Array([ 0,0,0, 0,0,0, 0,0,0 ]),
	IDENTITY: new Float32Array([ 1,0,0, 0,1,0, 0,0,1 ]),
	
	/** identity
	 *
	 *	return (Float32Array[9])
	 */
	identity: function() {
		return new Float32Array( mat3.IDENTITY )
	},
	
	/** multiply
	 *	
	 *	@param (Float32Array[9]) 	m
	 *	@param (Float32Array[9]) 	b
	 *	return (Float32Array[9])	m
	 */
	multiply: function( m, b ) {
		var a = m.slice();
		
		m[0] = a[0]*b[0] + a[1]*b[3] + a[2]*b[6];
		m[1] = a[0]*b[1] + a[1]*b[4] + a[2]*b[7];
		m[2] = a[0]*b[2] + a[1]*b[5] + a[2]*b[8];
		
		m[3] = a[3]*b[0] + a[4]*b[3] + a[5]*b[6];
		m[4] = a[3]*b[1] + a[4]*b[4] + a[5]*b[7];
		m[5] = a[3]*b[2] + a[4]*b[5] + a[5]*b[8];
		
		m[6] = a[6]*b[0] + a[7]*b[3] + a[8]*b[6];
		m[7] = a[6]*b[1] + a[7]*b[4] + a[8]*b[7];
		m[8] = a[6]*b[2] + a[7]*b[5] + a[8]*b[8];
		
		return m;
	},
	
	/** determinant
	 *
	 *	@param (Float32Array[9]) m
	 *	return (Number)
	 */
	det: function( m ) { 
		return 	m[0] * mat2.det([ m[4],m[5], m[7],m[8] ]) - 
				m[3] * mat2.det([ m[1],m[2], m[7],m[8] ]) + 
				m[6] * mat2.det([ m[1],m[2], m[4],m[5] ])
	},
	
	/** transpose
	 *
	 *	@param (Float32Array[9]) 	m
	 *	return (Float32Array[9])	m
	 */
	transpose: function( m ) {
		var e = m.slice();
		
		m[1] = e[3];
		m[2] = e[6];
		m[3] = e[1];
		m[5] = e[7];
		m[6] = e[2];
		m[7] = e[5];
		
		return m
	},
	
	/** rotate
	 *
	 *	@param (Float32Array[9]) 	m
	 *	@param (Number) 			x
	 *	@param (Number) 			y
	 *	@param (Number) 			z
	 *	return (Float32Array[9]) 	m
	 */
	rotate: function( m, x, y, z ) {
		var e = m.slice(), s, c;
	
		if(x != 0) {
			x = x/180*Math.PI;
			s = Math.sin(x);
			c = Math.cos(x);
			
			mat3.multiply( m, [1,0,0, 0,c,-s, 0,s,c])
		}
		if(y != 0) {
			y = y/180*Math.PI;
			s = Math.sin(y);
			c = Math.cos(y);
			
			mat3.multiply( m, [c,0,s, 0,1,0, -s,0,c])
		}
		if(z != 0) {
			z = z/180*Math.PI;
			s = Math.sin(z);
			c = Math.cos(z);
			
			mat3.multiply( m, [c,-s,0, s,c,0, 0,0,1])
		}
		
		return m
	},
	
	/** scale
	 *
	 *	@param (Float32Array[16]) 	m
	 *	@param (Number) 			x
	 *	@param (Number) 			y
	 *	@param (Number) 			z
	 *	return (Float32Array[16]) 	m
	 */
	scale: function( m, x, y, z ) {
		if( y == undefined ) y = x;
		if( z == undefined ) z = x;
		
		var mat = mat3( mat3.IDENTITY );
			mat[0] = x;
			mat[4] = y;
			mat[8] = z;
		
		return mat3.multiply( m, mat )
	},
		
	/** inverse
	 *
	 *	return (Float32Array[9])
	 */
	inverse: function( m ) {
		var e = m.slice(),
			det = mat3.det( m );
		
		if (!det) return m;
		det = 1.0 / det;
	
		m[0] =  (e[8] * e[4] - e[7] * e[5]) * det;
		m[1] = (-e[8] * e[3] + e[6] * e[5]) * det;
		m[2] =  (e[7] * e[3] - e[6] * e[4]) * det;
		
		m[3] = (-e[8] * e[1] + e[7] * e[2]) * det;
		m[4] =  (e[8] * e[0] - e[6] * e[2]) * det;
		m[5] = (-e[7] * e[0] + e[6] * e[1]) * det;
		
		m[6] = 	(e[5] * e[1] - e[4] * e[2]) * det;
		m[7] = (-e[5] * e[0] + e[3] * e[2]) * det;
		m[8] = 	(e[4] * e[0] - e[3] * e[1]) * det;
		
		return m
		
	}
	
});

/*! mat4 Matrix4x4
 *														  identity
 *		m11 m12 m13 m14		m[0]  m[1]  m[2]  m[3]		1	0	0	0
 *		m21 m22 m23 m24		m[4]  m[5]  m[6]  m[7]		0	1	0	0
 *		m31 m32 m33 m34		m[8]  m[9]  m[10] m[11]		0	0	1	0
 *		m41 m42 m43 m44		m[12] m[13] m[14] m[15]		0	0	0	1
 *
 *	@param (Float32Array[16]) 	m				!Default mat4.DEFAULT [  0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0  ]
 * 		or (Float32Array[9])	m
 *	return (Float32Array[16])
 */
function mat4( m = mat4.DEFAULT ) {
	if( m.length === 9 ) return new Float32Array([ m[0], m[1], m[2], 0, m[3], m[4], m[5], 0, m[6], m[7], m[8], 0, 0, 0, 0, 1 ]);
	return new Float32Array( m )
};

Object.assign( mat4, {
	
	DEFAULT: new Float32Array([ 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0 ]),
	IDENTITY: new Float32Array([ 1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1 ]),
	
	/** identity
	 *
	 *	return (Float32Array[16])
	 */
	identity: function() {
		return new Float32Array( mat4.IDENTITY )
	},
	
	/** multiply
	 *
	 *	@param (Float32Array[16]) 	m
	 *	@param (Float32Array[16]) 	b
	 *	return (Float32Array[16]) 	m
	 */
	multiply: function( m, b ) {
		var a = m.slice();
		
		m[0] = a[0]*b[0] + a[1]*b[4] + a[2]*b[8] + a[3]*b[12];
		m[1] = a[0]*b[1] + a[1]*b[5] + a[2]*b[9] + a[3]*b[13];
		m[2] = a[0]*b[2] + a[1]*b[6] + a[2]*b[10] + a[3]*b[14];
		m[3] = a[0]*b[3] + a[1]*b[7] + a[2]*b[11] + a[3]*b[15];
		
		m[4] = a[4]*b[0] + a[5]*b[4] + a[6]*b[8] + a[7]*b[12];
		m[5] = a[4]*b[1] + a[5]*b[5] + a[6]*b[9] + a[7]*b[13];
		m[6] = a[4]*b[2] + a[5]*b[6] + a[6]*b[10] + a[7]*b[14];
		m[7] = a[4]*b[3] + a[5]*b[7] + a[6]*b[11] + a[7]*b[15];
		
		m[8] = a[8]*b[0] + a[9]*b[4] + a[10]*b[8] + a[11]*b[12];
		m[9] = a[8]*b[1] + a[9]*b[5] + a[10]*b[9] + a[11]*b[13];
		m[10]= a[8]*b[2] + a[9]*b[6] + a[10]*b[10] + a[11]*b[14];
		m[11]= a[8]*b[3] + a[9]*b[7] + a[10]*b[11] + a[11]*b[15];
		
		m[12]= a[12]*b[0] + a[13]*b[4] + a[14]*b[8] + a[15]*b[12];
		m[13]= a[12]*b[1] + a[13]*b[5] + a[14]*b[9] + a[15]*b[13];
		m[14]= a[12]*b[2] + a[13]*b[6] + a[14]*b[10] + a[15]*b[14];
		m[15]= a[12]*b[3] + a[13]*b[7] + a[14]*b[11] + a[15]*b[15];
		
		return m;
	},
	
	/** determinant
	 *
	 *	@param (Float32Array) m
	 *	return (Number)
	 */
	det: function ( m ) { 
		return 	m[0] * mat3.det([ m[5],m[9],m[13], m[6],m[10],m[14], m[7],m[11],m[15] ]) - 
				m[1] * mat3.det([ m[4],m[8],m[12], m[6],m[10],m[14], m[7],m[11],m[15] ]) + 
				m[2] * mat3.det([ m[4],m[8],m[12], m[5],m[9], m[13], m[7],m[11],m[15] ]) - 
				m[3] * mat3.det([ m[4],m[8],m[12], m[5],m[9], m[13], m[6],m[10],m[14] ])
	},
	
	/** transpose
	 *
	 *	@param (Float32Array[16]) 	m
	 *	return (Float32Array[16]) 	m
	 */
	transpose: function( m ) {
		var e = m.slice();
		
		m[1] = e[4];
		m[2] = e[8];
		m[3] = e[12];
		m[4] = e[1];
		m[6] = e[9];
		m[7] = e[13];
		m[8] = e[2];
		m[9] = e[6];
		m[11]= e[14];
		m[12]= e[3];
		m[13]= e[7];
		m[14]= e[11];
		
		return m
	},
	
	/** rotate
	 *
	 *	@param (Float32Array[16]) 	m
	 *	@param (Number) 			x
	 *	@param (Number) 			y
	 *	@param (Number) 			z
	 *	return (Float32Array[16]) 	m
	 */
	rotate: function( m, x, y, z ) {
		var e = m.slice(), s, c;
	
		if(x != 0) {
			x = x/180*Math.PI;
			s = Math.sin(x);
			c = Math.cos(x);
			
			mat4.multiply( m, [1,.0,.0,.0, .0,c,-s,.0, .0,s,c,.0, .0,.0,.0,1])
		}
		if(y != 0) {
			y = y/180*Math.PI;
			s = Math.sin(y);
			c = Math.cos(y);
			
			mat4.multiply( m, [c,.0,s,.0, .0,1,.0,.0, -s,.0,c,.0, .0,.0,.0,1])
		}
		if(z != 0) {
			z = z/180*Math.PI;
			s = Math.sin(z);
			c = Math.cos(z);
			
			mat4.multiply( m, [c,-s,.0,.0, s,c,.0,.0, .0,.0,1,.0, .0,.0,.0,1])
		}
		
		return m
	},
	
	/** inverse
	 *
	 *	@param (Float32Array[16]) 	m
	 *	@param (Float32Array[3]) 	vec
	 *	return (Float32Array[16]) 	m
	 */
	translate: function( m, vec ) {
		var mat = mat4.identity();
			mat[12] = vec[0];
			mat[13] = vec[1];
			mat[14] = vec[2];
			
		return mat4.multiply( m, mat )
	},
	
	/** scale
	 *
	 *	@param (Float32Array[16]) 	m
	 *	@param (Number) 			x
	 *	@param (Number) 			y
	 *	@param (Number) 			z
	 *	return (Float32Array[16]) 	m
	 */
	scale: function( m, x, y, z ) {
		if( y == undefined ) y = x;
		if( z == undefined ) z = x;
		
		var mat = mat4( mat4.IDENTITY );
			mat[0] = x;
			mat[5] = y;
			mat[10]= z;
		
		return mat4.multiply( m, mat )
	},
	
	/** inverse
	 *
	 *	@param (Float32Array[16]) 	m
	 *	return (Float32Array[16]) 	m
	 */
	inverse: function( m ) {
		var det = mat4.det( m );
	
		if( Math.abs( det ) < 1e-8 ) return m;
		var e = m.slice();
		
		m[0] =	mat3.det([ e[5],e[9],e[13], e[6],e[10],e[14], e[7],e[11],e[15] ])/det;
		m[1] = -mat3.det([ e[1],e[9],e[13], e[2],e[10],e[14], e[3],e[11],e[15] ])/det;
		m[2] =	mat3.det([ e[1],e[5],e[13], e[2],e[6],e[14], e[3],e[7],e[15] ])/det;
		m[3] = -mat3.det([ e[1],e[5],e[9], e[2],e[6],e[10], e[3],e[7],e[11] ])/det;
			
		m[4] = -mat3.det([ e[4],e[8],e[12], e[6],e[10],e[14], e[7],e[11],e[15] ])/det;
		m[5] =	mat3.det([ e[0],e[8],e[12], e[2],e[10],e[14], e[3],e[11],e[15] ])/det;
		m[6] = -mat3.det([ e[0],e[4],e[12], e[2],e[6],e[14], e[3],e[7],e[15] ])/det;
		m[7] =	mat3.det([ e[0],e[4],e[8], e[2],e[6],e[10], e[3],e[7],e[11] ])/det;
		  
		m[8] =	mat3.det([ e[4],e[8],e[12], e[5],e[9], e[13], e[7],e[11],e[15] ])/det;
		m[9] = -mat3.det([ e[0],e[8],e[12], e[1],e[9],e[13],  e[3],e[11],e[15] ])/det;
		m[10]=	mat3.det([ e[0],e[4],e[12], e[1],e[5],e[13], e[3],e[7],e[15] ])/det;
		m[11]= -mat3.det([ e[0],e[4],e[8], e[1],e[5],e[9],  e[3],e[7],e[11] ])/det;
			
		m[12]= -mat3.det([ e[4],e[8],e[12], e[5],e[9], e[13], e[6],e[10],e[14] ])/det;
		m[13]=	mat3.det([ e[0],e[8],e[12], e[1],e[9],e[13],  e[2],e[10],e[14] ])/det;
		m[14]= -mat3.det([ e[0],e[4],e[12], e[1],e[5],e[13], e[2],e[6],e[14] ])/det;
		m[15]=	mat3.det([ e[0],e[4],e[8], e[1],e[5],e[9],  e[2],e[6],e[10] ])/det;
		
		return m
	},
	
	/** lookat
	 *
	 *	@param (Float32Array[16]) 	m
	 *	@param (Float32Array[3]) 	eye
	 *	@param (Float32Array[3]) 	center
	 *	@param (Float32Array[3]) 	up
	 *	return (Float32Array[16])	m
	 */
	lookAt: function(m, eye, center, up) {
		var x, y, z,
			mat = mat4.identity();
		
		 if(Math.abs(eye[0] - center[0]) < 0.000001 &&
	        Math.abs(eye[1] - center[1]) < 0.000001 &&
	        Math.abs(eye[2] - center[2]) < 0.000001) {
	        return m
	    }
		
		z = eye.slice();
	
		vec3.sub( z, center );
		vec3.normalize( z );
		
		if(vec3.len( z ) === 0) z[2] = 1;
		
		x = vec3.cross( up, z );
		vec3.normalize( x );
		
		if(vec3.len(x) === 0) {
			z[2] += 0.0001;
			x = vec3.cross( up, z );
			vec3.normalize( x );
		}

		y = vec3.cross( z, x );
		vec3.normalize( y );
		
		mat[0] = x[0];
		mat[1] = x[1];
		mat[2] = x[2];
		
		mat[4] = y[0];
		mat[5] = y[1];
		mat[6] = y[2];
		
		mat[8] = z[0];
		mat[9] = z[1];
		mat[10]= z[2];
		
		mat[12]= -(x[0] * eye[0] + x[1] * eye[1] + x[2] * eye[2]);
	    mat[13]= -(y[0] * eye[0] + y[1] * eye[1] + y[2] * eye[2]);
	    mat[14]= -(z[0] * eye[0] + z[1] * eye[1] + z[2] * eye[2]);
		
		mat4.translate( mat, vec3.negate( eye.slice() ) );
		mat4.multiply( m, mat );
		
		return m
	}
	
});