import amqp from "amqplib";

let channel: amqp.Channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(
      process.env.RABBITMQ_URL || "amqp://localhost"
    );
    channel = await connection.createChannel();
    console.log("✅ RabbitMQ connected");
  } catch (error) {
    console.error("RabbitMQ connection failed:", error);
  }
};

const getChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ Channel not initialized");
  }
  return channel;
};

export { connectRabbitMQ, getChannel };
