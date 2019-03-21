///////////////////未用连接池
// var redis = require('redis');

// var client = redis.createClient(6379,'localhost');

// client.auth('night',() => {  
//     console.log('通过认证');  
// });  
// client.set('mie','hahaha',(err,v)=>{
// 	console.log('it is',err,v)
// });
//单值赋值
// client.set('name','ngiht');

// client.get('ab',(err,v) =>{
//     console.log("redis get hello err,v",err,v);
// })
// client.get('ab',(err,v) =>{
// 	console.log("red",err,v);
// })
// // client.set('ttsts',{name:"jacky",age:22});

// client.get('ttsts',function (err,v) {
//     console.log("redis get hello err,v",err,v);
// })
// Object.prototype.toString = function(){
//     return JSON.stringify(this);
// };

//多值赋值
// client.hmset('multi',{name:'123',address:'address1'})
// client.hmset('multi1','gagda','ggagdag','gagdfafaga',1)
// client.hgetall('multi', (err,v)=>{
// 	console.log('hgetall:',err,v)
// })
// client.hgetall('multi1',(err,v)=>{
// 	setTimeout(()=>{
// 		console.log('hgetall:',err,v)
// 	},1000)
// })

// client.on('connect',()=>{
// 	let key = 'skills';
// 	client.sadd(key,'c')
// 	client.sadd(key,'c++')
// 	client.sadd(key,'c#')

// 	client.multi().
// 	sismember(key,'c#').
// 	smembers(key).
// 	exec(function(err,replies){
// 		console.log('multi got '+replies.length + 'replies')
// 		replies.forEach((reply,index)=>{
// 			console.log('reply '+ index + ':' + reply.toString());
// 		})
// 	});
// 	client.quit();
// })

// client.sadd('list','llllllll4',3,35,5,51);
// client.sismember('list',5,(err,v)=>{
// 	console.log(err,v);
// })
// client.smembers('list',(err,v)=>{
// 	console.log(err,v);
// })
// 删除
// client.del('ab',(err,v)=>{
// 	console.log(err,v)
// })
// let i = 0;
// while(i<10){
// 	client.zadd('orderlist',i,'haha'+i);
// 	i++;
// }
// client.zrange('orderlist',0,-1,(err,v)=>{
// 	console.log(err,v)
// })

// client.lpush('mylist','111')
// client.rpush('mylist','rrrrr')
// client.rpop('mylist',(err,v)=>{
// 	console.log(err,v)
// })

// client.on('ready',function(err){  
//     console.log('ready');  
// })


// client.quit();










///////////////////使用连接池
// 创建一个 redis 连接池
var genericPool  = require('generic-pool');
var redis = require('redis');

/**
 * Step 1 - Create pool using a factory object
 */
const factory = {
  create: function() {
  	let cli = redis.createClient(6379,'172.30.113.47');
  	cli.auth('night',() => {  
	    console.log('通过认证');  
	});  
    return cli;
  },
  destroy: function(client) {
    client.disconnect();
  }
};

const opts = {
  max: 10, // maximum size of the pool
  min: 3, // minimum size of the pool
  idleTimeoutMillis : 10000,
};

const myPool = genericPool.createPool(factory, opts);

/**
 * Step 2 - Use pool in your code to acquire/release resources
 */

// acquire connection - Promise is resolved
// once a resource becomes available
const resourcePromise = myPool.acquire();

resourcePromise
  .then(function(client) {
  	console.log('a')
 //  	client.get('hello',(err,v) =>{
	// 	console.log("hello",err,v);
	// })
	// client.on('ready',function(err){  
	//     console.log('ready');  
	// })
	// client.on('end',function(err){  
	//     console.log('end');  
	// })
	// myPool.release(client);

   })
  .catch(function(err) {
    // handle error - this is generally a timeout or maxWaitingClients
    // error
  });

/**
 * Step 3 - Drain pool during shutdown (optional)
 */
// Only call this once in your application -- at the point you want
// to shutdown and stop using this pool.
// myPool.drain().then(function() {
//   myPool.clear();
// });

// var pool = poolModule.Pool({
//         name     : 'redis',
//         //将建 一个 连接的 handler
//         create   : function(callback) {
//                 var Client = require('redis').Client;
//                 var c = new Client();
//                 c.user     = 'scott';
//                 c.password = 'tiger';
//                 c.database = 'ni';
//                 c.connect();
//                 callback(null, c);
//         },
//         // 释放一个连接的 handler
//         destroy  : function(client) { client.end(); },
//         // 连接池中最大连接数量
//         max      : 10,
//         // 连接池中最少连接数量
//         min      : 2, 
//         // 如果一个线程3秒钟内没有被使用过的话。那么就释放
//         idleTimeoutMillis : 30000,
//         // 如果 设置为 true 的话，就是使用 console.log 打印入职，当然你可以传递一个 function 最为作为日志记录handler
//         log : true 
//     });