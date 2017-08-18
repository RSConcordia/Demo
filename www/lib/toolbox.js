/** toolBox
 *
 */
function toolBox() {
	
	var box = document.body.create('span'),
		arrow = box.create('span'); ///~ Arrow
		
	box.className = 'toolbox';
	box.style.left = '-200px';
	
	box.create('button').set({
		className: 'fa fa-close red',
		onclick: function() {
			box.style.left = '-200px';
		}
	});
	
	/** toolBox.add
	 *
	 *	@param (String)	classname
	 *	@param (Function)	event
	 *	return (Element)
	 */
	function add( classname, event ) {
		return box.create('button', 1).set({
			className: classname,
			onclick: event
		})
	};
	
	/** toolBox.display
	 *
	 *	@param (String)	target
	 *	@param (Number)	top
	 *	@param (Number)	left
	 */
	function display( target, top, left ) {
		box.dataset.target = target;
		box.style.top = top + 'px';
		box.style.left = left + 'px';
	};
	
	/** toolBox.remove
	 */
	function remove() {
		box.remove();
		delete this
	};
	
	/** toolBox.point
	 *
	 *	@param (Number)	left
	 */
	function point( left ) {
		arrow.style.left = left;
	};
	
	Object.assign( this, {
		add: add,
		point: point,
		display: display,
		remove: remove
	})
};