import express from 'express';
import Router from './routes';

var app = express();
var cors = require('cors');

app.use(cors());
app.use(express.json());
Router(app);

var server = app.listen(8081, function () {
   const address: any = server.address();
   if (address) {
      var host = address.address
      var port = address.port
   }

   console.log("Performance Task API Server listening at http://%s:%s", host, port)
});
