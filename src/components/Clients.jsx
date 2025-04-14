import { motion, useAnimation, useMotionValue } from "motion/react"
import { useEffect } from "react"

export default function MotionMarquee({ clients }) {

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

  const controls1 = useAnimation()
  const x1 = useMotionValue(0)

  const animate = (fromPercent) => {
    x1.set(`${fromPercent}%`)
    controls1.start({
      x: "50%",
      transition: {
        duration: (50 - fromPercent) * (20 / 50), // adjust duration proportionally
        ease: "linear",
        repeat: Infinity,
      },
    })
  }

  useEffect(() => {
    animate(0)
  }, [])

  const handlePause = () => {
    controls1.stop()
  }

  const handleResume = () => {
    const current = parseFloat(x1.get().toString()) // e.g., "17.6%"
    const clamped = Math.max(0, Math.min(current, 50)) // clamp within range
    animate(clamped)
  }

  return (
    <>
      <motion.div
        style={{ x: x1 }}
        initial={{ x: "0%" }}
        animate={controls1}
        onHoverStart={handlePause}
        onHoverEnd={handleResume}
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
        style={{ x: x1 }}
        initial={{ x: "0%" }}
        animate={controls1}
        onHoverStart={handlePause}
        onHoverEnd={handleResume}
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
