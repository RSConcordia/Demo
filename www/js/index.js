window.addEventListener('load', function() {
	'use strict';
	
	var event;
	
	function success(e) {
		log('success: '+event+' <br> '+JSON.stringify(e));
	};
	function error(e) {
		log('success: '+event+' <br> '+JSON.stringify(e));
	};
	
	function log(message) {	
		document.body.create('div').write(message)
			.set({ style:{ width:'90%', padding:'5%', color: color() } });
	};
	
	function createCalendar() {
		event = 'createCalendar';
		
		try {
			
			var createCalOptions = window.plugins.calendar.getCreateCalendarOptions();
				createCalOptions.calendarName = "My Cal Name";
				createCalOptions.calendarColor = "#FF0000";
				
			window.plugins.calendar.createCalendar(createCalOptions,
				function(e) {
					success(e);
					list();
				},error);
		
		} catch(e) {
			log(e.stack);
		}
	}
	
	function list() { 
		event = 'list';
		
		try {	
			window.plugins.calendar.listCalendars(function(e) {
					success(e);
				},error);
		
		} catch(e) {
			log(e.stack);
		}
		
	}
	
	document.addEventListener('deviceready', function() {
		
		createCalendar();
		
	}, false);
	
}, false);


function color() {
	return 'rgb('+parseInt(256*Math.random())+','+parseInt(256*Math.random())+','+parseInt(256*Math.random())+')';
};
