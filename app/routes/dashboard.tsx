import { PrismaClient } from "@prisma/client";
import { PostType } from "~/types";

import {
  type LoaderFunction,
  json,
  type ActionFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostListItem from "~/components/PostListItem";
import { handleDelete, handleGenerate } from "~/lib/utils/actionFunctions";
import Spinner from "~/components/Spinner";
import PostGenerator from "~/components/PostGenerator";
import { useState } from "react";

const prisma = new PrismaClient();

export const loader: LoaderFunction = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return json({ posts });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const task = formData.get("task");
  console.log("tasks", task);

  switch (task) {
    case "generate":
      return handleGenerate(formData);
    case "delete":
      return handleDelete(formData);
    default:
      throw new Error(`Invalid task: ${task}`);
  }
};

const Blog = () => {
  const data = useLoaderData();
  const { posts } = data as { posts: PostType[] };
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between gap-5">
      <div className="border border-border p-10 w-full ">
        <PostGenerator setIsGenerating={setIsGenerating} />
        {isGenerating && <Spinner />}
      </div>
      <div className="border border-border p-10 w-full ">
        <h1>Posts</h1>
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
