let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

// app config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
// Mongoose setup
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});

let Blog = mongoose.model("Blog", blogSchema);

Blog.create({
    title: 'test',
    image: 'https://images.unsplash.com/photo-1532510987384-6a8118ab6ab2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b4a201bfb3f3bd0d0b527cf6d0f15a9a&auto=format&fit=crop&w=1308&q=80',
    body: 'this is a test blog post.'
});
// restful routes
app.get('/', function (req, res) {

    res.redirect('/blogs');
});

app.get('/blogs', function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                blogs: blogs
            });
        }
    });
});


app.listen(1000, function (req, res) {
    console.log('Server started');
});