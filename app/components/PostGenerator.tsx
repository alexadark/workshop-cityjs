import { Form } from "@remix-run/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface PostGeneratorProps {
  setIsGenerating: (isGenerating: boolean) => void;
}

const PostGenerator = ({ setIsGenerating }: PostGeneratorProps) => {
  return (
    <div>
      <h1>Create a new post</h1>
      <div className="space-y-5">
        <Form className="space-y-3" method="post">
          <div className="flex space-x-3">
            <Input type="text" name="subject" placeholder="Subject" />
            <Input type="text" placeholder="Style" />
          </div>
          <div className="flex space-x-3">
            <Input type="text" name="tone" placeholder="Tone" />
            <Input type="text" placeholder="Purpose" />
          </div>
          <div className="flex space-x-3">
            <Input type="text" name="keywords" placeholder="Keywords" />
            <Input type="text" name="length" placeholder="Length" />
          </div>
          <div className="flex space-x-3">
            <Input
              type="text"
              name="targetReader"
              placeholder="Target Reader"
            />
            <Input type="text" name="language" placeholder="language" />
          </div>
          <input type="hidden" name="task" value="generate" />
          <Button
            type="submit"
            value="submit"
            onClick={() => setIsGenerating(true)}
          >
            Generate
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default PostGenerator;
