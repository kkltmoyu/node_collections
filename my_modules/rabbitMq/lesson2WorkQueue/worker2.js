var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'task_queue';
        //可持久化设置
        ch.assertQueue(q, {
            durable: true
        });
        //等worker干完当前任务再给其分配新任务，保证任务分配均匀
        ch.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function (msg) {
           var secs = msg.content.toString().split('.').length - 1;

           console.log(" [x] Received %s", msg.content.toString());
           setTimeout(function () {
               console.log(" [x] Done");
               //发送确认消息
               ch.ack(msg);
           }, secs * 1000);
        //开启消息确认，防止worker死掉导致消息丢失
       }, {
           noAck: false
       });
    });
});