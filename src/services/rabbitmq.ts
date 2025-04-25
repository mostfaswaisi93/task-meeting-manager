import amqp from "amqplib";

class RabbitMQService {
  private static channel: amqp.Channel;

  static async connect() {
    try {
      const connection = await amqp.connect("amqp://localhost");
      this.channel = await connection.createChannel();
      console.log("Connected to RabbitMQ");
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error);
    }
  }

  static async sendToQueue(queue: string, message: string) {
    try {
      if (!this.channel) await this.connect();
      await this.channel.assertQueue(queue, { durable: true });
      this.channel.sendToQueue(queue, Buffer.from(message), {
        persistent: true,
      });
      console.log("Message sent to queue:", message);
    } catch (error) {
      console.error("Error sending message to queue:", error);
    }
  }
}

export default RabbitMQService;
