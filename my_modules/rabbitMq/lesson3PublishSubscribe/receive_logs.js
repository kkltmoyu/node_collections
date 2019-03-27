var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var ex = 'logs';

        ch.assertExchange(ex, 'fanout', {
            durable: true
        });

        ch.assertQueue('', {
            exclusive: true
        }, function (err, q) {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            //exchange和queue之间的关系称为binding。
            ch.bindQueue(q.queue, ex, '');

            ch.consume(q.queue, function (msg) {
                if (msg.content) {
                    console.log(" [x] %s", msg.content.toString());
                }
            }, {
                noAck: true
            });
        });
    });
});