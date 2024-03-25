import { Form } from "@remix-run/react";
import { XCircle } from "lucide-react";

const DeleteButton = ({ postId }: { postId: string }) => {
  return (
    <Form method="post" className="flex items-center">
      <button
        type="submit"
        className="h-5 w-5 text-red-500 hover:text-red-300 transition duration-300"
      >
        <XCircle />
      </button>
      <input type="hidden" name="task" value="delete" />
      <input type="hidden" name="id" value={postId} />
    </Form>
  );
};

export default DeleteButton;
