window.addEventListener('load', function() {
	'use strict';
	
	var date = new Date(2017, 4, 26, 0, 0, 0, 0),
		d = new Date(date);
	
	document.body.create('p').write( d );
	
	d.setDate( d.getDate() + 2 );
	d.setHours( 7 );
	
	document.body.create('p').write( d );
	
	var calendar,
		callback = function() { document.write( JSON.stringify( calendar ) ) }
	
	var div = document.body.get('div'),
		daily = div.get('#daily'),
		name = div.get('#name'),
		day = div.get('#day'),
		month = div.get('#month'),
		year = div.get('#year');
	
	div.get('#add').onclick = function() {
		
		var date = new Date(year.value, month.value, day.value, 0, 0, 0, 0);
		
		document.body.create('p').set({ style:{ textAlign: 'center' } })
			.write( '/************************************************/' );
		
		document.body.create('p').write( 'add : ' + name.value );
		document.body.create('p').write( 'new event: ' + date );
		
		Scheduler.add(
				{title: name.value, location:'local', notes:'OBS ... ' },
				date, 
				function(e) { 
					alert('Evento: '+ JSON.stringify(e) + 'criado.' ); 
				});
		
	};
	
	div.get('#add-opt').onclick = function() {
		
		var date = new Date(year.value, month.value, day.value, 0, 0, 0, 0);
		var recurrence = new Date(date);
		
		recurrence.setDate( date.getDate() + parseInt(daily.value) );
		recurrence.setHours( 8 );
		
		document.body.create('p').set({ style:{ textAlign: 'center' } })
			.write( '/************************************************/' );
		
		document.body.create('p').write( 'Opt : ' + name.value );
		document.body.create('p').write( 'new event: ' + date );
		document.body.create('p').write( 'recurrence: ' + recurrence );
		
		calendar.addOpt(
				{title: name.value, location:'local', notes:'OBS ... ' },
				{type:'daily', end:recurrence, interval: 1 },
				date, 
				function(e) { 
					alert('Evento: '+ JSON.stringify(e) + 'criado.' ); 
				});
		
	};
	
	div.get('#add-inter').onclick = function() {
		
		var date = new Date(year.value, month.value, day.value, 0, 0, 0, 0);
		
		document.body.create('p').set({ style:{ textAlign: 'center' } })
			.write( '/************************************************/' );
		
		document.body.create('p').write( 'Inter : ' + name.value );
		document.body.create('p').write( 'new event: ' + date );
		
		Scheduler.addInter(
				{title: name.value, location:'local', notes:'OBS ... ' },
				date, 
				function(e) { 
					alert('Evento: '+ JSON.stringify(e) + 'criado.' ); 
				});
		
	};
	
	div.get('#add-full').onclick = function() {
		
		var date = new Date(year.value, month.value, day.value, 0, 0, 0, 0);
		var recurrence = new Date(date);
		
		recurrence.setDate( date.getDate() + parseInt(daily.value) );
		recurrence.setHours( 8 );
		
		document.body.create('p').set({ style:{ textAlign: 'center' } })
			.write( '/************************************************/' );
		
		document.body.create('p').write( 'Full : ' + name.value );
		document.body.create('p').write( 'new event: ' + date );
		document.body.create('p').write( 'recurrence: ' + recurrence );
		
		calendar.addOptInter(
				{title: name.value, location:'local', notes:'OBS ... ' },
				{type:'daily', end:recurrence, interval: 1 },
				date, 
				function(e) { 
					alert('Evento: '+ JSON.stringify(e) + 'criado.' ); 
				});
		
	};
	
	div.get('#find').onclick = function() {
		
		var date = new Date(year.value, month.value, day.value);
		
		Scheduler.find(
				{title: name.value, location:'Local', notes:'OBS ... ' },
				date, 
				function(e) {
					alert('find: '  + JSON.stringify(e) );
				});
	};
	
	div.get('#remove').onclick = function() {
		
		var date = new Date(year.value, month.value, day.value);
		
		Scheduler.remove(
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

Scheduler.prototype.addOpt = function(event, recurrence, date, callback) {
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
		log('/addOpt/ \n' + e.stack);
	}
};

Scheduler.prototype.addOptInter = function(event, recurrence, date, callback) {
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
		
		window.plugins.calendar.createEventInteractivelyWithOptions(
			event.title, event.location, event.notes, 
			start, finish, 
			opt, 
			callback, Scheduler.Error);
		
	} catch (e) { 
		log('/addOptInter/ \n' + e.stack);
	}
};

Scheduler.Error = function(e) { alert( 'Scheduler ERROR: \n' + JSON.stringify(e) ) };

Scheduler.add = function(event, date, callback) {
	try {
		
		var start = new Date(date),
			finish = new Date(date);
		
		start.setHours( 8 );
		finish.setHours( 9 );
		
		// create an event silently (on Android < 4 an interactive dialog is shown)
		window.plugins.calendar.createEvent(
			event.title, event.location, event.notes, 
			start, finish, 
			callback, Scheduler.Error);
		
	} catch (e) { 
		log('/add/ \n' + e.stack);
	}
};

Scheduler.addInter = function(event, date, callback) {
	try {
		var start = new Date(date),
			finish = new Date(date);

		start.setHours( 8 );
		finish.setHours( 9 );
		
		window.plugins.calendar.createEventInteractively(
			event.title, event.location, event.notes, 
			start, finish, 
			callback, Scheduler.Error);
			
	} catch (e) { 
		log('/addInter/ \n' + e.stack);
	}
};

Scheduler.remove = function(event, date, callback) {
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

Scheduler.find = function(event, date, callback) {
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
