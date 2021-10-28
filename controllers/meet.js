
const fs = require('fs');
const { m_event, m_set } = require("../models");

const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const isImage = require('is-image');

exports.index = (req, res) => {
	return res.render('index', {
		_SERVER_ : process.env.SERVER_DOMAIN
	});
};

exports.login = (req, res) => {
	res.render('login');
};

exports.lists = async (req, res)  => {  // neriig solih
	const EventRows = await m_event.findAll();
	return res.render('meet/lists',{
		EventRows: EventRows
	});
};

exports.registerWin = async(req, res) => {
	// if(!req.session.user)  {
	// 	return res.status(401).redirect("/login");
	// }

	console.log("register")

	return res.render('meet/meetRegisterWin', null);

}

exports.createRoom = async (req, res) =>  {
	if(!req.session.user)  {
		return res.status(401).redirect("/login");
	}

	const userId = req.session.user.user_id;
	const resEvent = await m_event.findOne({ where: { user_id: userId } });

	// Herwee omno oroo uuseed orhison bol...
	if(resEvent !== null)  {
		let eventId = resEvent.event_id;
		let roomName = resEvent.room_name;
		let isVideo = resEvent.is_video;

		req.session.eventId = eventId;
		const eventRow = await m_event.findOne({ where: { event_id: eventId } });
		let dataRootFolerName  = eventRow.folder_name;

		req.session.eventFolderNameFullPath = './public/data/'+ dataRootFolerName;
		req.session.eventFolderDataPath = '/data/'+ dataRootFolerName;

		let dataFullPath = req.session.eventFolderNameFullPath;
		let dataPath = req.session.eventFolderDataPath;

		let proPicPath = fs.readdirSync(dataFullPath + '/profilePicture');
		let dataObj = {
			role: "Creater",
			isCreater: true, 
			message: 'Already',
			yourName: 'Hoster',
			eventId : eventId,
			isVideo : JSON.stringify({"status": false}),
			roomName: roomName,
			profilePicPath: dataPath + '/profilePicture/' + proPicPath,
			_SERVER_ : process.env.SERVER_DOMAIN
		}

		if(isVideo)  {
			let videoPath = fs.readdirSync(dataFullPath + '/video');
			dataObj.isVideo = JSON.stringify({
				"status": true,
				"path": dataPath + "/video/" + videoPath
			});
		}

		return res.render('meet/meetRoom', dataObj);
	}

	// Shineer oroo vvsgene-----------------------------.
	let newRoomName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
	let unixTimestamp = Math.floor(new Date().getTime()/1000);
	let newFolerName = 'meet_'+ unixTimestamp + "_" + userId;

	req.session.eventFolderNameFullPath = './public/data/' + newFolerName;
	req.session.eventFolderDataPath = '/data/'+ newFolerName;

	let dataFullPath = req.session.eventFolderNameFullPath;
	let dataPath = req.session.eventFolderDataPath;

	fs.mkdir(dataFullPath, (err) => {
		if (err) {
			return console.error(err);
		}
		console.log('Directory created successfully!');
	});

	// DB insert ------------------


	/* ene deer joohon hiih ym bgaa  !!!!!*/

	// eventTable.user_id = userId;
	// eventTable.room_name = newRoomName;
	// eventTable.folder_name = newFolerName;
	// await eventTable.insert();
	// let newEventId = eventTable.event_id;
	// eventTable.event_id = newEventId;
	// req.session.eventId = newEventId;

	let proPicPath = fs.readdirSync(dataFullPath + '/profilePicture');
	if(newEventId > 0)  {
		console.log("New room created...");
		return res.render('meet/meetRoom',{
			role: "Creater",
			isCreater: true, 
			message: 'Create a meeting room',
			yourName: 'Hoster',
			eventId : newEventId,
			roomName: newRoomName,
			profilePicPath: dataPath  + '/profilePicture/' + proPicPath,
			_SERVER_ : process.env.SERVER_DOMAIN
		});
	}
};

