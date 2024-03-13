import type { ItemInterface } from '$lib/types/orders';

export const calculateTimeLeft = (item: ItemInterface) => {
	if (!item?.currentOrder?.duration) return '0h 0m 0s';
	const currentTime = new Date().getTime();
	const startTime = item.currentOrder?.startTime?.toDate().getTime();
	const duration = item?.currentOrder?.duration * 60 * 60 * 1000;
	const timeLeft = duration - (currentTime - startTime);
	const hours = Math.floor(
		(timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
	return `${hours}h ${minutes}m ${seconds}s`;
};
