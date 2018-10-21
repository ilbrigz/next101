import Layout from "../components/MyLayout.js";
import fetch from "isomorphic-unfetch";
import Head from "next/head";

const Post = props => (
	<Layout>
		<Head>
			<title>MyComic | {props.show.name}</title>
			<meta
				name="description"
				content={props.show.summary.replace(/<\/?[^>]+(>|$)/g, "")}
			/>
			<meta name="keywords" content="test keywords" />
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
