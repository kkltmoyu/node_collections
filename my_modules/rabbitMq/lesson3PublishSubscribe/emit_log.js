var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var ex = 'logs';
        var msg = process.argv.slice(2).join(' ') || 'Hello World!';
        //exchange类型共有四种，direct, topic, headers and fanout，此处只讨论fanout
        //fanout只是将接收到的所有消息广播到它知道的所有队列
        ch.assertExchange(ex, 'fanout', {
            durable: true
        });
        //空字符串作为第二个参数意味着我们不希望将消息发送到任何特定的队列。我们只想将它发布到我们的“logs”交换中。
        ch.publish(ex, '', new Buffer(msg));
        console.log(" [x] Sent %s", msg);
    });

    setTimeout(function () {
        conn.close();
        process.exit(0)
    }, 500);
});