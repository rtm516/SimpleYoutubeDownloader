const express = require('express')
const path = require('path');

const app = express()
var port = 3000

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

var api = require('./routes/api');
app.use('/api', api);

var index = require('./routes/index');
app.use('/', index);


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.render('error', {status:err.status, message:err.message});
});


app.listen(port, () => console.log(`App listening on port ${port}!`))