import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Link from "next/link";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

const Home = ({ posts }: Props) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts?.map((post) => {
          return (
            <Link key={`${post._id}`} href={`post/${post.slug.current}`}>
              <div className="group cursor-pointer border rounded-lg overflow-hidden">
                <img
                  className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                  src={urlFor(post.mainImage).url()!}
                  alt=""
                />
                <div className="flex justify-between items-center p-5 bg-white">
                  <img
                    className="h-12 w-12 rounded-full mr-2"
                    src={urlFor(post.author.image).url()!}
                    alt=""
                  />
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>

                    <p className="text-xs">
                      {post.description} by{" "}
                      <span className="font-semibold">{post.author.name}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = `*[ _type == "post"]{
      _id,
      title,
      author -> {
       name,
       image
      },
      description,
      mainImage,
      slug
    }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

export default Home;
