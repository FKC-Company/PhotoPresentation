
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const hbs = require('hbs');
const fs = require("fs");


dotenv.config({path: "./.env" });

const app = express();
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// ParseURL - encode bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());
app.use(session({ 
		secret:"asfasdfasdfasfdasdfas",
		resave: false,
		saveUninitialized: true
	})
);

//--------------------------------------------------
// const db = require("./models");
// const { m_users } = require("./models");

// m_users.findAll()
// 	.then((users)=>{
// 		console.log(users)
// 	}).catch((err) => {
// 		console.log(err);
// 	});

//--------------------------------------------------

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Define Routes
app.use('/', require('./routes/meet'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));


app.use((req,res)=>{
	res.status(404).render('404');
});

let recordVideosFolder = './public/data/meet_1617675350_1/recordVideos/';
if (!fs.existsSync(recordVideosFolder)) {
	fs.mkdirSync(recordVideosFolder);
}

let dirFolder = './public/data/meet_1617675350_1/set1/slideData';
if (!fs.existsSync(dirFolder)) {
	fs.mkdirSync(dirFolder);
}

let dirThumbFolder = './public/data/meet_1617675350_1/set1/slideThumbnail';
if (!fs.existsSync(dirThumbFolder)) {
	fs.mkdirSync(dirThumbFolder);
}

app.listen(5000, () => {
	console.log("Server started on port 5000");
});

var livereload = require('livereload');
var server = livereload.createServer({
	exts:['js','css','hbs']
});
server.watch(path.join(__dirname, 'views'));
server.watch(path.join(__dirname, 'public'));
server.watch(path.join(__dirname));

