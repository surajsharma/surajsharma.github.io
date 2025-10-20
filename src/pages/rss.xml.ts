import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "@/site-config";

export const get = async () => {
	const posts = await getCollection("post");
	const sortedPosts = posts.sort((a, b) => 
		new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
	);

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: import.meta.env.SITE,
		items: sortedPosts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: `posts/${post.slug}`,
			author: siteConfig.author,
			categories: post.data.tags || [],
		})),
		customData: `<language>en-gb</language>
		<copyright>Copyright ${new Date().getFullYear()} ${siteConfig.author}</copyright>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		<generator>Astro</generator>`,
	});
};
