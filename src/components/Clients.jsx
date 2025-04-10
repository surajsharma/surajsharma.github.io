import { motion } from "framer-motion";
import { useEffect } from "react";

export default function MotionMarquee({ clients }) {
	useEffect(() => {
		console.log("✅ Marquee component mounted!");
	}, []);

	const flattenClients = (clients) => {
		const list = [];
		clients.forEach((client) => {
			if (!client.agency) {
				list.push(client);
			} else if (client.clients?.length) {
				list.push(client, ...client.clients);
			}
		});
		return list;
	};

	const logos = flattenClients(clients);
	const fullList = logos.concat(logos); // Duplicate for seamless loop

	return (
		<>
			<motion.div
				initial={{ x: "0%" }}
				animate={{ x: "50%" }}
				transition={{
					duration: 20,
					repeat: Infinity,
					ease: "linear",
				}}
				className="flex flex-shrink-0 space-x-16 whitespace-nowrap"
			>
				{fullList.map((client, i) => (
					<a href={client.url} target="_blank" key={i}>
						<img
							className="tpl h-20 w-auto object-contain"
							src={client.img.import.src}
							alt={client.name}
						/>
					</a>
				))}
				<div className="w-0"></div>
			</motion.div>
			<motion.div
				initial={{ x: "0%" }}
				animate={{ x: "50%" }}
				transition={{
					duration: 20,
					repeat: Infinity,
					ease: "linear",
				}}
				className="flex flex-shrink-0 space-x-16 whitespace-nowrap"
			>
				{fullList.map((client, i) => (
					<a href={client.url} target="_blank" key={i}>
						<img
							className="tpl h-20 w-auto object-contain"
							src={client.img.import.src}
							alt={client.name}
						/>
					</a>
				))}
			</motion.div>
		</>
	);
}
