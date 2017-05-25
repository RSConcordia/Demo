/*! 
 *	create
 *
 *	@param {String}	e		tag
 *	return {Element}
 */
Element.prototype.create = function(e) {
	e = document.createElement(e);
	this.appendChild(e);
	return e
};
/** 
 *	clear
 *
 *	return {Element}
 */
Element.prototype.clear = function() {
	do {
		if(this.childNodes[0]) {
			this.childNodes[0].remove();
		}
	} while(this.childNodes.length > 0);
	return this
};
/**
 *	remove
 */
Element.prototype.remove = function() {
	if(this.parentNode) {
		this.parentNode.removeChild(this);
	}
};
/**
 *	write
 *	
 *	@param {String}	e
 *	return {Element}
 */
Element.prototype.write = function(e) { 
	this.appendChild( document.createTextNode(e) ); 
	return this 
};
/**
 *	write
 *	
 *	@param {String}	e	tagName | id | class
 *	return {Element}
 */
Element.prototype.get = function(e) { 
	return document.querySelector(e) 
};
/**
 *	write
 *	
 *	@param {String}	e	tagName | id | class
 *	return {Element}
 */
Element.prototype.getAll = function(e) { 
	return document.querySelectorAll(e) 
};
/**
 *	write
 *	
 *	@param {Object}	att	
 *	return {Element}
 */
Element.prototype.set = function(att) {
	var THIS = this;
	
	Object.keys(att).forEach(function(item) {
		if(typeof att[item] == 'object') {
			Object.keys(att[item]).forEach(function(subkey) {
				THIS[item][subkey] = att[item][subkey];
			});
		} else {
			THIS[item] = att[item];
		}
	});
	return THIS
};