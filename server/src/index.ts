import express from 'express';

var app = express();

app.get('/', function (req, res) {
   res.send('Hello Worlds');
})

var server = app.listen(8081, function () {
   const address: any = server.address();
   if (address) {
    var host = address.address
    var port = address.port
   }
   
   console.log("Performance Task API Server listening at http://%s:%s", host, port)
});
