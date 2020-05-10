var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var RadioModel = require('./models/radioModel.js')

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/radio', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

app.set("view engine", "ejs");

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; // port番号を指定

var router = require('./routes/');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/stop', (req, res) => {
    console.log("stopped");
    const exec = require('child_process').exec;
    exec('killall mplayer');
    res.status(200).send()
});

app.get('/play', (req, res) => {
    console.log(req.query);
    if (req.query.url) {
        const exec = require('child_process').exec;
        exec('killall mplayer', () => {
            const spawn = require('child_process').spawn;
            spawn('mplayer', ['-playlist', req.query.url], {
                stdio: 'ignore',
                detached: true,
                env: process.env,
            }).unref();
        })
    }
    res.status(200).send();
});

app.use('/api/', router);

app.use((req,res,next)=>{
    res.status(404)
    res.render('err404',{path: req.path});
});

app.use((req,res,next)=>{
    res.status(404)
    res.render('err404',{path: req.path});
});

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);