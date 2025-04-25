import amqp from "amqplib";

class RabbitMQConsumer {
  static async consumeQueue(queue: string) {
    try {
      const connection = await amqp.connect("amqp://localhost");
      const channel = await connection.createChannel();

      await channel.assertQueue(queue, { durable: true });
      console.log(`Waiting for messages in ${queue}`);

      channel.consume(queue, (msg) => {
        if (msg) {
          const message = JSON.parse(msg.content.toString());
          console.log("Received message:", message);

          this.sendNotification(message);

          channel.ack(msg);
        }
      });
    } catch (error) {
      console.error("Error consuming from RabbitMQ:", error);
    }
  }

  static sendNotification(message: any) {
    console.log(`Sending notification for ${message.type}...`);
  }
}

export default RabbitMQConsumer;
