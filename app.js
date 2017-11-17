var express = require('express');
var app = express();
var router = require('./router/api.js');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set("views", "./views");

app.use(express.static(__dirname + '/public'));
app.use('/', router);
app.use('*',function(req,res){
				res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
				res.write('<title>Không tồn tại</title>');
                res.write("Không tồn tại đường dẫn này!");
                res.end();
});
app.listen(process.env.PORT || 8888, function () {
	console.log("dang lắng nghe kết nối");
});

