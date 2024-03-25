import { PrismaClient } from "@prisma/client";
import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Date from "../components/Date";
import { PostType } from "~/types";

const prisma = new PrismaClient();

interface LoaderParams {
  params: {
    slug: string;
  };
}
export const loader = async ({ params }: LoaderParams) => {
  const { slug } = params;

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    select: {
      title: true,
      content: true,
      createdAt: true,
      description: true,
    },
  });

  if (!post) {
    throw new Response("Post does not exist", { status: 404 });
  }

  return json({ post });
};

export const meta: MetaFunction = ({ data }) => {
  return [
    { title: data.post.title },
    { name: "description", content: data.post.description },
  ];
};

const Post = () => {
  const { post }: { post: PostType } = useLoaderData();

  return (
    <div>
      <h1>{post.title}</h1>
      <Date date={post.createdAt} />
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </div>
  );
};

export default Post;
