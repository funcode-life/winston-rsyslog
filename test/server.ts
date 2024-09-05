import dgram from "dgram";

export default (port: number, onMessage: (msg: string) => void) =>
  new Promise<void>((resolve, reject) => {
    const server = dgram.createSocket("udp4");
    server.on("message", (message) => {
      server.close();
      onMessage(message.toString());
    });
    server.on("close", () => console.log("Closing..."));
    server.on("error", (err) => reject(err));
    server.bind(port, "0.0.0.0", () => resolve());
  });
