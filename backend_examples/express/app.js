
/**
 * Module dependencies.
 */

 var express = require('express')
 , http = require('http')
 , path = require('path')
 , fs = require('fs');

 var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser({keepExtensions: true, uploadDir: __dirname+'/public/files'}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', function(req, res) {
	res.send(':)');
});

app.all('/image', function(req, res) {
	// cors
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Resource', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Cache-Control, X-CSRF-Token, X-Requested-With, X-File-Name, X-File-Name, X-File-Size');

    //	Image processing
    req.accepts('image/gif');
    req.accepts('image/jpeg');
    req.accepts('image/jpg');
    req.accepts('image/pjpeg');
    req.accepts('image/x-png');
    req.accepts('image/png');

    var imgCode = new Date().getTime(),
    newFileName = imgCode+'_'+req.files.file.name,
    newPath = __dirname+'/public/files/'+newFileName;

    fs.rename(req.files.file.path, newPath);
    res.json({image:req.headers.host+'/files/'+newFileName, token:req.params.token});
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
