

let mediaRecorder;
let recordedBlobs;
let isTimeOut;

function recordStart(localStream) {
	window.stream = localStream;
	startRecording();
} 

function handleDataAvailable(event)  {
	console.log('handleDataAvailable', event);
	if (event.data && event.data.size > 0)  {
		recordedBlobs.push(event.data);
	}
}

function startRecording()  {
	recordedBlobs = [];
	let options = {　mimeType: 'video/webm;codecs=vp9,opus'　};
	try  {
		mediaRecorder = new MediaRecorder(window.stream, options);
	} 
	catch(e)  {
		console.error('Exception while creating MediaRecorder:', e);
		return;
	}
	console.log('Created MediaRecorder', mediaRecorder, 'with options', options);

	mediaRecorder.onstop = (event) => {
		console.log("Stop....");

		var blob = new Blob(recordedBlobs, {type: 'video/mp4'});
		var fieldData = new FormData();
		fieldData.append('fname', 'test.mp4');
		fieldData.append('file', blob);
		$.ajax({
			type: 'POST',
			url: '/recordedVideoUpload',
			data: fieldData,
			processData: false,
			contentType: false
		}).done(function()  {
			console.log("Video Saved!");
		});
	};

	mediaRecorder.ondataavailable = handleDataAvailable;
	mediaRecorder.start();
	console.log('MediaRecorder started', mediaRecorder);

	isTimeOut = setTimeout(() => {
		mediaRecorder.stop();
		startRecording();
	}, 5000);
}

// window.addEventListener('beforeunload', (event) => {
// 	event.returnValue = `Are you sure you want to leave?`;
// 	console.log("asdf");
// });

window.onbeforeunload = function(event)  {
	console.log("refresh...");
	clearTimeout(isTimeOut);
	mediaRecorder.stop();
};

