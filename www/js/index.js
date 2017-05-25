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
			window.plugins.calendar.listCalendars(success,error);
		
		} catch(e) {
			log(e.stack);
		}
		
	}
	
	function newEvent() {
		event = 'createEventWithOptions';
		
		try {
			 // create an event silently (on Android < 4 an interactive dialog is shown which doesn't use this options) with options:
			var calOptions = window.plugins.calendar.getCalendarOptions(); // grab the defaults
			calOptions.firstReminderMinutes = 120; // default is 60, pass in null for no reminder (alarm)
			calOptions.secondReminderMinutes = 5;

			// Added these options in version 4.2.4:
			calOptions.recurrence = "monthly"; // supported are: daily, weekly, monthly, yearly
			calOptions.recurrenceEndDate = new Date(2017,6,1,0,0,0,0,0); // leave null to add events into infinity and beyond
			calOptions.calendarName = "My Cal Name"; // iOS only
			calOptions.calendarId = 5; // Android only, use id obtained from listCalendars() call which is described below. This will be ignored on iOS in favor of calendarName and vice versa. Default: 1.

			// This is new since 4.2.7:
			calOptions.recurrenceInterval = 2; // once every 2 months in this case, default: 1

			// And the URL can be passed since 4.3.2 (will be appended to the notes on Android as there doesn't seem to be a sep field)
		//	calOptions.url = "https://www.google.com";

			// on iOS the success handler receives the event ID (since 4.3.6)
			window.plugins.calendar.createEventWithOptions(
				'title','eventLocation','notes', new Date(2017,6,1), new Date(2017,6,2),calOptions,success,error);
			
		} catch (e) { 
			log(e.stack);
		}
	};
	
	document.addEventListener('deviceready', function() {
		
		newEvent();
		
	}, false);
	
}, false);


function color() {
	return 'rgb('+parseInt(256*Math.random())+','+parseInt(256*Math.random())+','+parseInt(256*Math.random())+')';
};
