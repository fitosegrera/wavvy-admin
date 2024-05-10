import { browser } from '$app/environment';
import * as io from 'socket.io-client';
import { writable } from 'svelte/store';
import type { MessageInterface } from '$lib/types/network';
import { PUBLIC_SOCKET_SERVER_URL } from '$env/static/public';

let socket: io.Socket;
let connected = false;
const messageStore = writable<MessageInterface>({
	from: null,
	to: null,
	id: null,
	action: null,
	connection: null
});

const connect = () => {
	if (browser) {
		socket = io.connect(PUBLIC_SOCKET_SERVER_URL);

		// Connection opened
		socket.on('connect', () => {
			console.log("It's open");
			connected = true;
		});

		// Connection closed
		socket.on('disconnect', () => {
			console.log("It's closed");
		});

		// Listen for messages
		socket.on('message', (msg: MessageInterface) => {
			console.log('Message from server ', msg);
			messageStore.set(msg);
		});
	}
};

connect();

const sendMessage = (message: MessageInterface) => {
	socket.emit('message', message);
};

export default {
	subscribe: messageStore.subscribe,
	sendMessage,
	connected
};
