// 예제 12-11 worker.js: 각 부분 연결하기

function run() {
    receive(function(err, message) {
	if (err) {
	    throw err;
	} else {
	    if (message === null) {
		console.log('nothing to do');
		setTimeout(run, 1000);
	    } else {
		console.log('process');
		process(message, function(err) {
		    if (err) {
			throw err;
		    } else {
			acknowledge(message, function(err) {
			    if (err) {
				throw err;
			    } else {
				console.log('done');
				setTimeout(run, 1000);
			    }
			});
		    }
		});
	    }
	}
    });
}

run();
