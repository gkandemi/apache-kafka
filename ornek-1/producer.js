const { Kafka } = require("kafkajs");

const topic_name = process.argv[2] || "Logs2";
const partition = process.argv[3] || 0;

createProducer();

async function createProducer() {
  try {
    const kafka = new Kafka({
      clientId: "kafka_ornek_1",
      brokers: ["192.168.8.148:9092"]
    });

    const producer = kafka.producer();
    console.log("Producer'a bağlanılıyor..");
    await producer.connect();
    console.log("Bağlantı başarılı.");

    const message_result = await producer.send({
      topic: topic_name,
      messages: [
        {
          value: "Bu bir test Log Mesajıdır...",
          partition: partition
        }
      ]
    });
    console.log("Gonderim işlemi başarılıdır", JSON.stringify(message_result));
    await producer.disconnect();
  } catch (error) {
    console.log("Bir Hata Oluştu", error);
  } finally {
    process.exit(0);
  }
}
