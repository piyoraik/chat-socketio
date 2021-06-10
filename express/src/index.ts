import express from "express";
import * as socket from "socket.io";

const app: express.Express = express();
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

const io = new socket.Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket: socket.Socket) => {
	console.log("A Client connected");
	socket.on("send", (payload) => {
		console.log("-------");
		console.log(payload);
		socket.broadcast.emit("broadcast", payload);
	});
	socket.on("disconnect", () => {
		console.log("Connection Closed");
	});
});
