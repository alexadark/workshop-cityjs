import { PrismaClient } from "@prisma/client";
import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { useActionData, useLoaderData, useLocation } from "@remix-run/react";
import EditPost from "~/components/EditPost";
import PublishButton from "~/components/PublishButton";
import { handleEdit, handlePublish } from "~/lib/utils/actionFunctions";

const prisma = new PrismaClient();

export const loader: LoaderFunction = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const lastPublishedPost = posts[0] || {};
  return json({ lastPublishedPost });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const task = formData.get("task");
  switch (task) {
    case "edit":
      return handleEdit(formData);
    case "publish":
      return handlePublish(formData);
    default:
      throw new Error(`Unknown task: ${task}`);
  }
};

const EditPostRoute = () => {
  const location = useLocation();
  console.log("location", location);
  let { post } = location.state || {};
  const { lastPublishedPost } = useLoaderData();
  const actionData = useActionData();
  console.log("actionData", actionData);
  const editedPost = actionData?.post;
  post = post || editedPost || lastPublishedPost;

  return (
    <>
      {post ? (
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="border border-border p-10 w-full">
            <EditPost post={post} />
          </div>
          <div className="border border-border p-10 w-full">
            <h1>Preview</h1>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            <PublishButton post={post} />
          </div>
        </div>
      ) : (
        <h3>No post to edit</h3>
      )}
    </>
  );
};

export default EditPostRoute;
