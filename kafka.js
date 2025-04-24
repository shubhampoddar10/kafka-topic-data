// producer.mjs or producer.js
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-esm-producer',
  brokers: ['localhost:9092'], // Replace with your Kafka broker(s)
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();

  await producer.send({
    topic: 'my-topic', // Replace with your topic name
    messages: [
      {
        key: 'key1',
        value: JSON.stringify({ message: 'Hello from ESM KafkaJS!' }),
      },
    ],
  });

  console.log('✅ Message published (ESM)');
  await producer.disconnect();
};

run().catch(console.error);
