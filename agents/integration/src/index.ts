import amqp from 'amqplib';

async function start() {
  const connection = await amqp.connect('amqp://rabbitmq');
  const channel = await connection.createChannel();
  // ...
  console.log('Integration Agent started');
}

start();