import amqp from "amqplib";
import { Server as SocketIOServer } from "socket.io";
import { getUserSocket } from "../utils/socketStore";
import app from "../app";

class RabbitMQConsumer {
  static async consumeQueue(
    queue: string,
    io: SocketIOServer,
    onlineUsers: Map<string, string>
  ) {
    try {
      const connection = await amqp.connect("amqp://localhost");
      const channel = await connection.createChannel();
      await channel.assertQueue(queue, { durable: true });

      console.log(`Waiting for messages in ${queue}`);

      channel.consume(queue, (msg) => {
        if (!msg) return;

        const message = JSON.parse(msg.content.toString());
        console.log(`Received message in ${queue}:`, message);

        this.notifyOnlineUsers(io, onlineUsers, message);

        channel.ack(msg);
      });
    } catch (error) {
      console.error("RabbitMQ Consumer Error:", error);
    }
  }

  static notifyOnlineUsers(
    io: SocketIOServer,
    onlineUsers: Map<string, string>,
    message: any
  ) {
    const { type, assignedTo, participants } = message;

    if (type === "task_created" && assignedTo) {
      const socketId = onlineUsers.get(assignedTo);
      if (socketId) {
        io.to(socketId).emit("notification", {
          type,
          message: `تم تعيين مهمة جديدة لك.`,
          data: message,
        });
      }
    }

    if (type === "meeting_created" && Array.isArray(participants)) {
      participants.forEach((userId: string) => {
        const socketId = onlineUsers.get(userId);
        if (socketId) {
          io.to(socketId).emit("notification", {
            type,
            message: `تمت دعوتك لاجتماع جديد.`,
            data: message,
          });
        }
      });
    }
  }

  static async sendNotification(message: any) {
    const io = app.get("io");

    if (message.type === "task_created" && message.assignedTo) {
      const socketId = getUserSocket(message.assignedTo);
      if (socketId) {
        io.to(socketId).emit("task:created", {
          title: message.title,
          dueDate: message.dueDate,
          taskId: message.taskId,
        });
        console.log(
          `Real-time task notification sent to ${message.assignedTo}`
        );
      }
    }

    if (
      message.type === "meeting_created" &&
      Array.isArray(message.participants)
    ) {
      message.participants.forEach((participantId: string) => {
        const socketId = getUserSocket(participantId);
        if (socketId) {
          io.to(socketId).emit("meeting:created", {
            title: message.title,
            scheduledAt: message.scheduledAt,
            meetingId: message.meetingId,
          });
          console.log(
            `Real-time meeting notification sent to ${participantId}`
          );
        }
      });
    }
  }
}

export default RabbitMQConsumer;
