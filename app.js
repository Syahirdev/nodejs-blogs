const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

//databases
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

//midlewares
app.use(express.static('public')); //for access public folder
app.use(express.urlencoded({ extended: 200 })); //for accepting form data POST/PUT
app.use(morgan('dev')); //for key logger

//mongoose sandbox routes
app.get('/add-blog', (req, res) => {
	const blog = new Blog({
		title: 'Second test Blog',
		snippet: 'this is the second snippet',
		body: 'this is the second body!',
	});
	blog.save()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get('/all-blogs', (req, res) => {
	Blog.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get('/single-blog', (req, res) => {
	Blog.findById('5f36785181ff4b0828b63108')
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

//routes
app.get('/', (req, res) => {
	res.redirect('blogs');
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
	});
});

//blog Routes
app.use('/blogs', blogRoutes);

//404
app.use((req, res) => {
	res.status(404).render('404', {
		title: 'Error!',
	});
});
