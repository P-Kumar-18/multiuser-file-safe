const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const app = express();
const PORT = 3000;

const usersPath = path.join (__dirname, 'users.json');


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(session({
	secret: 'Gtofhioc_21nie3pcxnie_12f03n',
	resave: false,
	saveUnitialized: false
}));

function loadingUsers() {
	let users = [];
	return JSON.parse(fs.readFileSync('users.json'));
}

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.post('/register', (req ,res) => {
	const {userName, password_1, password_2} = req.body;
	
	if (password_1 !== password_2){
		return res.send(`Passwords do not match.`);
	}
	
	const newUser = {
		username: userName,
		password: password_1
	};
	
	if (!fs.existsSync(usersPath)) {
		fs.writeFileSync(usersPath, JSON.stringify([], null, 2), 'utf-8');
		console.log('users.json was created.');
	}
	
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
	const users = loadingUsers();
	
	const matchedUser = users.find(user => 
		user.username === userLogin.username && user.password === userLogin.password
	);
	
	if (matchedUser) {
		req.session.username = userLogin.username;
		console.log(`Logged in as: ${req.session.username}`)
		res.redirect('/dashboard');
	} else {
		res.send (`Username and Password do not match.`);
	}
});

app.get('/userLogin', (req, res) => {
	if (req.session.username) {
		res.json({username: req.session.username});
	}
});

app.get('/dashboard', (req, res) => {
	if (req.session.username) {
		res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
	} else {
		res.redirect('/');
	}
});
app.listen(PORT);
console.log(`Server loaded successfully on ${PORT}`);