import { getCollection } from 'astro:content';

export async function GET() {
	const blogPosts = await getCollection('blog');
	const moments = await getCollection('moments');

	const searchData = [
		...blogPosts.map(post => ({
			type: 'blog',
			title: post.data.title,
			description: post.data.description,
			url: `/blog/${post.slug}/`,
			date: post.data.pubDate.toISOString().split('T')[0],
			content: post.body || ''
		})),
		...moments.map(moment => ({
			type: 'moment',
			title: moment.data.title || '瞬间',
			description: '',
			url: `/moments/`,
			date: moment.data.date.toISOString().split('T')[0],
			content: moment.body || '',
			tags: moment.data.tags || []
		}))
	];

	return new Response(JSON.stringify(searchData), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}