exports.joinRoom = async (req, res) => {
	let { yourName, roomName } = req.body;

	const resEvent = await m_event.findOne({ where: { room_name: roomName } });
	if(resEvent === null)  {
		return res.render('meet/join', {
			status: 'warning',
			message: 'No such room found'
		});
	}

	let eventId = resEvent.event_id;
	let dataRootFolerName  = resEvent.folder_name;
	let isVideo = resEvent.is_video;

		req.session.eventFolderNameFullPath = './public/data/' + dataRootFolerName;
		req.session.eventFolderDataPath = '/data/'+ dataRootFolerName;

	let dataFullPath = req.session.eventFolderNameFullPath;
	let dataPath = req.session.eventFolderDataPath;

	let proPicPath = fs.readdirSync(dataFullPath + '/profilePicture');
	let dataObj = {
		role: "Joiner",
		isCreater: false, 
		message: 'Joined',
		eventId: eventId,
		roomName: roomName,
		yourName: yourName,
		isVideo : JSON.stringify({"status": false}),
		profilePicPath: dataPath + '/profilePicture/' + proPicPath,
		_SERVER_ : process.env.SERVER_DOMAIN
	}

	if(isVideo)  {
		let videoPath = fs.readdirSync(dataFullPath + '/video');
		dataObj.isVideo = JSON.stringify({
			"status": true,
			"path":  dataPath + "/video/" + videoPath
		});
	}

	return res.render('meet/meetRoom', dataObj);
};

exports.joinWin = (req, res) => {
	let { urlJoin, roomName, yourName }  = req.query;

	urlJoin = parseInt(urlJoin);
	if(!urlJoin) {
		return res.render('meet/join');
	}

	res.render('meet/join', {
		"isUrlJoin": urlJoin,
		"roomName": roomName, 
		"yourName": yourName
	});
};

exports.set = async (req, res) => {
	let { eventId } = req.body;

	const resSet = await m_set.findAll({ where: { event_id: eventId } });
	res.json({
		status: "success",
		resSet: JSON.stringify(resSet)
	});
};

exports.files = async (req, res) => {
	let { eventId, setFolderName } = req.body;
	const eventRow = await m_event.findOne({ where: { event_id: eventId } });

	const dataPath = "/data/"+eventRow.folder_name+'/'+setFolderName;
	const publicPath = "public/"+dataPath;

	let fileNames;

	try {
		fileNames = fs.readdirSync(publicPath +'/slideData');
	}
	catch (err)  {
		// console.log("error -------------------");

		// return res.render('meet/meetRoom',{
		// 	status: 404,
		// 	message: 'Create a meeting room'
		// });
	}

	async function readFile(path)  {
		return new Promise((resolve, reject) => {
		  	fs.readFile(path, 'utf8', function (err, data) {
			 	if(err) reject(err);
			 	resolve(data);
		  	});
		});
	}

	let descriptionTxt = await readFile(publicPath + '/description/description.txt');
	let mainPic = eventRow.folder_name +'/'+setFolderName+'/main/'+ fs.readdirSync(publicPath +'/main')[0];
	let proPic = eventRow.folder_name +'/'+setFolderName+'/profilePicture/'+ fs.readdirSync(publicPath +'/profilePicture')[0];
	let marqueeTxt = await readFile(publicPath + '/marqueeTxt/marquee.txt');

	async function files() {
		let filesObjects = [];
	
		await Promise.all(
		  fileNames.map(async (file) => {
			let filePath = dataPath + "/slideData/" + file;
			let fileName = file.split(".")[0];
			let fileExt = file.split(".")[1];
			let data;
	
			if (isImage(filePath) || fileExt === "mp4") {
			  data = {
				path: dataPath + "/slideData/" + file,
				thumbnailPath: dataPath + "/slideThumbnail/thumb_" + file,
				fileName: file,
				txt: "Data Not Found",
				fileType: fileExt === "mp4" ? "video" : "picture",
			  };
	
			  try {
				if (fs.existsSync(publicPath + "/slideData/" + fileName + ".txt")) {
				  data.txt = await readFile(
					publicPath + "/slideData/" + fileName + ".txt"
				  );
				}
			  } catch (err) {
				console.error(err);
			  }
			  filesObjects.push(data);
			}
		  })
		);

	    //fileName eer erembelneee 
		filesObjects.sort((a,b)=>{
			return parseInt(a.fileName.split('.')[0]) - parseInt(b.fileName.split('.')[0]);
		});

		return filesObjects;
	  }

	let filesObjs = await files();

	res.json({
		status: "success",
		mainPicPath: mainPic,
		marqueeTxt: marqueeTxt,
		proPic: proPic,
		descriptionTxt: descriptionTxt,
		filesObjects: JSON.stringify(filesObjs)
	});
};

