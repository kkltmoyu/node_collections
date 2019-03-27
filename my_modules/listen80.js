let http = require('http');

http.createServer((req,res)=>{
    console.log('res is ',res);
	res.writeHead(200,{
        "content-type":"text/plain"
    });
    res.write('hello');
    res.end();
}).listen(90);
