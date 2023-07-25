// create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// create web server
http.createServer(function(request, response){
    // URL routing
    var pathname = url.parse(request.url).pathname;
    if(pathname === '/'){
        // read html file
        fs.readFile('index.html', function(error, data){
            if(error){
                console.log(error);
            }else{
                response.writeHead(200, {'Content-Type':'text/html'});
                response.end(data);
            }
        });
    }else if(pathname === '/create_comment'){
        // POST data
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var comment = post.comment;
            console.log(comment);
            // redirect
            response.writeHead(302, {Location: '/'});
            response.end();
        });
    }else{
        // error
        response.writeHead(404);
        response.end('Not Found');
    }
}).listen(3000, function(){
    console.log('Server running at http://localhost:3000');
});


