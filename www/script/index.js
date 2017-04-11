Element.prototype.create = function(t, e) {
	e = document.createElement(t);
	this.appendChild(e);
	return e;
};
Element.prototype.clear = function() {
	do { 
		if(this.childNodes[0]) {
			this.childNodes[0].remove();
		}
	} while(this.childNodes.length > 0);
	return this;
};
Element.prototype.remove = function() {
	if(this.parentNode) {
		this.parentNode.removeChild(this);
	}
};
Element.prototype.write = function(t) { this.appendChild( document.createTextNode(t) ); return this };
Element.prototype.get = function(e) { return document.querySelector(e) };
Element.prototype.getAll = function(e) { return document.querySelectorAll(e) };
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
	return THIS;
};