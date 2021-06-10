import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const Chat = () => {
	const ENDPOINT = "http://localhost:4000";
	const [messages, setMessages] = useState([
		{
			name: "管理人",
			text: `ようこそ、testさん`,
		},
	]);

	const [text, setText] = useState("");

	const socketRef = useRef();

	useEffect(() => {
		console.log("Connecting...");
		socketRef.current = socketIOClient(ENDPOINT);
		socketRef.current.on("broadcast", (payload) => {
			console.log(`Recieved: ${payload}`);
			setMessages((prevMessages) => [...prevMessages, payload]);
		});
		console.log("Connected");
		return () => {
			console.log("Disconnecting...");
			socketRef.current.disconnect();
		};
	}, []);

	const handleButtonClick = (e) => {
		const aMessage = {
			name: "test",
			text: text,
		};
		socketRef.current.emit("send", aMessage);
		setMessages((prevMessages) => [...prevMessages, aMessage]);
		console.log(messages);
		setText("");
	};

	return (
		<div>
			<div className="input">
				<input
					type="text"
					placeholder="メッセージ"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button disabled={!text} onClick={handleButtonClick}>
					Submit
				</button>
			</div>
			<ul>
				{messages.map((message, idx) => (
					<li key={idx}>{message.text}</li>
				))}
			</ul>
		</div>
	);
};

export default Chat;
