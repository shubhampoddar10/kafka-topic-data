import { Kafka } from "kafkajs";
import dotenv from "dotenv";
dotenv.config();

const kafka = new Kafka({
  clientId: "my-esm-producer",
  brokers: [
    process.env.KAFKA_BOOTSTRAP_SERVER_URL ||
      "my-cluster-kafka-bootstrap.my-kafka-project:9092",
  ],
  sasl: {
    mechanism: "scram-sha-512",
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  }
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();

  const message = {
    event: "Load testing by shubham",
    message: "Hello from Shubham KafkaJS dev cluster!",
  };

  const record = {
    topic: process.env.TOPIC,
    messages: [
      {
        value: JSON.stringify({
          event: "Load testing by shubham",
          message: "Hello from Shubham KafkaJS dev cluster!",
        }),
      },
    ],
  };

  await producer.send(record);
  console.log(record,"record");

  console.log("✅ Message published (ESM)");
  await producer.disconnect();
};

setInterval(() => {
  run().catch(console.error);
}, process.env.DATA_TIMER);
