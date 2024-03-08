import { Form } from "@remix-run/react";
import { Editor } from "@tinymce/tinymce-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useRef, useState, useEffect } from "react";

const EditPost = ({ post }) => {
  const [title, setTitle] = useState(post.title);
  const editorRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    setTitle(post.title);
  }, [post.title]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <h1>Edit your post</h1>
      <Form method="post" className="space-y-5">
        <Input
          type="text"
          value={title}
          name="headline"
          onChange={handleTitleChange}
          ref={headlineRef}
        />
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey="megl6butiqhm3whiwmspl4igyb05ob2u5zke3i53jduwwma6"
          initialValue={post.content}
          onChange={handleContentChange}
        />
        <input type="hidden" name="id" value={post.id} />
        <input
          type="hidden"
          name="content"
          value={editorRef?.current?.getContent()}
        />
        <input type="hidden" name="task" value="edit" />
        <Button type="submit">Update</Button>
      </Form>
    </div>
  );
};

export default EditPost;
