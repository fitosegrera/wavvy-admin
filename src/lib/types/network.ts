export type ClientsType = 'app' | 'admin' | 'station' | 'server';

export type ActionsType =
	| 'unlock'
	| 'ride'
	| 'unlocked'
	| 'get-data'
	| 'ping'
	| 'pong';

export interface ClientInterface {
	name: string;
	address: string;
	connected: boolean;
}

// export interface ConnectionsStatusInterface {
// 	'http://localhost:5173': ClientInterface;
// 	'https://wavvysup.com': ClientInterface;
// 	'http://localhost:5174': ClientInterface;
// }

export interface ConnectionsStatusInterface {
	[key: string]: ClientInterface;
}

export interface MessageInterface {
	from: ClientsType | null;
	to: ClientsType | null;
	id: string | null;
	action: ActionsType | null;
	connection: ConnectionsStatusInterface | null;
}
