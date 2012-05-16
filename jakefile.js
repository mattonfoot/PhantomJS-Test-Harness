
// npm install jake -g
// npm install glob

desc('Run the JavaScript tests only')
task('default', ['alltests:js'], function() {

});

namespace('alltests', function () {
	
	/*
	phantomTask({
		script: './lib/phantomjs-runner.js',
		output: './TestResults',
		inputs: './*-/*.{test,spec}.htm',
	});
	*/

	task('js', function() {
		var command = './lib/PhantomJS-Master/phantomjs.exe';
		var params = [];
		
		params.push('./lib/phantomjs-runner.js'); // script
		params.push('./TestResults'); // output
				
		var g = new require("glob").Glob('./tests/*.test.htm');
				
		g.on('end', function(files) {
			files.forEach(function(file) {
				params.push( file );
			});
			
			phantomTestRunnerTask(command, params);
		});
	}, { async: true });
	
});

function phantomTestRunnerTask(command, params) {
	var phantom_task = require('child_process').execFile(command, params);

	phantom_task.stderr.on('data', function (data) {
		fail( data );
	});

	phantom_task.stdout.on('data', function (data) {
		console.log( data );
	});

	phantom_task.on('exit', function (code, signal) {
		if (code === 0) {
			complete();
			return;
		}
		
		fail('PhantomTask exited with code ' + code);
	});
	
}