window.addEventListener('load', function() {
	'use strict';
	
	var calendar,
		callback = function() { document.write( JSON.stringify( calendar ) ) }
	
	var div = document.body.get('div'),
		daily = div.get('#daily'),
		name = div.get('#name'),
		day = div.get('#day'),
		month = div.get('#month'),
		year = div.get('#year');
	
	div.get('#add').onclick = function() {
		
		var date = new Date(year.value, month.value, day.value);
		var rec = new Date(date);
		
		rec.setDate( rec.getDate() + daily );
		
		calendar.add(
				{title: name.value, location:'local', notes:'OBS ... ' },
				{type:'daily', end: rec },
				date, 
				function(e) { 
					alert('Evento: '+ JSON.stringify(e) + 'criado.' ); 
				});
		
	};
	
	div.get('#find').onclick = function() {
		
		var date = new Date(year.value, month.value, day.value);
		
		calendar.find(
				{title: name.value, location:'Local', notes:'OBS ... ' },
				date, 
				function(e) {
					alert('find: '  + JSON.stringify(e) );
				});
	};
	
	div.get('#remove').onclick = function() {
		
		var date = new Date(year.value, month.value, day.value);
		
		calendar.remove(
				{title: name.value, location:'Local', notes:'OBS ... ' },
				date, 
				function(e) {
					alert('remove: '  + JSON.stringify(e) );
				});
	};
	
	document.addEventListener('deviceready', function() {
		
		calendar = new Scheduler('Teste Calendar', function() {
			div.style.display = 'block';
		});
		
	}, false);
	
}, false);

function Scheduler(name, ready) {
	this.id = null;
	this.name = name;
	
	var THIS = this;
	
	/// 
	window.plugins.calendar.listCalendars(function(list) {
		/// varre a lista de calendarios e procura o id
		list.forEach(function(obj) {
			if(obj.name == THIS.name) THIS.id = obj.id;
		})
		
		/// se não tiver id, cria o calendario
		if(THIS.id == null) {
			
			var opt = window.plugins.calendar.getCreateCalendarOptions();
				opt.calendarName = THIS.name;
				opt.calendarColor = "#FF0000";
				
			window.plugins.calendar.createCalendar(opt, 
				function(id) {
					THIS.id = id;
					alert('Calendar create');
					ready();
				}, Scheduler.Error);
		
		/// se encotrar o id, o Scheduler esta preparado
		} else {
			ready();
		}
	}, Scheduler.Error);
};

Scheduler.Error = function(e) { alert( 'Scheduler ERROR: \n' + JSON.stringify(e) ) };

Scheduler.prototype.add = function(event, recurrence, date, callback) {
	try {
		
		var opt = window.plugins.calendar.getCalendarOptions(),
			start = new Date(date),
			finish = new Date(date);

		opt.recurrence = recurrence.type; //  daily, weekly, monthly, yearly
		opt.recurrenceEndDate = recurrence.end; 
		opt.recurrenceInterval = recurrence.interval || 1;
		
		opt.calendarName = this.name; // iOS only
		opt.calendarId = this.id; 
		
		start.setHours( 8 );
		finish.setHours( 9 );
		
		window.plugins.calendar.createEventWithOptions(
			event.title, event.location, event.notes, 
			start, finish, 
			opt, 
			callback, Scheduler.Error);
		
	} catch (e) { 
		log('/createEvent/ \n' + e.stack);
	}
};

Scheduler.prototype.remove = function(event, date, callback) {
	try {
		
		var start = new Date(date),
			finish = new Date(date);
		
			start.setHours( 8 );
			finish.setHours( 9 );
		
		window.plugins.calendar.deleteEvent(
			event.title, event.location, null,
			start, finish, 
			callback, Scheduler.Error);
				
	
	} catch (e) { 
		log('/findEvent/ \n' + e.stack);
	}
};

Scheduler.prototype.find = function(event, date, callback) {
	try {
		var start = new Date(date),
			finish = new Date(date);
			
			start.setHours( 8 );
			finish.setHours( 9 );
			
		window.plugins.calendar.findEvent(
			event.title, event.location, event.notes,
			start, finish, 
			callback, Scheduler.Error);
	
	} catch (e) { 
		log('/findEvent/ \n' + e.stack);
	}
};