exports.upload = async (req, res) =>  {

	if(!req.session.user)  {
		return res.status(401).redirect("/login");
	}

	let { eventId } = req.query;
	const resSet = await m_set.findAll({ where: { event_id: eventId } });

	res.render('upload', {
		status: "success",
		eventId: eventId,
		resSet: JSON.stringify(resSet)
	});
}

exports.uploadData = async (req, res) =>  {
	const storage = multer.diskStorage({
		destination: async function(req, file, callback)  {
			let { setNameId } = req.body;
			const resSet = await m_set.findAll({ where: { set_id: setNameId } });

			let eventId = resSet.event_id;
			let setFolderName = resSet.folder_name;
			const resEvent = await m_event.findAll({ where: { event_id: eventId } });

			let eventFolderName = resEvent.folder_name;
			let dirFolder = './public/data/'+ eventFolderName +'/'+ setFolderName +'/slideData';
			if (!fs.existsSync(dirFolder)) {
				fs.mkdirSync(dirFolder);
			}
			callback(null, dirFolder);
		},
		filename: function (req, file, cb) {
			cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
		}
	});

	//Check file type
	var upload = multer(	{ 
		storage : storage,
		fileFilter: function (req, file, cb)  {
			const filetypes = /jpeg|jpg|png|gif/;
			const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
			const mimetype = filetypes.test(file.mimetype);
			if(mimetype && extname)  {
				return cb(null, true);
			}
			else {
				cb("Error: Images only!");
			}
		}
	}).array('myImage',10);

	upload(req, res, async (err) => {
		if(err)  {
			res.render('upload', {
				msg: err
			});
		}
		else {			
			let { setNameId } = req.body;
		

			if(req.files > 0)  {
				res.render('upload', {
					msg: "Error: No File Selected!"
				});
			}
			else  {

	
				const resSet = await m_set.findAll({ where: { set_id: setNameId } });
				let eventId = resSet.event_id;
				let setFolderName = resSet.folder_name;


				const resEvent = await m_set.findAll({ where: { event_id: eventId } });
				let eventFolderName = resEvent.folder_name;

				let dirThumbFolder = './public/data/'+ eventFolderName +'/'+ setFolderName +'/slideThumbnail';
				if (!fs.existsSync(dirThumbFolder)) {
					fs.mkdirSync(dirThumbFolder);
				}

				await req.files.map(async function(item)  {
					// await sharp("./public/data/"+ eventFolderName +"/"+ setFolderName +"/slideData/"+item.filename)
					// // .resize(300,300)
					// .toFile("./public/data/"+ eventFolderName +"/"+ setFolderName +"/slideThumbnail/thumb_"+ item.filename);


					await sharp("./public/data/"+ eventFolderName +"/"+ setFolderName +"/slideData/"+item.filename)
						.resize({ height: 200 })
						.toFile("./public/data/"+ eventFolderName +"/"+ setFolderName +"/slideThumbnail/thumb_"+ item.filename);
				});

				res.render('upload', {
					msg: "File Uploaded!"
				});
			}
		}
	});
}

exports.recordedVideoUpload = (req, res, next) =>  {
	req.upload(req, res, (err) => {
		if(err)  {
			console.log(err);
		}
	});

	res.json({
		status: "success"
	});
}
