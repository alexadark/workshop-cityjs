import { Link } from "@remix-run/react";
import DeleteButton from "./DeleteButton";
import { PostType } from "~/types";

const PostListItem = ({ post }: { post: PostType }) => {
  return (
    <div className="flex gap-3 items-center align-middle">
      <h2 className="m-2">
        <Link
          to={`/edit-post`}
          state={{ post }}
          className="bg-gradient-to-r font-bold from-purple-500 to-pink-500 text-transparent bg-clip-text transition duration-500 hover:from-purple-400 hover:to-pink-400"
        >
          {post.title}
        </Link>
      </h2>
      <DeleteButton postId={post.id} />
    </div>
  );
};

export default PostListItem;
