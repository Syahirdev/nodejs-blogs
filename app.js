const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
//express app
const app = express();

app.set('view engine', 'ejs');
// app.set('views', 'myviews');

//middlewares
const dbURI = 'mongodb+srv://admin:adminonly@cluster0.rmwim.mongodb.net/blogs_db?retryWrites=true&w=majority';
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		//listen for requests
		app.listen(3000);
		console.log('Connected to DB');
	})
	.catch((err) => {
		console.log(err);
	});

app.use(express.static('public'));

app.use(morgan('dev'));

//routes
app.get('/', (req, res) => {
	const blogs = [
		{ title: 'Blog Syahir', snippet: 'This is the snippet title for blog Syahir' },
		{ title: 'Blog Syazmi', snippet: 'This is the snippet title for blog Syazmi' },
		{ title: 'Blog Syakira', snippet: 'This is the snippet title for blog Syakira' },
	];

	res.render('index', {
		title: 'Home',
		blogs,
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
	});
});

app.get('/blogs/create', (req, res) => {
	res.render('create', {
		title: 'Create New Blog',
	});
});

//404
app.use((req, res) => {
	res.status(404).render('404', {
		title: 'Error!',
	});
});
