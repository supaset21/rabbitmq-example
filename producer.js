const amqplib = require("amqplib");

const topicName = "topic_logs";

const start = async () => {
  const connection = await amqplib.connect(
    "amqp://user:password@localhost:5672"
  );
  const channel = await connection.createChannel();
  await channel.assertExchange(topicName, "topic", { durable: true });

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const sendMsg = async () => {
    const data = {
      data: "Test",
      num: getRandomInt(100, 10000),
    };
    channel.publish(topicName, "key1.test", Buffer.from(JSON.stringify(data)));
    console.log("Sent: ", data);
  };

  setInterval(sendMsg, 500);
};

start();
