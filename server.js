const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require  ('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'chromestar88',
    database : 'face'
  }
});



const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			password: 'cookies',
			email:'john@gmail.com',
			entries:0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			password: 'bananas',
			email:'sally@gmail.com', 
			entries:0,
			joined: new Date()
		}		
	],
	login:[ 
		{
			id: '987',
			hash: '',
			email: 'john@gmail.com'
		}
	]
}

app.get('/', (req, res) =>{
	res.send(database.users);
})

app.post('/signin', (req,res) =>{signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req,res) =>{register.handleRegister(req, res, db, bcrypt)})
	
	
	


app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req ,res, db)})

app.put('/image', (req, res) => {image.handleImage(req ,res ,db)})



// Load hash from your password DB.
//bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
//});
//bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
//});

app.listen(3001, () =>{
	console.log('app is running on port 3001');
})