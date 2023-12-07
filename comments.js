// Create web server which will allow users to add comments to a file
// and view all comments for a file.

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    if (request.method === 'GET' && request.url === '/comments') {
        fs.readFile('comments.txt', function(err, data) {
            if (err) throw err;
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(data);
            response.end();
        });
    } else if (request.method === 'POST' && request.url === '/comments') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            fs.appendFile('comments.txt', body + "\n", function(err) {
                if (err) throw err;
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write("Comment added: " + body + "\n");
                response.end();
            });
        });
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
    }
});

// Listen on port 8000, IP defaults to