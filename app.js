const express = require('express');

//express app
const app = express();

app.set('view engine', 'ejs');
// app.set('views', 'myviews');

//listen for requests
app.listen(3000);

app.get('/', (req, res) => {
	// res.send('<p>Hello :D</p>');
	res.render('index');
});

app.get('/about', (req, res) => {
	// res.send('<p>Hello :D</p>');
	res.render('about');
});

//redirect to about page
app.get('/about-us', (req, res) => {
	res.redirect('/about');
});

//404
app.use((req, res) => {
	res.status(404).render('404');
});
