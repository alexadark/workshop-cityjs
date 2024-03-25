import { json, redirect } from "@remix-run/node";
import slugify from "slugify";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function handleDelete(formData: FormData) {
  // Use as string to assert the type, but first check if it's not null
  const postId = formData.get("id");
  if (postId === null) {
    console.error("Post ID is null");
    return; // Handle the null case appropriately, maybe return an error response
  }
  console.log("post deleted", postId);

  let post;
  try {
    post = await prisma.post.delete({
      where: { id: postId as string }, // Asserting postId is a string
    });
    console.log(`Deleted post: ${post.title}`);
  } catch (error) {
    console.error("Error deleting post:", error);
  }
  return json({
    post,
  });
}

export async function handleGenerate(formData: FormData) {
  const {
    subject,
    style,
    tone,
    purpose,
    keywords,
    length,
    targetReader,
    language,
  } = Object.fromEntries(formData.entries());

  const payload = {
    messages: [
      {
        role: "user",
        content: "Generate content based on the following parameters.",
      },
    ],
    variables: [
      { name: "style", value: style || "informational" },
      { name: "tone", value: tone || "educative" },
      { name: "purpose", value: purpose || "educate" },
      { name: "keywords", value: keywords || "react" },
      { name: "length", value: length || "100" },
      { name: "subject", value: subject || "remix" },
      { name: "targetReader", value: targetReader || "web developer" },
      { name: "language", value: language || "english" },
    ],
  };

  // const prompt = `Generate content based on the following parameters: style=${
  //   style || "informational"
  // }, tone=${tone || "educative"}, purpose=${purpose || "educate"}, keywords=${
  //   keywords || ""
  // }, length=${length || 100}, subject=${subject || "remix"}, targetReader=${
  //   targetReader || " web developer"
  // }, language=${language || "english"}`;

  // const payload = {
  //   prompt,
  // };
  console.log("payload", JSON.stringify(payload));

  let post;
  try {
    const response = await fetch("https://api.langbase.com/beta/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LANGBASE_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    post = await response.json();

    //if post is not null, then save it to database
    if (post) {
      const slug = slugify(post.headline, { lower: true });
      await prisma.post.create({
        data: {
          title: String(post.headline),
          content: String(post.content),
          slug: String(slug),
          description: String(post.description),
        },
      });
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }

  return redirect("/edit-post");
}

export async function handleEdit(formData: FormData) {
  // Use type assertion to tell TypeScript that the values are strings.
  const headline = formData.get("headline") as string;
  const content = formData.get("content") as string;
  const postId = formData.get("id") as string;
  console.log("content edited", content);

  let post;
  const slug = slugify(headline, { lower: true });
  try {
    post = await prisma.post.update({
      where: { id: postId },
      data: {
        title: headline,
        content: content,
        slug: slug,
      },
    });
    console.log(`Published post: ${post.title}`);
  } catch (error) {
    console.error("Error publishing post:", error);
  }
  return json({
    post,
  });
}

export async function handlePublish(formData: FormData) {
  const postId = formData.get("id") as string;

  console.log("post published", postId);

  if (!postId) {
    console.error("Post ID is missing or invalid");
    return redirect("/dashboard");
  }

  try {
    // Fetch the current post
    const currentPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!currentPost) {
      console.error("Post not found");
      return redirect("/dashboard");
    }

    // Update the post with the opposite of its current published status
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        published: !currentPost.published,
      },
    });
    console.log(`Published post: ${post.title}`);

    // Redirect to the post's slug if it's published, otherwise redirect to the dashboard
    return redirect(post.published ? `/${post.slug}` : "/dashboard");
  } catch (error) {
    console.error("Error publishing post:", error);
    // Redirect to the dashboard in case of error
    return redirect("/dashboard");
  }
}
