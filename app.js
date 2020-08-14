const express = require('express');

//express app
const app = express();

app.set('view engine', 'ejs');
// app.set('views', 'myviews');

//listen for requests
app.listen(3000);

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
