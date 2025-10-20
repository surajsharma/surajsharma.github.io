import { useEffect } from "react"
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";


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



  return (
    <>
      <Marquee
        fade={true}
        direction="left"
        reverse={false}
        pauseOnHover={true}
        className=""
        innerClassName="gap-[4rem] h-24"
      >
        {logos.map((client, i) => (
          <a href={client.url} target="_blank" rel="noopener noreferrer" key={i} aria-label={`Visit ${client.name} website`}>
            <img
              className={`tpl h-20 w-auto object-contain ${i === 0 ? 'ml-16' : ''}`}
              src={client?.img?.import?.src}
              alt={`${client.name} logo`}
              loading="lazy"
              width="auto"
              height="80"
            />
          </a>
        ))}
      </Marquee>
    </>
  );
}
