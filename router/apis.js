var express = require('express');
var router = express.Router();
//var jwt = require('jsonwebtoken');
//var secretObj = require('../config/jwt');

// 라우터 레벨 미들웨어 for authentification
// 모든 api에 적용
// router.use(function(req, res, next) {

//     var bearerToken = req.headers.authorization.split(' ')[1];

//     //console.log("bearerToken: " + bearerToken)

//     const cookieToken = req.cookies.user;

//     try {
//         jwt.verify(bearerToken, secretObj.secret);
//         next();
//     } catch (err) {
//         if (err.name === 'TokenExpiredError') {
//             console.log("access err: " + err.name);
//             res.send(err.name);
//         } else {
//             console.log("access err: " + err.name);
//             res.send(err.name);
//         }
//     }
// });


router.get('/', function(req, res) {

    var apiName = new Object();

    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    apiName.calling_IP = ip;
    apiName.date = Date.now();
    apiName.comments = "you called API GET";


    res.send(apiName);

});

router.post('/', function(req, res) {

    var recvName = req.body.name;
    var apiName = new Object();

    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    apiName.calling_IP = ip;
    apiName.recvName = recvName;
    apiName.date = Date.now();
    apiName.comments = "you called API POST";

    res.send(apiName);

});



module.exports = router;
