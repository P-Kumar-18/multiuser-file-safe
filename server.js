// imports & constants
const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const userFolder = path.join(__dirname, 'users_data', req.session.username);
		
		cb(null, userFolder);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});
const upload = multer({storage: storage});
const app = express();
const PORT = 3000;
const usersPath = path.join (__dirname, 'users.json');

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(session({
	secret: 'Gtofhioc_21nie3pcxnie_12f03n',
	resave: false,
	saveUninitialized: false
}));

// function
function makingUsers() {
	try {
		if (!fs.existsSync(usersPath)) {
			fs.writeFileSync(usersPath, JSON.stringify([], null, 2), 'utf-8');
			console.log('users.json was created.');
		}
	} catch (err) {
		console.error(`Error making file users.json: ${err}`);
	}
	
}

function loadingUsers() {
	try {
		return JSON.parse(fs.readFileSync('users.json', 'utf-8'));
	} catch (err) {
		console.error(`Error loading file users.json: ${err}`);
		return [];
	}
}

// get for static pages
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/dashboard', (req, res) => {
	if (req.session.username) {
		res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
	} else {
		res.redirect('/');
	}
});

// get for sessions
app.get('/userLogin', (req, res) => {
	if (req.session.username) {
		res.json({username: req.session.username});
	}
});

app.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if(err) {
			console.error(`Error loging out: ${err}`);
		} else {
			res.redirect('/');
		}
	})
});

// get for file hadling
app.get('/userFiles', (req, res) => {
	
	const userFiles = path.join(__dirname, 'users_data', req.session.username);
	
	if(!fs.existsSync(userFiles)) {
		return res.json([]);
	}
	
	const files = fs.readdirSync(userFiles);
	res.json(files);
});

// post 
app.post('/register', (req ,res) => {
	const {userName, password_1, password_2} = req.body;
	
	if (password_1 !== password_2){
		return res.send(`Passwords do not match.`);
	}
	
	const newUser = {
		username: userName,
		password: password_1
	};
	
	makingUsers();
	
	const users = loadingUsers();
	
	if (users.find(user => user.username === newUser.username)) {
		return res.send(`Name ${newUser.username} is already taken.`);
	}
	
	users.push(newUser);
	fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf-8');
	
	const newFolder = path.join(__dirname, 'users_data', newUser.username);
	if (!fs.existsSync(newFolder)) {
		fs.mkdirSync(newFolder, {recursive: true});
	};
	
	res.redirect('/');
});

app.post('/login', (req, res) => {
	const {userName_login, password_login} = req.body;
	const userLogin = {
		username: userName_login,
		password: password_login
	};	
	
	makingUsers();
	
	const users = loadingUsers();
	
	const matchedUser = users.find(user => 
		user.username === userLogin.username && user.password === userLogin.password
	);
	
	if (matchedUser) {
		req.session.username = userLogin.username;
		console.log(`Logged in as: ${req.session.username}`)
		res.redirect('/dashboard');
	} else {
		res.send(`Username and Password do not match.`);
	}
});

app.post('/fileUpload', (req, res, next) => {
	if (!req.session.username) {
		return res.redirect('/');
	}
	next();
	}, upload.single('newFile'), (req, res) => {
		console.log(`${req.file.originalname} uploaded by ${req.session.username}.`);
		res.redirect('/dashboard');
	});

// listening to port
app.listen(PORT);
console.log(`Server loaded successfully on ${PORT}`);
