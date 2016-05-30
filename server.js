var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var num = 0;
var file = 'public/data/data'+ num +'.json';
var COMMENTS_FILE = path.join(__dirname, file);

app.set('port', (process.env.PORT || 8085));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    };
    var data = JSON.parse(data);
    for(var i in data){
        data[i]['welMark'] = welMarktoStrHandler(data[i]['welMark']);
        data[i]['boss'] = bosstoStrHandler(data[i]['boss']);
        data[i]['timeLine'] = timeLinetoStrHandler(data[i]['timeLine']);
    };
    res.json(data);
  });
});

app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    var newComment = {
      comid: req.body.comid,
      comMark: req.body.comMark,
      comName: req.body.comName,
      welMark: welMarktoArrHandler(req.body.welMark),
      comDes: req.body.comDes,
      bossNum: req.body.bossNum,
      boss: bosstoArrHandler(req.body.boss),
      timeLineNum: req.body.timeLineNum,
      timeLine: timeLinetoArrHandler(req.body.timeLine),
      picNum: req.body.picNum,
      shareTitle: req.body.shareTitle,
      shareContent: req.body.shareContent
    };
    comments[newComment.comid] = newComment;
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 5), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      var data = comments;
      for(var i in data){
          data[i]['welMark'] = welMarktoStrHandler(data[i]['welMark']);
          data[i]['boss'] = bosstoStrHandler(data[i]['boss']);
          data[i]['timeLine'] = timeLinetoStrHandler(data[i]['timeLine']);
      };
      res.json(data);
    });
  });
});

app.put('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    var comment = {
      comid: req.body.comid,
      comMark: req.body.comMark,
      comName: req.body.comName,
      welMark: welMarktoArrHandler(req.body.welMark),
      comDes: req.body.comDes,
      bossNum: req.body.bossNum,
      boss: bosstoArrHandler(req.body.boss),
      timeLineNum: req.body.timeLineNum,
      timeLine: timeLinetoArrHandler(req.body.timeLine),
      picNum: req.body.picNum,
      shareTitle: req.body.shareTitle,
      shareContent: req.body.shareContent
    };
    comments[comment.comid] = comment;
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 5), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      var data = comments;
      for(var i in data){
          data[i]['welMark'] = welMarktoStrHandler(data[i]['welMark']);
          data[i]['boss'] = bosstoStrHandler(data[i]['boss']);
          data[i]['timeLine'] = timeLinetoStrHandler(data[i]['timeLine']);
      };
      res.json(data);
    });
  });
});

app.delete('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    delete comments[req.body.comid];
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      var data = comments;
      for(var i in data){
          data[i]['welMark'] = welMarktoStrHandler(data[i]['welMark']);
          data[i]['boss'] = bosstoStrHandler(data[i]['boss']);
          data[i]['timeLine'] = timeLinetoStrHandler(data[i]['timeLine']);
      };
      res.json(data);
    });
  });
});

app.delete('/api/global', function(req, res) {
    var data = {}
    fs.writeFile(COMMENTS_FILE, JSON.stringify(data, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(data);
    });
});

app.get('/api/global', function(req, res) {
    num = num === 4 ? 0 : ++num;
    file = 'public/data/data'+ num +'.json';
    COMMENTS_FILE = path.join(__dirname, file);
    fs.readFile(COMMENTS_FILE, function(err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      };
      var data = JSON.parse(data);
      for(var i in data){
          data[i]['welMark'] = welMarktoStrHandler(data[i]['welMark']);
          data[i]['boss'] = bosstoStrHandler(data[i]['boss']);
          data[i]['timeLine'] = timeLinetoStrHandler(data[i]['timeLine']);
      };
      res.json(data);
    });
});

function welMarktoArrHandler(str){
      var arr = str.split("|");
      return arr;
};

function welMarktoStrHandler(arr){
      var str = arr.join("|");
      return str;
};

function bosstoArrHandler(str){
    var arr = str.split("|");
    var newArr = [];
    for(var i in arr){
        var o = {};
        o.bossNam = arr[i].split("#")[0];
        o.bossDes = arr[i].split("#")[1];
        newArr.push(o);
    };
    return newArr;
};

function bosstoStrHandler(arr){
    for(var i in arr){
      arr[i] = arr[i]['bossNam'] + "#" + arr[i]['bossDes'];
    };
    return arr.join("|");
};

function timeLinetoArrHandler(str){
    var arr = str.split("|");
    var newArr = [];
    for(var i in arr){
        var o = {};
        o.time = arr[i].split("#")[0];
        o.des = arr[i].split("#")[1];
        newArr.push(o);
    };
    return newArr;
};

function timeLinetoStrHandler(arr){
    for(var i in arr){
      arr[i] = arr[i]['time'] + "#" + arr[i]['des'];
    };
    return arr.join("|");
};

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
