import { PrismaClient } from "@prisma/client";
import { loremIpsum } from "lorem-ipsum";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  const posts = [
    {
      title: "Introduction to AI",
      content: loremIpsum({ count: 4, units: "paragraphs" }),
      published: true,
      description: loremIpsum({ count: 1, units: "paragraphs" }),
    },
    {
      title: "Getting started with Remix",
      content: loremIpsum({ count: 4, units: "paragraphs" }),
      createdAt: new Date("2022-01-01"),
    },
    {
      title: "Understanding React",
      content: loremIpsum({ count: 4, units: "paragraphs" }),
    },
    {
      title: "Web Development Trends in 2022",
      content: loremIpsum({ count: 4, units: "paragraphs" }),
    },
    {
      title: "Deep Dive into AI",
      content: loremIpsum({ count: 4, units: "paragraphs" }),
    },
    {
      title: "Advanced Remix Techniques",
      content: loremIpsum({ count: 4, units: "paragraphs" }),
    },
    {
      title: "React Best Practices",
      content: loremIpsum({ count: 4, units: "paragraphs" }),
    },
    {
      title: "Future of Web Development",
      content: loremIpsum({ count: 4, units: "paragraphs" }),
    },
    {
      title: "AI in Web Development",
      content: loremIpsum({ count: 4, units: "paragraphs" }),
    },
    {
      title: "Remix vs React: A Comparison",
      content: loremIpsum({ count: 4, units: "paragraphs" }),
    },
  ];

  for (const post of posts) {
    const slug = slugify(post.title, { lower: true });

    await prisma.post.create({
      data: {
        ...post,
        slug: slug,
        description: post.content.slice(0, 100),
        published: true,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
