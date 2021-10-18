
const fs = require('fs');
const multer = require('multer');
// const SetDao = require("../models/setModel");

exports.recordedVideoUpload = (req, res, next) =>  {
   var storage = multer.diskStorage({
      destination: function (req, file, cb)  {
         let dataFullPath = req.session.eventFolderNameFullPath;
			let dirFolder = dataFullPath + '/recordVideos/';
			if (!fs.existsSync(dirFolder)) {
				fs.mkdirSync(dirFolder);
			}
			cb(null, dirFolder);
      },
      filename: function (req, file, cb)  {
         cb(null, Date.now() + '.mp4') //Appending .jpg
      }
   });

   let upload = multer({ storage: storage }).single('file');
   req.upload = upload;
   next();
}

exports.pictureUpload = (req, res) =>  {
   const storage = multer.diskStorage({
      destination: async function(req, file, callback)  {
         let { setNameId } = req.body;
         
         let setTableDao = new SetDao();
         setTableDao.set_id = setNameId;
         let resSet = await setTableDao.search();
         let eventId = resSet[0].event_id;
         let setFolderName = resSet[0].folder_name;

         eventTable.event_id = eventId;
         let resEvent = await eventTable.search();
         let eventFolderName = resEvent[0].folder_name;
         let dirFolder = './public/data/'+ eventFolderName +'/'+ setFolderName +'/slideData';
         if(!fs.existsSync(dirFolder))  {
            fs.mkdirSync(dirFolder);
         }
         callback(null, dirFolder);
      },
      filename: function (req, file, cb)  {
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
   }).array('myImage',20);

   // res.uploadData = upload;   
   // next();

   console.log(res);


   return upload;
}
