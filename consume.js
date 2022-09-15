const amqplib = require("amqplib");

const start = async () => {
  const topicName = "topic_logs";
  const connection = await amqplib.connect(
    "amqp://user:password@localhost:5672"
  );
  const channel = await connection.createChannel();
  await channel.assertExchange(topicName, "topic", { durable: true });
  const queue = "sub-topic";
  await channel.assertQueue(queue, { durable: true });
  console.log(`Waiting for messages in queue: ${queue}`);
  // todo can loop bind list
  channel.bindQueue(queue, topicName, "key1.test");

  channel.consume(
    queue,
    (msg) => {
      if (msg.content)
        console.log(
          `Routing Key: ${
            msg.fields.routingKey
          }, Message: ${msg.content.toString()}`
        );
    },
    { noAck: true }
  );
};

start();
