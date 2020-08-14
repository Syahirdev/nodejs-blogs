const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Blog = require('./models/blog');

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

//blog routes
app.get('/blogs', (req, res) => {
	Blog.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			res.render('index', {
				title: 'All Blogs',
				blogs: result,
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

app.post('/blogs', (req, res) => {
	const blog = new Blog(req.body);
	blog.save()
		.then((result) => {
			console.log(result);
			res.redirect('/blogs');
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get('/blogs/create', (req, res) => {
	res.render('create', {
		title: 'Create New Blog',
	});
});

app.get('/blogs/:id', (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
		.then((result) => {
			res.render('details', { blog: result, title: 'Blog Details' });
		})
		.catch((err) => {
			console.log(err);
		});
});

app.delete('/blogs/:id', (req, res) => {
	const id = req.params.id;
	Blog.findByIdAndDelete(id)
		.then((result) => {
			res.json({ redirect: '/blogs' });
		})
		.catch((err) => {
			console.log(err);
		});
});

//404
app.use((req, res) => {
	res.status(404).render('404', {
		title: 'Error!',
	});
});
