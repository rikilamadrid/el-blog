const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const Blog = require('./models/blogs');
const blogRoutes = require('./routes/blogRoutes');


// express app
const app = express();

// connec to mongo db
const dbURI = 'mongodb+srv://rikilamadrid:boricua23@mernnetninja.wh0g7.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('connected to db');
    // listen for request
    app.listen(5555);
  })
  .catch((error) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // for accepting form data into body req
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new blog 2',
//     snippet: 'abou the new blogs',
//     body: 'more more more about new blog'
//   });

//   blog.save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//   .then((result) => {
//     res.send(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// })

// app.get('/single-blog', (req, res) => {
//   Blog.findById('5ef381ed668ca3414c772f20')
//   .then((result) => {
//     res.send(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// })

// routes

// app.get('/', (req, res) => {
//   res.sendFile('./views/index.html', { root: __dirname });
// });

// app.get('/about', (req, res) => {
//   res.sendFile('./views/about.html', { root: __dirname });
// });

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// 404
// app.use((req, res) => {
//   res.status(404).res.sendFile('./views/404.html', { root: __dirname });
// });

// blog routes
app.use('/blogs', blogRoutes)

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});