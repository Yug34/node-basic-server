const http = require('http');
const fs = require("fs");

http.createServer(function (req, res) {
  let fileName = "./files" + req.url + ".html";
  fs.exists(fileName, exists => {
    (exists)?fs.readFile(`${fileName}`, function (err, data) {
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end;
    }):(req.url === "/")?
      fs.readFile(`./files/index.html`, function (err, data) {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end;
      }):fs.readFile(`./files/404.html`, function (err, data) {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end;
      });
  });
}).listen(8080);

console.log("Server Online");