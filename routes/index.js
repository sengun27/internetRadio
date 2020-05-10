var express = require('express');
var router = express.Router();
var RadioModel = require('../models/radioModel.js');

function stopRadio() {
    const exec = require('child_process').exec;
    exec('kill ')
}

//全てのurlを取得
router.get('/', function (req, res) {
    RadioModel.find({}, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.json(data);
        }
    });
});

//:idを返す
router.get('/:id', function (req, res) {
    var Radioid = req.params.id;
    RadioModel.findById(Radioid, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json(data);
        }
    })
});


//create
router.post('/new', function (req, res) {
    var Radio = new RadioModel();
    Radio.name = req.body.name;
    Radio.url = req.body.url;
    Radio.description = req.body.description;
    Radio.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json({ message: 'success' });
        }
    });
});

//:idを削除
router.delete('/:id', function (req, res) {
    var Radioid = req.params.id;
    RadioModel.deleteOne({ _id: Radioid }, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json({ message: 'success' });
        }
    })
});

//routerをモジュールとして扱う準備
module.exports = router;