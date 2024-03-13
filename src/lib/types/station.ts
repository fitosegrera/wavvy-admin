export interface StationConnectionInterface {
	name: string;
	status: 'online' | 'offline';
	onClick: () => void;
}

export interface MarketingInterface {
	hourlyRate: number;
	discountRate: number;
}
