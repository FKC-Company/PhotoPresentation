const Peer = window.Peer;
var localStream = null;
var isRecord = false;

(async function main()  {
	const localVideo = document.getElementById('js-local-stream');
	const remoteVideos = document.getElementById('js-remote-streams');
	const localText = document.getElementById('js-local-text');
	const sendTrigger = document.getElementById('js-send-trigger');
	const messages = document.getElementById('js-messages');

	if(isVideo.status)  {
		$("#nonoStream").hide();
		$("#js-local-stream").show().attr("src",isVideo.path);
		return;
	}

	var myPeerId_unique = myPeerId + "_" + Date.now();

	(async function()  {
		if(isCreater)  {
			$(this).attr("disabled", true).text('Loading...');

			localStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			}).catch((error) => {
				alert(error);
			});

			// Render local stream
			localVideo.muted = true;
			localVideo.srcObject = localStream;
			localVideo.playsInline = true;
			await localVideo.play().catch(console.error);

			if(isRecord)  {
				recordStart(localStream);
			}
		}
		else {
			$(this).attr("disabled", true).html('Loading...');
		}

		console.log({
			roomName : roomName,
			myPeerId : myPeerId_unique
		});

		$.post(constant.SKYWAY_USERAUTH_URL, {  // Server hvselt ilgeej shalgana
			peerId: myPeerId_unique,
			sessionToken: constant.SKYWAY_SESSION_TOKEN
		},openFn).fail(function()  {
			console.error('Peer Authentication Failed');
		});
	})();

	function openFn(credential) {
		var peer = new Peer(myPeerId_unique, {
			key: constant.SKYWAY_APIKEY,
			credential: credential,
			debug: 0
		});

		// Register join handler
		let interval = setInterval(function()  {
			if(!peer.open) {
				return;
			}

			console.log("start...");
			clearInterval(interval);
			startMeet(peer);
			
		}, 500);
  	}

	function startMeet(peer)  {
		// Note that you need to ensure the peer has connected to signaling server
		// before using methods of peer instance.
		const room = peer.joinRoom(roomName, {
			mode: 'sfu',
			stream: localStream
		});

		room.on('open', function()  {
			$("#nonoStream").hide();
			$("#js-local-stream").show();
			$("#recordingLamp").show();

			let statusMsg = isCreater 
			? "Started live streaming..." : "Started watching...";
			$("#statusMsg").text(statusMsg)
			.removeClass("bg-warning statusWarning").addClass("bg-success");
		});

		room.once('open', () => {
			messages.textContent += '=== You joined ===\n';
			console.log(messages.textContent);
		});

		room.on('peerJoin', peerId => {
			messages.textContent += `=== ${peerId} joined ===\n`;
			console.log(messages.textContent);
		});

		// Render remote stream for new peer join in the room
		room.on('stream', async stream => {// shine video
			const newVideo = document.querySelector('video');
			newVideo.srcObject = stream;
			newVideo.muted = true;
			await newVideo.play().catch(console.error);
		});

		room.on('data', ({ data, src }) => {
			// Show a message sent to the room and who sent
			messages.textContent += `${src}: ${data}\n`;
			console.log(messages.textContent);
		});

		// for closing room members
		room.on('peerLeave', peerId => {
			// const remoteVideo = remoteVideos.querySelector(
			// 	`[data-peer-id="${peerId}"]`
			// );
			// remoteVideo.srcObject.getTracks().forEach(track => track.stop());
			// remoteVideo.srcObject = null;
			// remoteVideo.remove();
			messages.textContent += `=== ${peerId} left ===\n`;
			console.log(messages.textContent);
		});

		// for closing myself
		room.once('close', () => {
			sendTrigger.removeEventListener('click', onClickSend);
			messages.textContent += '== You left ===\n';
			console.log(messages.textContent);
			Array.from(remoteVideos.children).forEach(remoteVideo => {
				remoteVideo.srcObject.getTracks().forEach(track => track.stop());
				remoteVideo.srcObject = null;
				remoteVideo.remove();
			});
		});

		sendTrigger.addEventListener('click', onClickSend);
		// leaveTrigger.addEventListener('click', () => room.close(), { once: true });

		function onClickSend() {
			// Send message to all of the peers in the room via websocket
			let textAreaObj = $("#js-local-text");
			let msg = textAreaObj.val().trim();
			room.send(msg);

			messages.textContent += `${peer.id}: ${localText.value}\n`;
			localText.value = '';
		}

		peer.on('error', console.error);
	}

})();

$("#js-local-text").keypress(function(e)  {
	if(e.keyCode == 13)  {
		e.preventDefault();

		if($(this).val().trim() === "")  {
			return;
		}

		$("#js-send-trigger").click();
		scrollSmoothToBottom("js-messages");
	}
});

function scrollSmoothToBottom (id)  {
	var div = document.getElementById(id);
	$('#' + id).animate({
		scrollTop: div.scrollHeight - div.clientHeight
	}, 200);
}
