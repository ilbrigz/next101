import Layout from "../components/MyLayout.js";
import fetch from "isomorphic-unfetch";
import Head from "next/head";

const Post = props => (
	<Layout>
		<Head>
			<title>MyComic | {}</title>
			<meta
				name="keywords"
				content={props.show.summary.replace(/<[/]?p>/g, "")}
			/>
			<meta property="og:title" content={props.show.name} />
			<meta property="og:image" content={props.show.image.medium} />
		</Head>

		<h1>{props.show.name}</h1>
		<p>{props.show.summary.replace(/<[/]?p>/g, "")}</p>
		<img src={props.show.image.medium} />
	</Layout>
);

Post.getInitialProps = async function(context) {
	const { id } = context.query;
	const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
	const show = await res.json();

	console.log(`Fetched show: ${show.name}`);

	return { show };
};

export default Post;
