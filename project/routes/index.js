var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var multiparty = require('multiparty');
var fs = require('fs');
var dbconfig = require('./dbconfig.js');
var router = express.Router();
var connection = mysql.createConnection(dbconfig);

var log = {};
var result = 0;
var check = false;
var name = "admin";


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', check : check });
});

router.get('/baebu', function(req, res, next) {
  res.render('1baebu');
});

router.get('/junlim', function(req, res, next) {
  res.render('1junlim');
});

router.get('/jang', function(req, res, next) {
  res.render('1jang');
});

router.get('/hosil', function(req, res, next) {
  res.render('1hosil');
});

router.get('/buseo', function(req, res, next) {
  res.render('1buseo');
});

router.get('/pyeojun', function(req, res, next) {
  res.render('1pyeojun');
});

router.get('/bonbu', function(req, res, next) {
  res.render('1bonbu');
});

router.get('/jaehak', function(req, res, next) {
  res.render('1jaehak');
});

router.get('/hakbu', function(req, res, next) {
  res.render('1hakbu');
});

router.get('/hakgua', function(req, res, next) {
  res.render('1hakgua');
});

router.get('/kyojik', function(req, res, next) {
  res.render('1kyojik');
});

router.get('/jasan', function(req, res, next) {
  res.render('1jasan');
});

router.get('/haksang', function(req, res, next) {
  res.render('1haksang');
});

router.get('/plus', function(req, res, next) {
  res.render('2plus');
});

router.get('/p_hakbu', function(req, res, next) {
  res.render('2hakbu');
});

router.get('/p_time', function(req, res, next) {
  res.render('2time');
});

router.post('/', function(req, res, next){

    connection.query('select log_id, log_pw from test', function(err, rows) {
      if(err) throw err;
      console.log(rows[0].log_id);

      log.id = rows[0].log_id;
      log.pw = rows[0].log_pw;

      console.log("log id : " + log.id + " log_pw : "  + log.pw);
    });

    var
        user_id = req.body.log_id,
        user_pw = req.body.log_pw;

    if(log.id == user_id){
    }

    if( (log.id == user_id) && (log.pw == user_pw)) {
        console.log("<login>\n"+"SUCCESSS!\n");
        res.render('index', { title: 'Express', check : 'true' });
    }
    else{
        console.log("<login>\n"+"FAIL!\n");
        res.render('home/login');
    }
});

router.post('/upload', function(req, res, next) {
      var form = new multiparty.Form();

      // get field name & value
      form.on('field',function(name,value){
           console.log('**원래 파일 / name = '+name+' , value = '+value);
      });

      // file upload handling
      form.on('part',function(part){
           var filename;
           var size;
           if (part.filename) {
                 filename = part.filename;
                 size = part.byteCount;
           }else{
                 part.resume();
           }    

           console.log("Write Streaming file :"+filename);
           var writeStream = fs.createWriteStream('./public/upload/'+filename);
           writeStream.filename = filename;
           part.pipe(writeStream);
 
           part.on('data',function(chunk){
                 console.log(filename+' read '+chunk.length + 'bytes');
           });

           part.on('end',function(){
                 console.log(filename+' Part read complete');
                 writeStream.end();
           });
           
      });

      // all uploads are completed
      form.on('close',function(){
           res.status(200).send('Upload complete');
      });

      // track progress
      form.on('progress',function(byteRead,byteExpected){
           console.log(' Reading total  '+byteRead+'/'+byteExpected);
      });
      form.parse(req);

});

module.exports = router;
