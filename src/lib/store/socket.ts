import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { PUBLIC_SOCKET_SERVER_URL } from '$env/static/public';

const messageStore = writable<string>('');
let socket: WebSocket;
let connectionTimer: NodeJS.Timeout | null = null;

const connect = () => {
	if (browser) {
		socket = new WebSocket('wss://' + PUBLIC_SOCKET_SERVER_URL);

		// Connection opened
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		socket.addEventListener('open', (event: Event) => {
			// console.log("It's open");
			if (connectionTimer) clearInterval(connectionTimer);
		});

		// Connection closed
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		socket.addEventListener('close', (event: CloseEvent) => {
			// console.log("It's closed");
			connectionTimer = setInterval(() => {
				connect();
			}, 3000);
		});

		// Listen for messages
		socket.addEventListener('message', (event) => {
			console.log('Message from server ', JSON.parse(event.data));
			messageStore.set(event.data);
		});

		return () => {
			socket.removeEventListener('open', () => {});
			socket.removeEventListener('close', () => {});
			socket.removeEventListener('message', () => {});
			// socket.close();
		};
	}
};

connect();

const sendMessage = (message: string) => {
	if (socket.readyState <= 1) {
		socket.send(message);
	}
};

export default {
	subscribe: messageStore.subscribe,
	sendMessage
};
