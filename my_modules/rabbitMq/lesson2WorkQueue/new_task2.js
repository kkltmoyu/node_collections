var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) { 
        var q = 'task_queue';
        var msg = process.argv.slice(2).join(' ') || "Hello World!";

        //消息持久化，防止rabbitmq服务死掉导致消息丢失,不能百分百保证消息不丢
        //1.队列必须设置为可持久化才能在rabbitmq挂掉后恢复队列中的消息,两端均需设置
        //注：不能将一个已经命名过的非持久化消息变成一个可持久化的消息（根据名称确认是不是同一个消息）
        ch.assertQueue(q, {
            durable: true
        });
        //2.
        ch.sendToQueue(q, new Buffer(msg), {
            persistent: true
        });
        console.log(" [x] Sent '%s'", msg);
    });
    setTimeout(function () {
        conn.close();
        process.exit(0)
    }, 500);
})